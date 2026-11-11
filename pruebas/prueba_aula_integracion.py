#!/usr/bin/env python3
"""Integración REAL con el Aula: carga una clase del motor (meta.aula=true) en Chromium junto con los scripts auténticos del Aula
(aula-sync.js, aula-config.js, aula-contexto.js), con una sesión de estudiante falsa y un servidor simulado, y comprueba lo que
llegaría a la hoja «Notas y avance». Uso: python3 pruebas/prueba_aula_integracion.py [clase.html]"""
import json, os, shutil, sys, tempfile, time
from playwright.sync_api import sync_playwright
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.join(AQUI, '..')
clase = sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, 'plantilla', 'ejemplos', 'tec4_documento_formato_tablas.html')
base = tempfile.mkdtemp(); js = os.path.join(base, 'recursos', 'js'); os.makedirs(js); carpeta = os.path.join(base, 'periodo-4', 'tecnologia-4'); os.makedirs(carpeta)
for f in ('aula-sync.js', 'aula-config.js', 'aula-contexto.js'): shutil.copy(os.path.join(AQUI, 'fixtures', 'aula', f), js)
destino = os.path.join(carpeta, 'semana6_tec4_p4.html'); shutil.copy(clase, destino)
API = 'https://aula.prueba/exec'; recibidos = []; fallos = 0; total = 0
def ok(c, msg):
    global fallos, total; total += 1; print(('  ✅ ' if c else '  ❌ ') + msg); fallos += 0 if c else 1
def servidor(route, request):
    cuerpo = json.loads(request.post_data or '{}'); recibidos.append(cuerpo); a = cuerpo.get('accion')
    resp = {'ok': True, 't': [int(time.time())], 'xp': 0} if a == 'estadoGuardarLote' else {'ok': True}
    route.fulfill(status=200, content_type='application/json', headers={'access-control-allow-origin': '*'}, body=json.dumps(resp))
SESION = json.dumps({'token': 'tok-prueba', 'api': API, 'apodo': 'maria', 'nombre': 'María Pérez', 'grupo': '501', 'grado': 5, 'id': 'p1'})
print('INTEGRACIÓN CON EL AULA · ' + os.path.basename(clase))
with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(viewport={'width': 400, 'height': 900}); ctx.add_init_script(f"localStorage.setItem('aula_sesion_v1', {json.dumps(SESION)});")
    ctx.route(API, servidor); pg = ctx.new_page(); errores = []; pg.on('pageerror', lambda e: errores.append(str(e)))
    pg.goto('file://' + destino); pg.wait_for_timeout(1500)
    try: pg.click('#btn-empezar', timeout=2500)
    except Exception: pass
    ok(any(r.get('accion') == 'estadoCargar' for r in recibidos), 'al abrir, la clase pide al servidor el avance guardado del estudiante')
    ok(pg.evaluate("document.querySelector('[data-test=ruta], #v29-ruta') !== null"), 'la clase del motor se pinta con normalidad junto a los scripts del Aula')
    ok(pg.evaluate("typeof window.AulaSync === 'object' && window.AulaSync.activo === true"), 'aula-sync.js detecta la sesión y queda activo')
    ok(pg.evaluate("document.body.innerText.includes('PERÍODO') || document.body.innerText.toUpperCase().includes('PERIODO')"), 'la barra de contexto del Aula (período · área · grado · semana) aparece')
    n = pg.evaluate("CLASE_API.SL.length")
    for i in range(n): pg.evaluate(f"CLASE_API.irA({i})"); pg.wait_for_timeout(40)
    pg.evaluate("window.AulaSync.empujar()"); pg.wait_for_timeout(900)
    lotes = [r for r in recibidos if r.get('accion') == 'estadoGuardarLote']
    ok(bool(lotes), 'la clase envía su avance al servidor (estadoGuardarLote)')
    if lotes:
        it = lotes[-1]['items'][0]; res = it.get('resumen') or {}; datos = json.loads(it['datos'])
        ok(it['clave'] == 'l.semana6_tec4_p4', f"la clave del avance sale del nombre del archivo ({it['clave']})")
        ok(res.get('avance') == 100 and res.get('semana') == 6 and 'Tecnolog' in res.get('materia', ''), f"resumen para «Notas y avance»: {{materia: {res.get('materia')}, semana: {res.get('semana')}, avance: {res.get('avance')}, nota: {res.get('nota')}, aciertos: {res.get('aciertos')}/{res.get('preguntas')}}}")
        ok(datos.get('n') == 'María Pérez', f"el avance viaja con el nombre real del estudiante de la sesión ({datos.get('n')})")
        clave_estado = [k for k in datos['k'] if k.startswith('aula:')]
        ok(bool(clave_estado), f"se sincroniza el estado de la clase (clave {clave_estado[0] if clave_estado else '—'})")
        if clave_estado:
            largo = len(datos['k'][clave_estado[0]]); ok(largo < 30000, f'el estado ocupa {largo} de 30000 caracteres permitidos por el servidor (si pasa, NO se sincroniza)')
            estado = json.loads(datos['k'][clave_estado[0]]); ok('acts' in estado or 'slide' in estado, 'el estado incluye las actividades (puntos de juegos y respuestas abiertas quedan guardados para el docente)')
    ok(not errores, 'cero errores de JavaScript con los scripts del Aula cargados' + ('' if not errores else ': ' + errores[0][:80]))
    b.close()
print(f'\n{total - fallos}/{total} comprobaciones OK' + (f' · {fallos} ❌' if fallos else '')); sys.exit(1 if fallos else 0)
