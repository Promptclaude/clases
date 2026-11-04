import warnings; warnings.filterwarnings('ignore')
# NOTA: script histórico de la construcción inicial del banco. Leía el pack antiguo assets-reutilizables/ (ya retirado; recuperable con git tag archivo-v24-v25). Para ampliar el banco usa tools/limpiar_recortes.py --registrar banco-imagenes/banco.json
import json, os, re, shutil, subprocess, io, tempfile
from PIL import Image
import numpy as np, cv2
R='banco-imagenes'
shutil.rmtree(R,ignore_errors=True)
for d in ['personajes/aria','personajes/npc','interfaz/botones','interfaz/barras-y-marcos','interfaz/fondos-ui','premios','juego','escenarios','tematicos/por-clasificar','infografias','_especificas','_descartadas/posible-ip-terceros','_descartadas/baja-resolucion','_herramientas']:
    os.makedirs(f'{R}/{d}',exist_ok=True)
items=[]
def dhash(im):
    g=Image.new('RGBA',im.size,(255,255,255,255)); g.alpha_composite(im.convert('RGBA'))
    a=np.array(g.convert('L').resize((9,8)),dtype=int); return (a[:,1:]>a[:,:-1]).flatten()
def sharp(im):
    g=np.array(im.convert('L')); 
    if max(g.shape)>800: g=cv2.resize(g,None,fx=800/max(g.shape),fy=800/max(g.shape))
    return float(cv2.Laplacian(g,cv2.CV_64F).var())
# 1) pack existente
P='prompt_repo/assets-reutilizables'
pack=json.load(open(P+'/assets.json'))['assets']
mapa={'aria-busto':'personajes/aria','aria-cuerpo':'personajes/aria','premio':'premios','kit-juego':'juego'}
hashes=[]
for a in pack:
    dst=mapa[a['categoria']]; src=P+'/'+a['archivo']
    nom=os.path.basename(src); shutil.copy(src,f'{R}/{dst}/{nom}')
    svg=f'{P}/kit-juego/svg/{a["id"]}.svg'
    if a['categoria']=='kit-juego' and os.path.exists(svg): shutil.copy(svg,f'{R}/{dst}/{a["id"]}.svg')
    im=Image.open(src); hashes.append(dhash(im))
    items.append({'id':a['id'],'archivo':f'{dst}/{nom}','svg':(f'{dst}/{a["id"]}.svg' if os.path.exists(svg) and a['categoria']=='kit-juego' else None),
      'categoria':dst.split('/')[0],'subcategoria':dst.split('/')[-1] if '/' in dst else '','uso':a['uso'],'tags':a['tags'],
      'ancho':a['ancho'],'alto':a['alto'],'transparente':True,'tiene_texto':bool(a.get('texto_incluido')),'texto':a.get('texto_incluido',''),
      'origen':a.get('origen','pack v26'),'estado':'aprobada','calidad':5,'usada_en':[]})
npack=len(items)
# 2) extraídas
inf=json.load(open('banco_bruto/informe.json'))
IP={'e9b379':'personaje estilo Minecraft','9cdf81':'personaje estilo Among Us','605e57':'personaje estilo Among Us','d5a89e':'logo Microsoft Word','7cc13e':'estética Minecraft','fc8894':'estética Minecraft'}
def ocr(path):
    try:
        im=Image.open(path).convert('RGBA'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); bg=bg.convert('L')
        if bg.width<700: bg=bg.resize((bg.width*2,bg.height*2))
        t=tempfile.mktemp('.png'); bg.save(t)
        o=subprocess.run(['tesseract',t,'-','-l','eng','--psm','11','tsv'],capture_output=True,text=True,timeout=40).stdout
        os.remove(t); ws=[]
        for l in o.split('\n')[1:]:
            p=l.split('\t')
            if len(p)>=12 and p[11].strip():
                try: c=float(p[10])
                except: continue
                if c>=70 and len(re.sub(r'[^A-Za-zÁÉÍÓÚáéíóúñÑ0-9]','',p[11]))>=3: ws.append(p[11])
        return ' '.join(ws)
    except Exception as e: return ''
def meta(clase):
    if clase=='index.html': return {'area':'portal','grado':None,'semana':0}
    m=re.search(r'semana(\d+)_(mat|tec)(\d)',clase)
    if m: return {'area':'aritmetica' if m.group(2)=='mat' else 'tecnologia','grado':int(m.group(3)),'semana':int(m.group(1))}
    m=re.search(r'(mat|tec)\w*(\d)_p4',clase)
    return {'area':'aritmetica' if m and m.group(1)=='mat' else 'tecnologia','grado':int(m.group(2)) if m else None,'semana':0}
dup=0
for x in inf:
    path='banco_bruto/'+x['archivo']; ext=x['archivo'].split('.')[-1]
    m=meta(x['primera_clase']); tags=[m['area'],f"{m['grado']}°"]
    tg=[t for t in tags if t and t!='None°']
    rec={'id':'img-'+x['id'],'origen':'extraída de '+x['primera_clase'],'usada_en':x['usada_en'],'veces_usada':len(x['usada_en']),'tags':tg,'area':m['area'],'grado':m['grado'],'semana':m['semana']}
    if ext=='svg':
        sub='juego'; dst=f'{R}/juego/svg-{x["id"]}.svg'; shutil.copy(path,dst)
        rec.update(archivo=f'juego/svg-{x["id"]}.svg',categoria='juego',subcategoria='',ancho=None,alto=None,transparente=True,tiene_texto=False,texto='',estado='por_revisar',calidad=3,uso='SVG extraído de clase'); items.append(rec); continue
    im=Image.open(path); w,h=im.size; alfa=x.get('alfa',False)
    h1=dhash(im)
    if any((h1!=h0).sum()<=5 for h0 in hashes): dup+=1; continue
    txt=ocr(path); clean=re.sub(r'[^A-Za-zÁÉÍÓÚáéíóúñÑ0-9]','',txt)
    ctexto=len(clean)>=4
    sh=sharp(im); q=1+(w>=300)+(w>=500)+(sh>200)+(sh>800); q=min(q,5)
    asp=w/h; tp=x.get('transp_pct',0)
    rec.update(ancho=w,alto=h,transparente=alfa,tiene_texto=ctexto,texto=txt[:160],calidad=q,estado='por_revisar',uso='')
    iden=x['id'][:6]
    if iden in IP: cat,sub,est='_descartadas','posible-ip-terceros','descartada'; rec['motivo']=IP[iden]
    elif w<128: cat,sub,est='_descartadas','baja-resolucion','descartada'; rec['motivo']=f'{w}x{h}px'
    elif ctexto: cat,sub,est='_especificas',f"{m['area']}{m['grado'] or ''}",'especifica'
    elif asp>3.2 and h<200: cat,sub,est='interfaz','barras-y-marcos','por_revisar'
    elif alfa and tp>25 and max(w,h)<=520 and 0.6<asp<1.6 and w<300: cat,sub,est='juego','','por_revisar'
    elif alfa and tp>25: cat,sub,est='personajes','npc','por_revisar'
    elif not alfa and asp>=1.5 and w>=600: cat,sub,est='escenarios','','por_revisar'
    else: cat,sub,est='tematicos','por-clasificar','por_revisar'
    rec['estado']=est
    d=f'{cat}/{sub}'.rstrip('/'); 
    nom=f"{x['id']}.{ext}"; os.makedirs(f'{R}/{d}',exist_ok=True); shutil.copy(path,f'{R}/{d}/{nom}')
    rec.update(archivo=f'{d}/{nom}',categoria=cat,subcategoria=sub); items.append(rec)
import collections
print('pack',npack,'| duplicados del pack omitidos',dup,'| total en banco',len(items))
print(collections.Counter((i['categoria'],i['subcategoria']) for i in items))
print(collections.Counter(i['estado'] for i in items))
json.dump({'version':1,'generado':'2026-11-03','total':len(items),'campos':{'estado':'aprobada | por_revisar | especifica | descartada','calidad':'1-5 (resolución+nitidez)','tiene_texto':'True = no reutilizable fuera de su tema'},'imagenes':items},open(R+'/banco.json','w'),ensure_ascii=False,indent=1)
