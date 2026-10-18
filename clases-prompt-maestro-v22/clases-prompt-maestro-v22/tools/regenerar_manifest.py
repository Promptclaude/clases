#!/usr/bin/env python3
"""Tras editar un módulo a propósito:  python3 tools/regenerar_manifest.py
Hace 4 cosas: (1) recalcula MANIFEST.json desde prompt/*.md (etapa y prioridades salen del propio módulo),
(2) regenera la lista de confirmación de 00_PROTOCOLO (entre <!--LISTA_INICIO--> y <!--LISTA_FIN-->),
(3) recalcula hashes del código (motor/ y aria/), (4) reconstruye dist/Prompt_Maestro_Clases_v22_COMPLETO.md."""
import json, hashlib, pathlib, re
VERSION = '22.0'
raiz = pathlib.Path(__file__).resolve().parent.parent
prev = {}
try: prev = {m['archivo']: m for m in json.loads((raiz/'MANIFEST.json').read_text(encoding='utf-8'))['modulos']}
except Exception: pass
HEAD = re.compile(r'^## (\S+) PRIORIDAD ([0-9]+(?:-[A-Z])?) · [^—\n]*— (.+)$', re.M)
def front(t):
    m = re.match(r'---\n(.*?)\n---\n', t, re.S); d = {}
    if m:
        for l in m.group(1).split('\n'):
            if ':' in l: k, v = l.split(':', 1); d[k.strip()] = v.strip()
    return d
mods = []
for p in sorted((raiz/'prompt').glob('*.md')):
    t = p.read_text(encoding='utf-8'); f = front(t); rel = 'prompt/' + p.name
    etapa = int(f.get('etapa_de_lectura', 0 if p.name.startswith('00') else 3))
    if p.name.startswith('00'): etapa = 0
    h1 = re.search(r'^# \d+ · (.+)$', t, re.M)
    desc = (prev.get(rel, {}).get('descripcion') or (h1.group(1).strip() if h1 else p.stem))
    ids = [m.group(2) for m in HEAD.finditer(t)]
    b = p.read_bytes()
    mods.append({'archivo': rel, 'etapa': etapa, 'descripcion': desc, 'prioridades': ids, 'bytes': len(b), 'lineas': b.decode('utf-8').count('\n') + 1, 'sha256': hashlib.sha256(b).hexdigest(), '_t': t})
mods.sort(key=lambda m: (m['etapa'], m['archivo']))
# (2) lista de confirmación
lista, n = [], 0
for m in mods:
    heads = list(HEAD.finditer(m['_t']))
    if not heads: continue
    lista.append('\n**%s** — %s' % (m['archivo'].split('/')[-1], m['descripcion']))
    for h in heads: lista.append('- [ ] **%s** %s %s' % (h.group(2), h.group(1), h.group(3).strip())); n += 1
proto = raiz/'prompt/00_PROTOCOLO_Y_PRECEDENCIA.md'; pt = proto.read_text(encoding='utf-8')
pt = re.sub(r'<!--LISTA_INICIO-->.*?<!--LISTA_FIN-->', lambda _: '<!--LISTA_INICIO-->\n' + '\n'.join(lista) + '\n<!--LISTA_FIN-->', pt, flags=re.S)
pt = re.sub(r'(El número total se calcula al regenerar este archivo\.|Total: \d+ prioridades\.)', 'Total: %d prioridades.' % n, pt)
proto.write_text(pt, encoding='utf-8')
for m in mods:
    if m['archivo'].endswith('00_PROTOCOLO_Y_PRECEDENCIA.md'):
        b = proto.read_bytes(); m.update(bytes=len(b), lineas=b.decode('utf-8').count('\n') + 1, sha256=hashlib.sha256(b).hexdigest())
# (3) código
codigo = []
for rel in ['motor/nucleo.js', 'aria/aria_widget.html']:
    q = raiz/rel
    if q.exists(): codigo.append({'archivo': rel, 'sha256': hashlib.sha256(q.read_bytes()).hexdigest(), 'bytes': q.stat().st_size})
# (4) dist
partes = ['# PROMPT MAESTRO DE CLASES v%s — COMPLETO (generado desde prompt/*.md; no editar aquí)\n' % VERSION.split('.')[0]]
for m in mods: partes.append(re.sub(r'^---\n.*?\n---\n', '', m['_t'], count=1, flags=re.S).strip() + '\n')
dist = '\n'.join(partes); (raiz/'dist').mkdir(exist_ok=True)
for old in (raiz/'dist').glob('Prompt_Maestro_Clases_v*_COMPLETO.md'): old.unlink()
(raiz/'dist'/('Prompt_Maestro_Clases_v%s_COMPLETO.md' % VERSION.split('.')[0])).write_text(dist, encoding='utf-8')
for m in mods: m.pop('_t')
man = {'version': VERSION, 'generado': __import__('datetime').date.today().isoformat(), 'origen': 'Prompt_Maestro_Clases_v21 (repo clases-prompt-maestro-v21)',
       'total_bytes': sum(m['bytes'] for m in mods), 'tokens_aprox_lectura_completa': round(sum(m['bytes'] for m in mods) / 3.3),
       'aviso': 'No editar los módulos a mano sin ejecutar tools/regenerar_manifest.py y tools/verificar_repo.py', 'modulos': mods, 'codigo': codigo}
(raiz/'MANIFEST.json').write_text(json.dumps(man, ensure_ascii=False, indent=1), encoding='utf-8')
print('MANIFEST v%s: %d módulos, %d prioridades, ~%d tokens; dist reconstruido' % (VERSION, len(mods), n, man['tokens_aprox_lectura_completa']))
