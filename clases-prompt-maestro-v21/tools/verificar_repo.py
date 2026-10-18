#!/usr/bin/env python3
"""Verifica la integridad del repositorio ANTES de subir a GitHub o de entregárselo a Claude.
Uso: python3 tools/verificar_repo.py        (sale con código 1 si hay errores)"""
import re, json, hashlib, pathlib, subprocess, sys, collections
raiz = pathlib.Path(__file__).resolve().parent.parent
err, avisos = [], []
man = json.loads((raiz/'MANIFEST.json').read_text(encoding='utf-8'))
# 1) hashes
for m in man['modulos']:
    p = raiz/m['archivo']
    if not p.exists(): err.append('Falta ' + m['archivo']); continue
    if hashlib.sha256(p.read_bytes()).hexdigest() != m['sha256']: err.append('Módulo modificado respecto al MANIFEST (¿editado a mano? regenera con tools/regenerar_manifest.py): ' + m['archivo'])
# 2) cada prioridad exactamente una vez
ids_man = [i for m in man['modulos'] for i in m['prioridades']]
texto = {m['archivo']: (raiz/m['archivo']).read_text(encoding='utf-8') for m in man['modulos'] if (raiz/m['archivo']).exists()}
encontrados = collections.Counter()
for t in texto.values():
    for x in re.findall(r'^## [^\n]*? PRIORIDAD ([0-9]+(?:-[A-Z])?) ·', t, re.M): encontrados[x] += 1
for i in ids_man:
    if encontrados[i] != 1: err.append('Prioridad %s aparece %d veces (debe ser 1)' % (i, encontrados[i]))
for i in encontrados:
    if i not in ids_man: err.append('Prioridad %s está en un módulo pero no en el MANIFEST' % i)
proto = (raiz/'prompt/00_PROTOCOLO_Y_PRECEDENCIA.md').read_text(encoding='utf-8')
lista = re.findall(r'- \[ \] \*\*([0-9]+(?:-[A-Z])?)\*\*', proto)
if sorted(lista) != sorted(ids_man): err.append('La lista de confirmación de 00_PROTOCOLO no coincide con las prioridades de los módulos')
# 3) fences balanceados y funciones duplicadas dentro del prompt
defs = collections.defaultdict(list)
for arch, t in texto.items():
    if t.count('\n```') + (1 if t.startswith('```') else 0) % 2: pass
    n = len(re.findall(r'^```', t, re.M))
    if n % 2: err.append('Bloques de código sin cerrar en ' + arch)
    dentro = False
    for k, l in enumerate(t.split('\n')):
        if l.startswith('```'): dentro = not dentro; continue
        if dentro:
            m = re.match(r'\s*(?:async\s+)?function\s+([A-Za-z0-9_$]+)\s*\(', l)
            if m: defs[m.group(1)].append(arch.split('/')[-1] + ':' + str(k+1))
dup = {k: v for k, v in defs.items() if len(v) > 1}
PERMITIDAS = {'marcarCasillaWS'}  # ejemplo ❌/✅ intencional
for k, v in dup.items():
    if k in PERMITIDAS: continue
    avisos.append('función declarada más de una vez en el prompt: %s → %s' % (k, v))
# 4) secretos
pat = re.compile(r'AIza[0-9A-Za-z_\-]{30,}|AQ\.[A-Za-z0-9_\-]{30,}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{30,}')
for p in raiz.rglob('*'):
    if p.is_file() and p.suffix in ('.md', '.html', '.js', '.py', '.json') and '.git' not in p.parts:
        if pat.search(p.read_text(encoding='utf-8', errors='replace')): err.append('Posible clave/secreto en ' + str(p.relative_to(raiz)))
if '5813645' in ''.join(texto.values()): err.append('La clave del panel docente aparece dentro de prompt/ (debe vivir solo en plantillas/DATOS_DE_LA_CLASE.md)')
w = (raiz/'aria/aria_widget.html').read_text(encoding='utf-8')
if "'PEGA_TU_CLAVE_AQUI'" not in w: err.append('aria_widget.html no trae el marcador PEGA_TU_CLAVE_AQUI')
if w.count('id="aria-fab"') != 1: err.append('aria_widget.html debe contener exactamente un #aria-fab')
if '<!--ARIA_SPRITES_AQUI-->' not in w: err.append('aria_widget.html perdió el marcador de sprites')
# 5) restos heredados
resto = sum(t.count('ANULAD') for t in texto.values())
if resto: avisos.append('quedan %d menciones de ANULADO en prompt/ (revisar)' % resto)
# 6) sintaxis de la prueba
r = subprocess.run(['node', '--check', str(raiz/'tests/prueba_clase.js')], capture_output=True, text=True)
if r.returncode: err.append('tests/prueba_clase.js tiene errores de sintaxis: ' + r.stderr[:200])
for a in avisos: print('⚠️ ', a)
for e in err: print('❌', e)
print('\nRESULTADO:', 'CON ERRORES' if err else 'OK ✅', '| módulos:', len(man['modulos']), '| prioridades:', len(ids_man), '| avisos:', len(avisos))
sys.exit(1 if err else 0)
