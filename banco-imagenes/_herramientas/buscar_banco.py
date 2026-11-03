#!/usr/bin/env python3
"""buscar_banco.py — consulta banco.json antes de crear o pedir una imagen nueva.
Uso: python3 buscar_banco.py [palabras] [--cat juego] [--sin-texto] [--min-calidad 4] [--estado aprobada]
Por defecto solo muestra imágenes aprobadas / por_revisar, nunca descartadas ni con texto de otra clase."""
import json, sys, os, argparse
ap=argparse.ArgumentParser(); ap.add_argument('q',nargs='*'); ap.add_argument('--cat'); ap.add_argument('--sin-texto',action='store_true')
ap.add_argument('--min-calidad',type=int,default=1); ap.add_argument('--estado'); a=ap.parse_args()
b=json.load(open(os.path.join(os.path.dirname(__file__),'..','banco.json')))['imagenes']
r=[]
for x in b:
    if x['estado'] in ('descartada','especifica') and a.estado!=x['estado']: continue
    if a.estado and x['estado']!=a.estado: continue
    if a.cat and x['categoria']!=a.cat: continue
    if a.sin_texto and x['tiene_texto']: continue
    if x['calidad']<a.min_calidad: continue
    blob=' '.join([x['id'],x.get('uso',''),' '.join(x['tags']),x.get('texto','')]).lower()
    if all(w.lower() in blob for w in a.q): r.append(x)
for x in sorted(r,key=lambda x:-x['calidad']): print(f"{x['calidad']}★ {x['id']:<26} {x['archivo']}  [{x['estado']}] {x.get('uso','')[:50]}")
print(f'{len(r)} resultados')
