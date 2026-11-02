#!/usr/bin/env python3
"""
prueba_de_mutaciones.py — comprueba que las pruebas E2E DETECTAN fallos de verdad.
Rompe la clase a propósito (una avería a la vez) y ejecuta prueba_clase_e2e.js: cada avería debe hacer fallar alguna prueba.
Si una avería «sobrevive» (las pruebas siguen verdes), esa prueba no protege nada y hay que reforzarla.
Uso:  NODE_PATH=ruta/node_modules python3 tools/prueba_de_mutaciones.py clase.html
"""
import os, re, subprocess, sys, tempfile
MUT = [
 ('M1 sello laxo (una sesión sin sello se acepta: la clase hereda notas)', r'function sesionGuardadaEsValida\(d\) \{.*?\n\}', 'function sesionGuardadaEsValida(d) { return !!d && typeof d === "object"; }'),
 ('M2 el HUD muestra la nota oficial (se «pega» tras gastar una vida)', r'return \(st\.intentos \|\| 1\) > 1 \? calcTotal\(\) : notaOficial\(\);', 'return notaOficial();'),
 ('M3 el quiz exige acertar todo para continuar', r"return st\.acts\['completado_' \+ s\.id\] === true;", "return st.acts['completado_' + s.id] === true && (st.acts['quiz_resps_' + s.id] || []).every(r => r.correcta);"),
 ('M4 sin botón «No me sale»', r'if \(TIPOS_ACTIVIDAD\.includes\(s\.type\)\) activarRescate\(s\);', ''),
 ('M5 el drag exige ubicar TODAS las fichas', r'if \(Object\.keys\(d\.puestos\)\.length >= 2\) \{', 'if (Object.keys(d.puestos).length >= s.chips.length + 9) {'),
 ('M6 la retroalimentación no muestra la respuesta correcta', r'✅ La correcta: <strong>\$\{r\.buenaTexto \|\| \'—\'\}</strong>', 'Gracias por responder'),
 ('M7 el guardado falla en silencio', r'if \(fallosGuardado >= 2\) \{', 'if (false) {'),
 ('M8 sin protección contra el doble toque', r'if \(ahora - ultimaRespuesta < ANTI_DOBLE\) return; ultimaRespuesta = ahora;', ''),
 ('M9 el reintento no borra las respuestas del intento anterior (hereda aciertos)', r"\['quiz_resps_', 'quiz_idx_', 'completado_', 'quiz_retro_pend_'\]", "['quiz_idx_', 'completado_', 'quiz_retro_pend_']"),
 ('M10 «mejor nota» baja si el nuevo intento es peor', r'function notaOficial\(\) \{ return Math\.max\(calcTotal\(\), st\.mejorNota \|\| 0\); \}', 'function notaOficial() { return calcTotal(); }'),
 ('M11 el index no recibe «Slide N de TOT»', r'slideActual: \(st\.slide \|\| 0\) \+ 1, totalSlides: tot,', ''),
 ('M12 el generador de preguntas permite 2 respuestas correctas', r"\{ t: fmt\(x2\), p: 'Solo miraste", "{ t: fmt(mayor), ok: true, p: 'Solo miraste"),
]
def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    html = open(sys.argv[1], encoding='utf8').read(); sobreviven = []
    e2e = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'prueba_clase_e2e.js')
    for nombre, patron, nuevo in MUT:
        m, n = re.subn(patron, lambda _: nuevo, html, count=1, flags=re.S)
        if n != 1: print(f'⚠️  {nombre}: no se pudo aplicar (la clase cambió); revisa la regla'); continue
        with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf8') as f: f.write(m); tmp = f.name
        r = subprocess.run(['node', e2e, tmp], capture_output=True, text=True); os.unlink(tmp)
        det = re.findall(r'  ❌ (.+)', r.stdout)
        if r.returncode != 0: print(f'✅ DETECTADA  {nombre}\n              ↳ {det[0][:110] if det else "error del runner"}')
        else: print(f'❌ SOBREVIVE  {nombre}'); sobreviven.append(nombre)
    print(f'\n{len(MUT) - len(sobreviven)}/{len(MUT)} averías detectadas'); sys.exit(1 if sobreviven else 0)
if __name__ == '__main__': main()
