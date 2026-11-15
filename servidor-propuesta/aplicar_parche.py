#!/usr/bin/env python3
"""aplicar_parche.py — aplica a tu Code.gs los 5 cambios mínimos que conectan Abiertas.gs. No modifica el original:
escribe Code.gs.con-cambios y CAMBIOS_Code.gs.diff. Cada punto de enganche debe existir UNA sola vez (si no, se detiene y te dice cuál).
Uso: python3 aplicar_parche.py RUTA/Code.gs"""
import difflib, os, sys
ruta = sys.argv[1]; orig = open(ruta, encoding='utf8').read(); s = orig
CAMBIOS = [
 ("1. Al guardar el progreso, procesar las respuestas abiertas (función _guardarEstadoItem)",
  "    h.appendRow([id, clave, txt, horaStr()]);\n  }\n  return t;\n}",
  "    h.appendRow([id, clave, txt, horaStr()]);\n  }\n  try { guardarAbiertas(j, clave, b); } catch (eAb) { Logger.log('Respuestas abiertas: ' + eAb); }   // nunca impide guardar el progreso\n  return t;\n}"),
 ("2. Menú del docente (función onOpen)",
  "      .addItem('📊 Actualizar resumen por grupo', 'menuActualizarResumen')\n",
  "      .addItem('📊 Actualizar resumen por grupo', 'menuActualizarResumen')\n      .addItem('📝 Ir a las respuestas abiertas', 'menuAbiertasIr')\n      .addItem('📝 Respuestas por revisar (resumen)', 'menuAbiertasPendientes')\n"),
 ("3. Al eliminar un perfil, borrar sus respuestas (función adminEliminar)",
  "    hoja(CFG.HOJA_SEG).deleteRow(j.filaS);",
  "    try { borrarAbiertasDe(id); } catch (eAb) {}\n    hoja(CFG.HOJA_SEG).deleteRow(j.filaS);"),
 ("4. «Empezar de cero» también vacía las respuestas (función reiniciarEstudiantes)",
  "    cache().remove('rk');\n    try { actualizarResumen(SpreadsheetApp.getActiveSpreadsheet()); } catch (e2) {}\n    return 'Listo: se borraron '",
  "    try { n += limpiarAbiertas(); } catch (eAb) {}\n    cache().remove('rk');\n    try { actualizarResumen(SpreadsheetApp.getActiveSpreadsheet()); } catch (e2) {}\n    return 'Listo: se borraron '"),
 ("5. Crear la hoja al configurar (función configurar)",
  "    hs.hideSheet(); he.hideSheet();\n",
  "    hs.hideSheet(); he.hideSheet();\n    try { asegurarHojaAbiertas(); } catch (eAb) { Logger.log('Respuestas abiertas: ' + eAb); }\n"),
]
for titulo, antes, despues in CAMBIOS:
    n = s.count(antes)
    if n != 1: sys.exit(f'✖ No se pudo aplicar «{titulo}»: el punto de enganche aparece {n} veces (debe ser 1). Tu Code.gs cambió: edita a mano esa función.')
    s = s.replace(antes, despues); print('✔', titulo)
aqui = os.path.dirname(os.path.abspath(__file__))
open(os.path.join(aqui, 'Code.gs.con-cambios'), 'w', encoding='utf8').write(s)
d = ''.join(difflib.unified_diff(orig.splitlines(True), s.splitlines(True), 'Code.gs (original)', 'Code.gs (con cambios)', n=2))
open(os.path.join(aqui, 'CAMBIOS_Code.gs.diff'), 'w', encoding='utf8').write(d)
print(f'\nListo: {len(CAMBIOS)} cambios · {sum(1 for l in d.splitlines() if l.startswith("+") and not l.startswith("+++"))} líneas añadidas · 0 eliminadas' if not any(l.startswith('-') and not l.startswith('---') for l in d.splitlines()) else '\nListo (revisa el diff)')
