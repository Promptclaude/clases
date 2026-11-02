#!/usr/bin/env python3
"""
puerta_de_calidad.py — UN comando que decide si una clase se puede entregar.
  1) auditoría estática (auditar_clase.py)      2) pruebas con clics reales (prueba_clase_e2e.js, requiere `npm install jsdom`)
Escribe informe_calidad.md y sale con código 0 (VERDE) o 1 (ROJO). Una clase en ROJO NO se entrega.
Uso:  python3 tools/puerta_de_calidad.py clase.html [--mutaciones] [--informe informe_calidad.md]
"""
import os, re, subprocess, sys, datetime
def correr(cmd, env=None):
    r = subprocess.run(cmd, capture_output=True, text=True, env=env); return r.returncode, (r.stdout or '') + (r.stderr or '')
def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    clase = sys.argv[1]; aqui = os.path.dirname(os.path.abspath(__file__)); informe = sys.argv[sys.argv.index('--informe') + 1] if '--informe' in sys.argv else 'informe_calidad.md'
    pasos = []; env = dict(os.environ)
    c1, o1 = correr([sys.executable, os.path.join(aqui, 'auditar_clase.py'), clase]); pasos.append(('Auditoría estática', c1, o1))
    node = subprocess.run(['node', '-e', "require('jsdom')"], capture_output=True, env=env).returncode == 0
    if node:
        c2, o2 = correr(['node', os.path.join(aqui, 'prueba_clase_e2e.js'), clase], env); pasos.append(('Pruebas con clics reales (T10–T22)', c2, o2))
        if '--mutaciones' in sys.argv: c3, o3 = correr([sys.executable, os.path.join(aqui, 'prueba_de_mutaciones.py'), clase], env); pasos.append(('Mutaciones (¿las pruebas detectan averías?)', c3, o3))
    else: pasos.append(('Pruebas con clics reales (T10–T22)', 2, 'NO EJECUTADAS: falta jsdom (npm install jsdom). Sin estas pruebas la clase queda NO VERIFICADA.'))
    rojo = any(c != 0 for _, c, _ in pasos)
    L = [f'# Informe de entrega · {os.path.basename(clase)}', f'_Generado {datetime.datetime.now():%Y-%m-%d %H:%M}_', '', f'## Resultado: {"🔴 ROJO — NO se entrega" if rojo else "🟢 VERDE — lista para entregar"}', '']
    for n, c, o in pasos:
        resumen = (re.findall(r'.*(?:comprobaciones OK|correctas ·|averías detectadas|NO EJECUTADAS).*', o) or ['(sin resumen)'])[-1].strip()
        L += [f'### {"✅" if c == 0 else "❌"} {n}', f'{resumen}', '']
        fallos = re.findall(r'^\s*(?:❌|⚠️).*', o, re.M)
        if fallos: L += ['```'] + [f.strip() for f in fallos[:25]] + ['```', '']
    L += ['## Lo que estas pruebas NO cubren', '- Apariencia visual real en un navegador y tamaño de letra/colores en la pantalla del estudiante.', '- Rendimiento en los equipos del laboratorio y en celulares lentos.', '- Calidad pedagógica (que el tema se entienda): requiere revisión del docente.']
    open(informe, 'w', encoding='utf8').write('\n'.join(L)); print('\n'.join(L)); sys.exit(1 if rojo else 0)
if __name__ == '__main__': main()
