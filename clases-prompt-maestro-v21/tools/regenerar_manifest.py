#!/usr/bin/env python3
"""Recalcula tamaños y hashes del MANIFEST.json tras editar un módulo a propósito. Uso: python3 tools/regenerar_manifest.py"""
import json, hashlib, pathlib
raiz = pathlib.Path(__file__).resolve().parent.parent
man = json.loads((raiz/'MANIFEST.json').read_text(encoding='utf-8'))
for m in man['modulos']:
    b = (raiz/m['archivo']).read_bytes(); m['bytes'] = len(b); m['lineas'] = b.decode('utf-8').count('\n') + 1; m['sha256'] = hashlib.sha256(b).hexdigest()
(raiz/'MANIFEST.json').write_text(json.dumps(man, ensure_ascii=False, indent=1), encoding='utf-8'); print('MANIFEST.json actualizado')
