#!/usr/bin/env python3
"""Auditoría estática de UNA clase HTML contra las reglas de la v22 (y, opcional, contra la clase anterior).
Uso:  python3 tools/auditar_clase.py clase.html [--previa clase_anterior.html] [--semana N]
Sale con código 1 si hay ❌. Los ⚠️ son avisos para revisar. No ejecuta la clase: para eso está tests/prueba_clase.js."""
import re, sys, json, collections, pathlib, argparse

ap = argparse.ArgumentParser(); ap.add_argument('clase'); ap.add_argument('--previa'); ap.add_argument('--semana', type=int)
a = ap.parse_args()
leer = lambda p: pathlib.Path(p).read_text(encoding='utf-8', errors='replace')
quitar_b64 = lambda t: re.sub(r'data:[a-z/+\-]+;base64,[A-Za-z0-9+/=]{200,}', 'data:BASE64', t)
t = quitar_b64(leer(a.clase)); err, av, ok = [], [], []
scripts = '\n'.join(re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', t, re.S))

# 1 funciones duplicadas
defs = collections.Counter(re.findall(r'\bfunction\s+([A-Za-z0-9_$]+)\s*\(', scripts))
dup = sorted(k for k, v in defs.items() if v > 1)
(err if dup else ok).append(('funciones declaradas más de una vez: ' + ', '.join(dup)) if dup else 'sin funciones duplicadas')

# 2 paleta clara (0-E): luminosidad HSL de --bg-main >= 90
m = re.search(r'--bg-main\s*:\s*(#[0-9a-fA-F]{6})', t)
if m:
    h = m.group(1); r, g, b = (int(h[i:i+2], 16) / 255 for i in (1, 3, 5)); L = (max(r, g, b) + min(r, g, b)) / 2 * 100
    (err if L < 90 else ok).append(f'--bg-main {h} tiene luminosidad {L:.0f}% ' + ('(< 90%: el fondo es oscuro, viola 0-E)' if L < 90 else '(clara)'))
else: av.append('no se encontró --bg-main')

# 3 identidad / claves
tiene_cfg = 'CLASE_CFG' in t and 'Nucleo.' in scripts
(ok if tiene_cfg else av).append('usa CLASE_CFG + Nucleo para claves' if tiene_cfg else 'no usa el núcleo v22 (CLASE_CFG + Nucleo): las claves siguen siendo manuales')
literales = set(re.findall(r"['\"]([a-z]{3,5}\d?p\d_[a-z_0-9]*)['\"]", scripts)) | set(re.findall(r"['\"]((?:mat|tec|ari|cie)_?\d_[a-z0-9_]*)['\"]", scripts))
if literales and not tiene_cfg: av.append(f'{len(literales)} claves/prefijos escritos a mano (riesgo de herencia al copiar la clase): ' + ', '.join(sorted(literales)[:6]))
if re.search(r'\.semana\s*!==\s*undefined', scripts) or re.search(r'd\.semana\s*!==\s*undefined', scripts):
    err.append('acepta datos guardados SIN sello de semana (`semana !== undefined && …`): un dato sin sello se hereda en la clase nueva')
if re.search(r'function\s+buscarSesionHuerfana', scripts): av.append('existe buscarSesionHuerfanaPorNombre(): recorre claves de otras sesiones; con sello estricto ya no hace falta')
semana = re.search(r'const\s+SEMANA_NUM\s*=\s*(\d+)', scripts) or re.search(r'semana\s*:\s*(\d+)', re.search(r'CLASE_CFG\s*=\s*\{[^}]*\}', scripts or '', re.S).group(0) if re.search(r'CLASE_CFG\s*=\s*\{[^}]*\}', scripts or '', re.S) else '')
if a.semana and semana and int(semana.group(1)) != a.semana: err.append(f'la clase declara semana {semana.group(1)} pero se esperaba la {a.semana}')

# 4 API de prueba pública
(ok if 'CLASE_API' in scripts else av).append('expone window.CLASE_API' if 'CLASE_API' in scripts else 'no expone window.CLASE_API: las pruebas dependen de nombres internos (frágil)')

# 5 imágenes remotas y respaldo
remotas = len(re.findall(r'<img[^>]+src=["\']https?://', t)) + len(re.findall(r"https?://images\.unsplash", scripts))
resp = bool(re.search(r"addEventListener\(\s*['\"]error['\"][^)]*,\s*true", scripts)) or scripts.count('onerror') >= remotas > 0
if remotas: (ok if resp else av).append(f'{remotas} imágenes remotas ' + ('con respaldo de error' if resp else 'SIN respaldo global de error (pueden quedar rotas)'))

# 6 estructura de slides
tipos = re.findall(r"type\s*:\s*['\"]([a-zA-Z0-9_]+)['\"]", scripts)
cnt = collections.Counter(tipos)
if cnt.get('quiz', 0) != 2: av.append(f"quizzes detectados: {cnt.get('quiz', 0)} (la estructura pide 2)")
if cnt.get('evalFinal', 0) < 1: av.append('no se detectó slide evalFinal')
ok.append('tipos de slide detectados: ' + ', '.join(f'{k}×{v}' for k, v in sorted(cnt.items()) if k in ('intro','info','historia','interactive','quiz','evalFinal','minijuego','drag','fill','match','repaso','practica','wordsearch','final')))

# 7 peso del código y ruido heredado
kb = len(scripts) // 1024; etiquetas = len(re.findall(r'🔺|🆕|Prioridad\s+\d', scripts))
(av if kb > 900 else ok).append(f'JS propio: {kb} KB' + (' (grande: revisar duplicados/comentarios)' if kb > 900 else ''))
(av if etiquetas > 20 else ok).append(f'{etiquetas} etiquetas de prioridad/versión dentro del código' + (' (deben ir fuera del HTML entregado)' if etiquetas > 20 else ''))

# 8 clases copiadas: restos de la semana anterior
if a.previa:
    p = quitar_b64(leer(a.previa)); sp = re.search(r'const\s+SEMANA_NUM\s*=\s*(\d+)', p) or re.search(r'semana\s*:\s*(\d+)', p)
    if sp and semana:
        vieja, nueva = sp.group(1), semana.group(1)
        if vieja == nueva: err.append(f'SEMANA_NUM no cambió ({nueva}): la clase nueva usaría las claves de la anterior')
        else:
            sobras = [(pat, len(re.findall(pat, t))) for pat in (rf'\bSemana\s+{vieja}\b', rf'semana{vieja}[_a-z0-9]*\.html', rf'_s{vieja}\b', rf'\bs{vieja}_') if re.search(pat, t)]
            if sobras: err.append('restos de la semana anterior (' + vieja + '): ' + '; '.join(f'{p}×{n}' for p, n in sobras))
            else: ok.append(f'sin restos de la semana {vieja}')
    tp = re.search(r"tema\s*:\s*['\"]([^'\"]+)", p); tn = re.search(r"tema\s*:\s*['\"]([^'\"]+)", t)
    if tp and tn and tp.group(1) == tn.group(1): err.append('el TEMA es idéntico al de la clase anterior')
    qp = set(re.findall(r"enunciado\s*:\s*['\"`]([^'\"`]{25,})", p)); qn = set(re.findall(r"enunciado\s*:\s*['\"`]([^'\"`]{25,})", t))
    if qp & qn: av.append(f'{len(qp & qn)} enunciados idénticos a la clase anterior (¿copiados?)')
    tp_ = re.search(r'--primary\s*:\s*(#[0-9a-fA-F]{6})', p); tn_ = re.search(r'--primary\s*:\s*(#[0-9a-fA-F]{6})', t)
    if tp_ and tn_ and tp_.group(1).lower() == tn_.group(1).lower(): av.append('mismo --primary que la clase anterior (0-F pide tema visual distinto)')

for x in ok: print('✅', x)
for x in av: print('⚠️ ', x)
for x in err: print('❌', x)
print(f'\nRESULTADO: {"CON ERRORES" if err else "OK"} | ❌ {len(err)} | ⚠️  {len(av)}'); sys.exit(1 if err else 0)
