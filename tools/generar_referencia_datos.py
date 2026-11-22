#!/usr/bin/env python3
"""
generar_referencia_datos.py — genera el módulo 44 del prompt: el FORMATO del datos.json.

Toma, para cada tipo de slide, el ejemplo más completo de plantilla/ejemplos/*.datos.json
(clases que ya pasaron la puerta de calidad), así que el formato que ve Claude es siempre el real.
Sin esto, Claude no puede adivinar los nombres de los campos cuando no tiene acceso a los archivos.

Uso:
  python3 tools/generar_referencia_datos.py             → escribe prompt-modulos/44_formato_de_datos.md
  python3 tools/generar_referencia_datos.py --verificar → sale con 1 si el archivo está desfasado
"""
import glob, json, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, 'prompt-modulos', '44_formato_de_datos.md')
ORDEN = ['intro', 'info', 'quiz', 'evalFinal', 'tf', 'fill', 'drag', 'minijuego',
         'cuadricula', 'recta', 'comparar', 'podio', 'abierta', 'cuaderno',
         'enlazar', 'ordenar', 'memoria', 'relampago', 'sopa', 'candado',
         'fraccion', 'detective', 'tabla', 'editor', 'final']
BASICOS = {'intro', 'info', 'quiz', 'evalFinal', 'final'}      # siempre se incluyen
MODULO_DE_TIPO = {                                              # dónde están las reglas de cada tipo
    'cuadricula': 34, 'recta': 34, 'comparar': 34, 'podio': 34, 'cuaderno': 34, 'abierta': 43,
    'enlazar': 35, 'ordenar': 35, 'memoria': 35, 'relampago': 35, 'sopa': 35, 'candado': 35,
    'fraccion': 37, 'detective': 38, 'tabla': 40, 'editor': 41,
}

CABECERA = """# MÓDULO 44 — FORMATO DEL `datos.json`

> Generado por `tools/generar_referencia_datos.py` desde `plantilla/ejemplos/*.datos.json` (clases que ya pasaron la puerta de calidad). No se edita a mano: la prueba falla si queda desfasado.

Una clase es **solo** un JSON `{ "meta": {…}, "slides": […] }`. El motor, los colores y el aspecto son de la plantilla y no van aquí. Copia los **nombres de campo exactos** de los ejemplos de abajo: el motor no conoce otros. Las listas de los ejemplos están acortadas: los mínimos y máximos de cada tipo están en su módulo (se indica debajo de cada ejemplo).

**Reglas de forma comunes**
- Cada slide lleva un `id` único (`r01`, `r02`… en orden; los ejemplos también usan `m01`…). Cada pregunta lleva `id` único dentro de su quiz (`q1`, `q2`… y en el reto final `e1`, `e2`…).
- `meta.claseId`: con `meta.aula: true` es el nombre del archivo sin `.html`, p. ej. `semana6_tec4_p4` (`semana<N>_<mat|tec><grado>_p<período>`). `meta.materia`: `Aritmética` o `Tecnología e Informática`. `meta.grado`: 4 o 5. `meta.dba`: texto que empieza por «DBA: ».
- `meta.cofres` y `meta.premio` son **opcionales** (monedas y cofres, núcleo §5-E): `cofres` son **exactamente 5** `{"icono": "🛒", "nombre": "Carrito de compras"}` con el tema de la clase, de menos a más valioso (icono ≤ 8 caracteres, nombre ≤ 32); `premio` es un texto de 3 a 80 caracteres con un premio real que da el docente.
- `meta.aula: true` conecta la clase al Aula. `meta.aulaVersion` es solo un número (fecha `AAAAMMDD`) que obliga al navegador a recargar los scripts del Aula: copia el de la clase más reciente y no lo inventes; cámbialo solo si el docente avisa que actualizó esos scripts. Si no tienes una clase de referencia, pregúntalo.
- Preguntas (`quiz` y `evalFinal`): `nivel` ∈ `recordar` · `comprender` · `aplicar` · `analizar`. Una sola opción con `"correcta": true`; **toda opción incorrecta lleva `porQue`**. `calc` es `null` cuando no hay operación; con operación va `{"expr": "3.4+2.15", "resultado": "5,55"}` (decimales con coma o punto) y la puerta lo recalcula.
- Los ejemplos de abajo muestran la **forma** de cada tipo, no el largo: una clase real tiene 25 a 32 slides (núcleo §5-A).
- `abierta`: cada elemento de `prompts` es una frase de **mínimo 4 palabras** (un «Hoy aprendí que…» corto da error).
- Respuestas numéricas: pueden llevar `$` o `%` (`"$20"`, `"25 %"`); la puerta compara el número. Ninguna opción incorrecta puede valer lo mismo que la correcta.
- Imágenes: `"imagen": "asset://<id-del-banco>"` y su `"alt"` descriptivo. La mascota «así se hace» de un `info` va en `"aria": "asset://aria-asi-se-hace"`.
"""


def cargar():
    por_tipo, metas = {}, []
    for f in sorted(glob.glob(os.path.join(RAIZ, 'plantilla', 'ejemplos', '*.datos.json'))):
        d = json.load(open(f, encoding='utf-8'))
        metas.append(d['meta'])
        for s in d['slides']:
            por_tipo.setdefault(s['type'], []).append(s)
    return por_tipo, metas


def mejor(slides):
    """El ejemplo con más campos; a igualdad, el más corto."""
    return sorted(slides, key=lambda s: (-len(s), len(json.dumps(s, ensure_ascii=False))))[0]


def recortar(s):
    s = json.loads(json.dumps(s))
    if s['type'] in ('quiz', 'evalFinal') and len(s.get('preguntas', [])) > 1:
        s['preguntas'] = s['preguntas'][:1]
    return s


def generar():
    por_tipo, metas = cargar()
    meta = dict(sorted(metas, key=lambda m: -len(m))[0])     # el más completo...
    for m in metas:                                         # ...más las claves opcionales que traen los demás (aula, cofres, premio)
        for k, v in m.items(): meta.setdefault(k, v)
    out = [CABECERA, '## meta\n', '```json', json.dumps(meta, ensure_ascii=False), '```\n']
    out.append('## Un ejemplo por tipo de slide\n')
    faltan = [t for t in ORDEN if t not in por_tipo]
    if faltan:
        raise SystemExit('✗ Ningún ejemplo de plantilla/ejemplos usa estos tipos: ' + ', '.join(faltan))
    for t in ORDEN:
        s = recortar(mejor(por_tipo[t]))
        out.append('<!-- TIPO:%s -->' % t)
        out.append('### `%s`' % t)
        out.append('```json\n' + json.dumps(s, ensure_ascii=False) + '\n```')
        if s['type'] in ('quiz', 'evalFinal') and len(mejor(por_tipo[t]).get('preguntas', [])) > 1:
            out.append('(Muestra 1 pregunta; las demás tienen la misma forma. Cuántas y de qué niveles: núcleo §5.)')
        if t in MODULO_DE_TIPO:
            out.append('Reglas y límites de `%s`: módulo %d.' % (t, MODULO_DE_TIPO[t]))
        out.append('')
    return '\n'.join(out).rstrip() + '\n'


if __name__ == '__main__':
    nuevo = generar()
    if '--verificar' in sys.argv:
        actual = open(SALIDA, encoding='utf-8').read() if os.path.exists(SALIDA) else ''
        if actual != nuevo:
            print('✗ %s está desfasado: corre  python3 tools/generar_referencia_datos.py' % os.path.relpath(SALIDA, RAIZ)); sys.exit(1)
        print('✔ el formato de datos del prompt está al día'); sys.exit(0)
    open(SALIDA, 'w', encoding='utf-8').write(nuevo)
    print('Escrito', os.path.relpath(SALIDA, RAIZ), '—', len(nuevo), 'caracteres ≈', len(nuevo) // 3, 'tokens')
