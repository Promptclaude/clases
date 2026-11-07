#!/usr/bin/env python3
"""generar_kit_matematicas.py — dibuja en SVG (vectores, fondo transparente, 100 % originales) material de matemáticas:
fracciones (círculos y barras, vacías y pintadas), bloques de base 10, figuras geométricas y dinero genérico.
Los registra en banco.json (categoria `matematicas`) como `aprobada`. Se puede volver a ejecutar (reemplaza lo suyo).
Uso: python3 generar_kit_matematicas.py"""
import json, math, os
AQUI = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(AQUI, '..'); P = os.path.join(R, 'banco.json'); B = json.load(open(P, encoding='utf8'))
INK, PINTA, VACIO = '#334155', '#fbbf24', '#ffffff'
B['imagenes'] = [x for x in B['imagenes'] if x.get('categoria') != 'matematicas']
def guardar(sub, id_, svg, w, h, uso, tags):
    d = os.path.join(R, 'matematicas', sub); os.makedirs(d, exist_ok=True); open(os.path.join(d, id_ + '.svg'), 'w', encoding='utf8').write(svg)
    B['imagenes'].append({'id': id_, 'archivo': f'matematicas/{sub}/{id_}.svg', 'svg': None, 'categoria': 'matematicas', 'subcategoria': sub, 'uso': uso, 'tags': sorted(set(['matematicas', sub] + tags)), 'ancho': w, 'alto': h, 'transparente': True,
        'tiene_texto': False, 'texto': '', 'origen': 'dibujada por Claude en SVG (original)', 'estado': 'aprobada', 'calidad': 5, 'usada_en': []})
svg = lambda w, h, cuerpo, t: f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{t}">{cuerpo}</svg>'
def circulo(n, k):
    c = ''
    for i in range(n):
        a0 = -math.pi / 2 + i * 2 * math.pi / n; a1 = a0 + 2 * math.pi / n; X = lambda a: 62 + 56 * math.cos(a); Y = lambda a: 62 + 56 * math.sin(a)
        c += f'<path d="M62 62L{X(a0):.2f} {Y(a0):.2f}A56 56 0 0 1 {X(a1):.2f} {Y(a1):.2f}Z" fill="{PINTA if i < k else VACIO}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
    return svg(124, 124, c, f'Círculo dividido en {n} partes iguales' + (f' con {k} pintadas' if k else ''))
def barra(n, k):
    w = 240 / n; c = ''.join(f'<rect x="{6 + i * w:.2f}" y="8" width="{w:.2f}" height="48" fill="{PINTA if i < k else VACIO}" stroke="{INK}" stroke-width="3"/>' for i in range(n))
    return svg(252, 64, c, f'Barra dividida en {n} partes iguales' + (f' con {k} pintadas' if k else ''))
for n in (2, 3, 4, 5, 6, 8, 10, 12):
    guardar('fracciones', f'mate-circulo-{n}-vacio', circulo(n, 0), 124, 124, f'Círculo en {n} partes iguales, sin pintar', ['circulo', 'partes', f'{n}-partes']); guardar('fracciones', f'mate-barra-{n}-vacia', barra(n, 0), 252, 64, f'Barra en {n} partes iguales, sin pintar', ['barra', 'partes', f'{n}-partes'])
for n, k in ((2, 1), (3, 1), (3, 2), (4, 1), (4, 3), (5, 1), (5, 2), (5, 3), (6, 1), (6, 5), (8, 1), (8, 3), (10, 1), (10, 5)):
    guardar('fracciones', f'mate-circulo-{k}-{n}', circulo(n, k), 124, 124, f'Círculo con {k}/{n} pintado', ['circulo', 'fraccion', f'{k}/{n}']); guardar('fracciones', f'mate-barra-{k}-{n}', barra(n, k), 252, 64, f'Barra con {k}/{n} pintado', ['barra', 'fraccion', f'{k}/{n}'])
# base 10
cel = lambda x, y, s, f: f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="{f}" stroke="#1e3a8a" stroke-width="1.5"/>'
guardar('base10', 'mate-bloque-unidad', svg(34, 34, cel(4, 4, 26, '#60a5fa'), 'Bloque unidad (1)'), 34, 34, 'Bloque de base 10: unidad (1 cubito)', ['unidad', 'valor-posicional', 'bloques'])
guardar('base10', 'mate-bloque-decena', svg(34, 274, ''.join(cel(4, 4 + i * 26, 26, '#34d399') for i in range(10)), 'Barra decena (10)'), 34, 274, 'Bloque de base 10: decena (barra de 10)', ['decena', 'valor-posicional', 'bloques'])
guardar('base10', 'mate-bloque-centena', svg(274, 274, ''.join(cel(4 + j * 26, 4 + i * 26, 26, '#fbbf24') for i in range(10) for j in range(10)), 'Placa centena (100)'), 274, 274, 'Bloque de base 10: centena (placa de 100)', ['centena', 'valor-posicional', 'bloques'])
cub = '<polygon points="20,50 110,50 110,140 20,140" fill="#f472b6" stroke="#831843" stroke-width="2"/><polygon points="20,50 60,15 150,15 110,50" fill="#fbcfe8" stroke="#831843" stroke-width="2"/><polygon points="110,50 150,15 150,105 110,140" fill="#ec4899" stroke="#831843" stroke-width="2"/>' + ''.join(f'<line x1="{20 + i * 9}" y1="50" x2="{20 + i * 9}" y2="140" stroke="#831843" stroke-width=".6"/><line x1="20" y1="{50 + i * 9}" x2="110" y2="{50 + i * 9}" stroke="#831843" stroke-width=".6"/>' for i in range(1, 10))
guardar('base10', 'mate-bloque-millar', svg(160, 150, cub, 'Cubo millar (1000)'), 160, 150, 'Bloque de base 10: millar (cubo de 1000)', ['millar', 'valor-posicional', 'bloques'])
# geometría
def poli(n, rot=-90, r=52, cx=62, cy=62): return ' '.join(f'{cx + r * math.cos(math.radians(rot + i * 360 / n)):.1f},{cy + r * math.sin(math.radians(rot + i * 360 / n)):.1f}' for i in range(n))
figs = [('triangulo', 'Triángulo', f'<polygon points="{poli(3)}"', '#f87171'), ('cuadrado', 'Cuadrado', '<rect x="12" y="12" width="100" height="100"', '#60a5fa'), ('rectangulo', 'Rectángulo', '<rect x="4" y="30" width="116" height="64"', '#34d399'), ('circulo', 'Círculo', '<circle cx="62" cy="62" r="52"', '#fbbf24'),
        ('pentagono', 'Pentágono', f'<polygon points="{poli(5)}"', '#c084fc'), ('hexagono', 'Hexágono', f'<polygon points="{poli(6, 0)}"', '#fb923c'), ('rombo', 'Rombo', '<polygon points="62,8 114,62 62,116 10,62"', '#f472b6'), ('trapecio', 'Trapecio', '<polygon points="30,24 94,24 118,100 6,100"', '#2dd4bf'), ('octogono', 'Octágono', f'<polygon points="{poli(8, -67.5)}"', '#a3e635')]
for id_, nom, forma, col in figs: guardar('geometria', f'mate-fig-{id_}', svg(124, 124, f'{forma} fill="{col}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>', nom), 124, 124, f'{nom} (figura geométrica)', ['figura', 'poligono' if id_ != 'circulo' else 'curva', id_])
# dinero genérico
for v in (100, 200, 500, 1000):
    guardar('dinero', f'mate-moneda-{v}', svg(100, 100, f'<circle cx="50" cy="50" r="46" fill="#fcd34d" stroke="#92400e" stroke-width="4"/><circle cx="50" cy="50" r="36" fill="none" stroke="#b45309" stroke-width="2.5"/><text x="50" y="60" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="{26 if v < 1000 else 22}" fill="#78350f">{v}</text>', f'Moneda de {v} pesos (genérica)'), 100, 100, f'Moneda genérica de {v} (ilustración original, no es una moneda real)', ['moneda', 'dinero', 'pesos', str(v)])
for v, col in ((2000, '#86efac'), (5000, '#fda4af'), (10000, '#93c5fd')):
    cuerpo = (f'<rect x="4" y="4" width="192" height="92" rx="10" fill="{col}" stroke="#166534" stroke-width="3"/><rect x="14" y="14" width="172" height="72" rx="6" fill="none" stroke="#166534" stroke-width="1.5" stroke-dasharray="4 3"/>'
              f'<circle cx="46" cy="50" r="22" fill="#ffffff88" stroke="#166534" stroke-width="2"/><text x="46" y="58" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="22" fill="#14532d">$</text>'
              f'<text x="140" y="60" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="28" fill="#14532d">{str(v)[:-3]}.000</text>')
    guardar('dinero', f'mate-billete-{v}', svg(200, 100, cuerpo, f'Billete de {v} pesos (genérico)'), 200, 100, f'Billete genérico de {v} (ilustración original, no es un billete real)', ['billete', 'dinero', 'pesos', str(v)])
B['total'] = len(B['imagenes']); json.dump(B, open(P, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print(f"{sum(1 for x in B['imagenes'] if x['categoria'] == 'matematicas')} imágenes de matemáticas generadas y registradas")
