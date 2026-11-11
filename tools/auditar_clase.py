#!/usr/bin/env python3
"""
auditar_clase.py — auditoría ESTÁTICA de una clase terminada. Falla (código 1) si hay algún error; los avisos no fallan.
Uso:  python3 tools/auditar_clase.py clase.html [--json informe.json]
"""
import json, os, re, subprocess, sys
PROHIBIDAS = ['incorrecto', 'fallaste', 'estás mal', 'error tuyo']
MARCAS = ['fortnite', 'free fire', 'freefire', 'minecraft', 'among us', 'roblox', 'pokemon', 'pokémon', 'mario bros', 'disney', 'marvel', 'nintendo', 'epic games', 'pixar', 'brawl stars', 'clash royale']
TIPOS = {'intro', 'info', 'tf', 'fill', 'drag', 'match', 'orden', 'wordsearch', 'interactive', 'minijuego', 'historia', 'quiz', 'evalFinal', 'final', 'repaso', 'practica', 'editor', 'tabla', 'detective', 'fraccion', 'cuadricula', 'recta', 'comparar', 'podio', 'abierta', 'cuaderno', 'enlazar', 'ordenar', 'memoria', 'relampago', 'sopa', 'candado'}
IDS = ['nota-hud', 'nota-delta', 'aciertos-hud', 'nota-intento-hud', 'razon-bloqueo', 'rescate-wrap', 'aviso-guardado', 'btn-next', 'btn-prev', 'stage']
UNICAS = ['puedeAvanzar', 'aplicarEstadoAvance', 'updScore', 'htmlRetroQuiz', 'sesionGuardadaEsValida', 'esEstudianteNuevo', 'construirEntradaEstudiante', 'pintarNota', 'marcarActividadHecha', 'razonBloqueo', 'almacen', 'save', 'load']
def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    ruta = sys.argv[1]; html = open(ruta, encoding='utf8').read(); E, A, OK = [], [], []
    def chk(c, bien, mal, grave=True):
        (OK.append(bien) if c else (E if grave else A).append(mal))
    chk(re.search(r'<html[^>]+lang="es', html), 'html lang="es"', 'Falta <html lang="es">')
    chk('name="viewport"' in html, 'meta viewport', 'Falta <meta name="viewport">')
    chk(re.search(r'<title>[^<]{5,}</title>', html), 'título', 'Falta <title>')
    peso = os.path.getsize(ruta) / 1e6; chk(peso <= 1.5, f'peso {peso:.2f} MB ≤ 1,5 MB', f'La clase pesa {peso:.2f} MB (máx. 1,5)')
    chk('asset://' not in html, 'sin asset:// sin resolver', 'Quedan tokens asset:// sin empaquetar')
    ext = re.findall(r'(?:src|href)="(https?://[^"]+)"', html); chk(not ext, 'sin recursos externos (funciona sin internet)', f'Recursos externos: {ext[:3]}')
    imgs = [len(b) * 3 // 4 for b in re.findall(r'data:image/[a-z+]+;base64,([A-Za-z0-9+/=]{100,})', html)]
    chk(not imgs or max(imgs) <= 150_000, 'ninguna imagen > 150 KB', f'Imagen de {max(imgs)//1024} KB (máx. 150 KB)'); chk(len(set(imgs)) <= 12 or True, '', '')
    for i in IDS: chk(f'id="{i}"' in html, '', f'Falta el elemento #{i}', True)
    OK.append('elementos obligatorios del HUD y la navegación') if all(f'id="{i}"' in html for i in IDS) else None
    js = '\n'.join(re.findall(r'<script>(.*?)</script>', html, re.S))
    for f in UNICAS:
        n = len(re.findall(r'(?:^|\n)\s*function ' + f + r'\(', js)); chk(n == 1, '', f'La función {f}() está definida {n} veces (debe ser 1)')
    OK.append('funciones críticas definidas una sola vez') if all(len(re.findall(r'(?:^|\n)\s*function ' + f + r'\(', js)) == 1 for f in UNICAS) else None
    chk(not re.search(r'd\.semana\s*!==\s*undefined', js), 'sello de sesión estricto', 'Validación de sesión laxa (d.semana !== undefined): una clase nueva podría heredar nota')
    chk(len(re.findall(r'localStorage', js)) <= 3, 'localStorage solo dentro de almacen()', 'localStorage usado fuera de almacen()')
    chk('prefers-reduced-motion' in html, 'respeta reducir movimiento', 'Falta @media (prefers-reduced-motion)')
    chk(re.search(r'pointer-events:\s*none', html) is not None, 'capas de efectos sin bloquear toques', 'Faltan pointer-events:none en las capas de efectos')
    chk('T_RESCATE_S' in js and 'usarRescate' in js, 'rescate «No me sale»', 'No existe el rescate «No me sale»')
    chk('Juego.evento' in js, 'efectos por el motor Juego', 'No usa el motor Juego.evento')
    for d in ['data-test="siguiente"', 'data-test="nota"', 'data-test="stage"']: chk(d in html, '', f'Falta el atributo {d} (contrato de pruebas)')
    low = re.sub(r'<script[^>]*>.*?</script>', lambda m: m.group(0) if 'datos-clase' in m.group(0) else '', html, flags=re.S).lower()
    for w in PROHIBIDAS: chk(w not in low, '', f'Palabra desaconsejada en la clase: «{w}» (usa lenguaje de crecimiento)', False)
    for w in MARCAS: chk(w not in low, '', f'Marca/personaje de terceros: «{w}» (Prioridad 50: solo contenido propio)')
    OK.append('sin marcas ni personajes de terceros') if not any(w in low for w in MARCAS) else None
    m = re.search(r'<script type="application/json" id="datos-clase">(.*?)</script>', html, re.S)
    if not m: E.append('No hay bloque <script id="datos-clase"> (los datos deben ir separados del motor)')
    else:
        try: D = json.loads(m.group(1))
        except Exception as e: E.append(f'JSON de datos inválido: {e}'); D = None
        if D:
            S = D['slides']; ids = [s['id'] for s in S]; chk(len(ids) == len(set(ids)), 'ids de slide únicos', 'ids de slide repetidos')
            chk(S[0]['type'] == 'intro' and S[-1]['type'] == 'final', 'empieza con intro y termina con final', 'Debe empezar en intro y terminar en final')
            for s in S: chk(s['type'] in TIPOS, '', f"Tipo de slide desconocido: {s['type']}")
            run = 1
            for a, b in zip(S, S[1:]):
                run = run + 1 if a['type'] == b['type'] else 1
                if run > 2: E.append(f"Más de 2 slides seguidas del tipo {b['type']} (Prioridad 46)"); break
            chk('dba' in D['meta'] and len(D['meta']['dba']) > 10, 'DBA declarado', 'Falta meta.dba')
            # Variedad (Prioridad 66): una clase dinámica mezcla tipos de juego; avisa si es monótona
            JUEGOS = {'editor', 'tabla', 'detective', 'fraccion', 'tf', 'fill', 'drag', 'minijuego', 'cuadricula', 'recta', 'comparar', 'podio', 'enlazar', 'ordenar', 'memoria', 'relampago', 'sopa', 'candado'}
            tj = {x['type'] for x in S if x['type'] in JUEGOS}; nj = sum(1 for x in S if x['type'] in JUEGOS)
            if len(S) >= 8 and len(tj) < 4: A.append(f"Variedad: solo {len(tj)} tipos de juego distintos ({', '.join(sorted(tj)) or 'ninguno'}); usa al menos 4 para que no sea monótona (Prioridad 66)")
            elif len(S) >= 8: OK.append(f"Variedad: {len(tj)} tipos de juego distintos en {nj} actividades")
            # Bienvenida y pestaña deben ser de ESTA clase (no de la plantilla) · Prioridad 67
            mi = re.search(r'<div id="fx-intro".*?<h1>(.*?)</h1>', html, re.S); ti = re.search(r'<title>(.*?)</title>', html, re.S)
            chk(bool(mi) and mi.group(1).replace('&amp;', '&').strip() == D['meta']['titulo'].strip(), '', f"La pantalla de bienvenida dice «{mi.group(1) if mi else '?'}» pero la clase se llama «{D['meta']['titulo']}» (reconstruir con construir_clase.py)")
            chk(bool(ti) and D['meta']['titulo'].replace('&', '&amp;')[:25] in ti.group(1), '', f"El título de la pestaña ({ti.group(1) if ti else '?'}) no corresponde a la clase")
            fin = [x for x in S if x['type'] == 'final']
            if fin and not fin[0].get('aprendiste'): A.append("La slide final no tiene «aprendiste» (3 logros): la pantalla de celebración queda sin «Lo que lograste hoy» (Prioridad 67)")
            elif fin: chk(1 <= len(fin[0]['aprendiste']) <= 4 and all(len(x.split()) <= 20 for x in fin[0]['aprendiste']), '', 'La slide final: «aprendiste» debe tener 1 a 4 logros de máximo 20 palabras')
            # Conexión con el Aula (Prioridad 73)
            if D['meta'].get('aula'):
                chk(bool(re.search(r'<head>\s*<script src="[^"]*aula-sync\.js"', html)), 'aula-sync.js primero en <head>', 'meta.aula=true pero aula-sync.js no es la PRIMERA etiqueta del <head> (reconstruir con construir_clase.py)')
                chk('aula-config.js' in html and 'aula-contexto.js' in html, 'config y contexto del aula', 'meta.aula=true pero faltan aula-config.js o aula-contexto.js')
                chk(isinstance(D['meta'].get('semana'), int) and isinstance(D['meta'].get('grado'), int) and 1 <= D['meta']['semana'] <= 20, 'semana y grado enteros', 'meta.semana y meta.grado deben ser números enteros (el servidor los guarda en la hoja)')
                if not re.search(r'_(mat|tec)\d_', D['meta'].get('claseId', '')): A.append("meta.claseId no contiene «_mat<grado>_» ni «_tec<grado>_»: el servidor usa el NOMBRE DEL ARCHIVO (semanaN_mat5_p4.html) para dar el XP al mundo correcto; nombra así el archivo")
            def num(x):                      # «0,75» · «3/4» · «25 %»
                t = str(x).strip(); pc = t.endswith('%'); u = t.replace('%', '').replace(' ', '')
                if '/' in u: a, b = u.split('/'); v = float(a.replace(',', '.')) / float(b.replace(',', '.'))
                else: v = float(u.replace(',', '.'))
                return v / 100 if pc else v
            for s in S:
                for obj, nom in [(s, s['id'])] + [(q, s['id'] + '/' + q.get('id', '?')) for q in s.get('preguntas', [])]:
                    if obj.get('imagen'): chk(bool(obj.get('alt')) and len(obj['alt'].split()) >= 2, '', f"{nom}: la imagen de apoyo necesita «alt» (describe la imagen en 2+ palabras, para lectores de pantalla)")
            for s in S:
                t, its = s['type'], s.get('items', [])
                if t in ('fraccion', 'cuadricula', 'recta', 'comparar', 'podio'): chk(len(its) >= 2, '', f"{s['id']}: {t} necesita mínimo 2 puntos (items)")
                if t == 'editor':
                    tx, ob = s.get('texto', []), s.get('objetivos', []); FORM = {'negrita', 'cursiva', 'subrayado', 'color'}
                    chk(isinstance(tx, list) and 6 <= len(tx) <= 18 and all(isinstance(w, str) and w.strip() and ' ' not in w.strip() for w in tx), '', f"{s['id']}: editor necesita «texto» como lista de 6 a 18 palabras sueltas (sin espacios dentro de cada palabra)")
                    chk(2 <= len(ob) <= 5 and all(isinstance(o.get('palabra'), int) and 0 <= o['palabra'] < len(tx) and o.get('instr') and o.get('formatos') and set(o['formatos']) <= FORM for o in ob), '', f"{s['id']}: cada objetivo del editor necesita palabra (índice válido), instr y formatos entre {sorted(FORM)}")
                    chk(len({o.get('palabra') for o in ob}) == len(ob), '', f"{s['id']}: el editor no puede pedir dos objetivos sobre la misma palabra")
                    for o in ob:
                        if isinstance(o.get('palabra'), int) and 0 <= o['palabra'] < len(tx) and o.get('instr'): chk(tx[o['palabra']].strip('.,;:«»¡!¿?').lower() in o['instr'].lower(), '', f"{s['id']}: la instrucción «{o['instr']}» no menciona la palabra del índice {o['palabra']} («{tx[o['palabra']]}»): el estudiante marcaría otra")
                if t == 'tabla':
                    cols, fil = s.get('columnas', []), s.get('filas', []); bl = [(i, j, x['r']) for i, f in enumerate(fil) for j, x in enumerate(f) if isinstance(x, dict)]
                    chk(2 <= len(cols) <= 4 and all(isinstance(c, str) and c for c in cols) and 3 <= len(fil) <= 6 and all(isinstance(f, list) and len(f) == len(cols) for f in fil), '', f"{s['id']}: tabla necesita 2 a 4 columnas con nombre y 3 a 6 filas con el mismo número de celdas")
                    chk(2 <= len(bl) <= 6 and all(isinstance(r, (int, float)) for _, _, r in bl), '', f"{s['id']}: tabla necesita de 2 a 6 celdas vacías, cada una como {{\"r\": número}}")
                    if s.get('proporcional') and len(cols) == 2:
                        try:
                            val = lambda f, j: f[j]['r'] if isinstance(f[j], dict) else float(str(f[j]).replace(',', '.')); razones = [val(f, 1) / val(f, 0) for f in fil]
                            chk(max(razones) - min(razones) < 1e-9, '', f"{s['id']}: la tabla marcada como proporcional NO lo es (razones {[round(x, 4) for x in razones]}); revisa los valores o las respuestas")
                            chk(sum(1 for f in fil if not any(isinstance(c, dict) for c in f)) >= 2, '', f"{s['id']}: una tabla proporcional necesita al menos 2 filas completas para que se pueda deducir la regla")
                        except Exception: E.append(f"{s['id']}: tabla proporcional con valores no numéricos")
                if t == 'detective':
                    ls = s.get('lineas', []); segs = [p for l in ls for p in l if not p.get('fijo')]; pis = [p for p in segs if p.get('s')]
                    chk(bool(s.get('contexto')) and len(ls) >= 3 and all(isinstance(l, list) and l for l in ls), '', f"{s['id']}: detective necesita contexto (ej. «✉️ Correo recibido») y mínimo 3 líneas")
                    chk(3 <= len(pis) <= 6 and len(segs) - len(pis) >= 2, '', f"{s['id']}: detective necesita de 3 a 6 pistas (s:true) y al menos 2 partes normales que sirvan de falsa alarma")
                    chk(all(p.get('porQue') and len(p['porQue'].split()) >= 4 for p in pis), '', f"{s['id']}: cada pista del detective necesita un porQue de 4+ palabras")
                if t == 'fraccion':
                    for k, x in enumerate(its): chk(isinstance(x.get('partes'), int) and 2 <= x['partes'] <= 12 and isinstance(x.get('objetivo'), int) and 1 <= x['objetivo'] <= x['partes'] and x.get('forma', 'pizza') in ('pizza', 'barra') and bool(x.get('enunciado')), '', f"{s['id']}/{k}: fraccion necesita enunciado, partes (2 a 12), objetivo (1 a partes) y forma pizza|barra")
                if t == 'ordenar':
                    try:
                        vs = [num(z) for z in s.get('items', [])]; asc = s.get('orden', 'asc') != 'desc'
                        chk(vs == sorted(vs, reverse=not asc), '', f"{s['id']}: los items de ordenar no están en el orden correcto ({'de menor a mayor' if asc else 'de mayor a menor'}): {s['items']}")
                    except Exception: pass
                if t == 'cuadricula':
                    for k, x in enumerate(its): chk(isinstance(x.get('objetivo'), int) and 0 < x['objetivo'] <= x.get('total', 100) and bool(x.get('enunciado')), '', f"{s['id']}/{k}: cuadricula necesita enunciado y objetivo entero entre 1 y total")
                if t == 'recta':
                    for k, x in enumerate(its):
                        p, d, a = x.get('paso', 0.1), x.get('divisiones', 10), x.get('inicio', 0); m = (x.get('valor', -1e9) - a) / p
                        chk(abs(m - round(m)) < 1e-9 and 0 <= round(m) <= d, '', f"{s['id']}/{k}: el valor {x.get('valor')} no cae exactamente en una marca de la recta ({a} a {a + d * p})")
                if t == 'comparar':
                    for k, x in enumerate(its):
                        try:
                            real = '<' if num(x['a']) < num(x['b']) else '>' if num(x['a']) > num(x['b']) else '='
                            chk('signo' not in x or x['signo'] == real, '', f"{s['id']}/{k}: signo declarado {x.get('signo')} pero {x['a']} {real} {x['b']}")
                        except Exception: E.append(f"{s['id']}/{k}: comparar necesita a y b numéricos")
                if t == 'podio': chk(sorted(x.get('puesto', 0) for x in its) == list(range(1, len(its) + 1)), '', f"{s['id']}: los puestos deben ser 1..{len(its)} sin repetir")
                if t == 'abierta': chk(bool(s.get('prompts')) and all(len(p.split()) >= 4 for p in s['prompts']), '', f"{s['id']}: abierta necesita prompts (frases de mínimo 4 palabras)")
                if t in ('enlazar', 'memoria'):
                    pr = s.get('pares', []); chk(3 <= len(pr) <= 6, '', f"{s['id']}: {t} necesita entre 3 y 6 pares")
                    ks = ('izq', 'der') if t == 'enlazar' else ('a', 'b'); tx = [x.get(k, '') for x in pr for k in ks]
                    chk(all(tx) and len(set(tx)) == len(tx), '', f"{s['id']}: {t}: textos vacíos o repetidos (cada carta/elemento debe ser único)")
                if t == 'ordenar': chk(3 <= len(s.get('items', [])) <= 6 and len(set(s.get('items', []))) == len(s.get('items', [])), '', f"{s['id']}: ordenar necesita 3 a 6 pasos distintos, escritos en el orden correcto")
                if t == 'relampago':
                    ops, itz = s.get('opciones', []), s.get('items', []); chk(len(ops) == 2 and len(itz) >= 6, '', f"{s['id']}: relampago necesita 2 opciones y mínimo 6 frases")
                    chk(all(x.get('correcta') in (0, 1) and x.get('texto') for x in itz), '', f"{s['id']}: cada frase de relampago necesita texto y correcta 0 o 1")
                    chk(len({x.get('correcta') for x in itz}) == 2, '', f"{s['id']}: relampago debe mezclar respuestas de las dos opciones (no todas iguales)")
                if t == 'sopa':
                    pl, tam = s.get('palabras', []), s.get('tam', 10); ws = [re.sub('[^A-ZÑ]', '', __import__('unicodedata').normalize('NFD', x.get('palabra', '')).upper().replace('Ñ', '\x01')).replace('\x01', 'Ñ') for x in pl]
                    chk(3 <= len(pl) <= 8 and tam <= 12 and all(3 <= len(w) <= min(tam, 10) for w in ws) and len(set(ws)) == len(ws) and all(x.get('pista') for x in pl), '', f"{s['id']}: sopa necesita 3 a 8 palabras distintas de 3 a 10 letras (sin pasar el tamaño de la cuadrícula) y una pista por palabra")
                if t == 'candado':
                    ac = s.get('acertijos', []); chk(3 <= len(ac) <= 5, '', f"{s['id']}: candado necesita 3 a 5 acertijos")
                    chk(all(isinstance(a.get('digito'), int) and 0 <= a['digito'] <= 9 and a.get('q') and isinstance(a.get('ok'), int) and 0 <= a['ok'] < len(a.get('ops', [])) and len(a.get('ops', [])) >= 3 for a in ac), '', f"{s['id']}: cada acertijo necesita q, 3+ ops, ok (índice) y digito 0-9")
                if t == 'cuaderno': chk(bool(s.get('partes')) and all(p.get('puntos') for p in s['partes']), '', f"{s['id']}: cuaderno necesita partes con puntos")
            gens = set(re.findall(r'\n\s{2}(\w+)\(rng, base\)', js)); nq = 0; evalu = 0
            for s in S:
                if s['type'] == 'info':
                    pal = len(re.findall(r'\w+', s.get('texto', ''))); chk(pal <= 60, '', f"Slide {s['id']}: {pal} palabras (máx. 60)", False)
                    for fr in re.split(r'(?<=[.!?])\s+', s.get('texto', '')): chk(len(fr.split()) <= 25, '', f"Slide {s['id']}: frase de {len(fr.split())} palabras (máx. 25)", False)
                for p in s.get('preguntas', []):
                    nq += 1; pid = f"{s['id']}/{p['id']}"
                    if 'gen' in p: chk(p['gen'] in gens, '', f"{pid}: el generador «{p['gen']}» no existe"); continue
                    ops = p.get('opciones', []); buenas = [o for o in ops if o.get('correcta')]
                    chk(len(buenas) == 1, '', f'{pid}: tiene {len(buenas)} opciones correctas (debe ser 1)'); chk(len(ops) >= 3, '', f'{pid}: menos de 3 opciones')
                    chk(len({o['texto'] for o in ops}) == len(ops), '', f'{pid}: opciones repetidas')
                    for o in ops:
                        if not o.get('correcta'): chk(bool(o.get('porQue')) or bool(p.get('errorComun')), '', f"{pid}: el distractor «{o['texto']}» no explica el error (porQue)")
                    for k in ('retroalimentacion', 'errorComun', 'dba', 'nivel'): chk(bool(p.get(k)), '', f'{pid}: falta {k}')
                    chk(len(p.get('enunciado', '').split()) <= 40, '', f'{pid}: enunciado muy largo (>40 palabras)', False)
                if s['type'] in ('quiz', 'evalFinal'): evalu += 1; chk(len(s['preguntas']) >= 3, '', f"{s['id']}: pocas preguntas (mín. 3)")
            niveles = [p.get('nivel') for x in S for p in x.get('preguntas', []) if p.get('nivel')]
            chk(len(set(niveles)) > 1 or len(niveles) < 4, '', 'Todas las preguntas son del mismo nivel cognitivo (mezcla recordar/aplicar/analizar, Prioridad 62)', False)
            OK.append(f'{nq} preguntas con 1 correcta, porQue, retroalimentación y DBA') if not any(('/' in e and 'pregunta' not in e) for e in E) else None
            chk(evalu >= 1, 'tiene evaluación', 'No hay quiz/evalFinal')
    mat = subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'verificar_matematica.py'), ruta], capture_output=True, text=True)
    (OK if mat.returncode == 0 else E).append(mat.stdout.strip().splitlines()[0] if mat.returncode == 0 else 'Matemática: ' + ' | '.join(l.strip() for l in mat.stdout.splitlines()[1:4]))
    OK[:] = [x for x in OK if x]
    print(f'AUDITORÍA ESTÁTICA · {os.path.basename(ruta)}'); [print('  ✅', x) for x in OK]; [print('  ⚠️ ', x) for x in A]; [print('  ❌', x) for x in E]
    print(f'\n{len(OK)} correctas · {len(A)} avisos · {len(E)} errores → ' + ('VERDE' if not E else 'ROJO: no se entrega'))
    if '--json' in sys.argv: json.dump({'ok': OK, 'avisos': A, 'errores': E}, open(sys.argv[sys.argv.index('--json') + 1], 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    sys.exit(1 if E else 0)
if __name__ == '__main__': main()
