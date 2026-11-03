import base64, hashlib, io, json, os, re, glob
from PIL import Image
import numpy as np
out='banco_bruto'; os.makedirs(out,exist_ok=True)
vistos={}; filas=[]
for f in sorted(glob.glob('clases_repo/*/*.html')+glob.glob('clases_repo/index.html')):
    html=open(f,encoding='utf8',errors='ignore').read()
    clase=os.path.relpath(f,'clases_repo')
    for mt,b in re.findall(r'data:(image/[a-z+]+);base64,([A-Za-z0-9+/=]{200,})',html):
        h=hashlib.md5(b.encode()).hexdigest()[:10]
        if h in vistos:
            vistos[h]['usada_en'].append(clase); continue
        raw=base64.b64decode(b); ext=mt.split('/')[1].replace('jpeg','jpg').replace('svg+xml','svg')
        nombre=f'{h}.{ext}'
        open(f'{out}/{nombre}','wb').write(raw)
        d={'id':h,'archivo':nombre,'kb':len(raw)//1024,'primera_clase':clase,'usada_en':[clase],'tipo':mt}
        try:
            im=Image.open(io.BytesIO(raw)); d['w'],d['h']=im.size; d['alfa']='A' in im.mode
            if d['alfa']:
                a=np.array(im.convert('RGBA'))[:,:,3]; d['transp_pct']=round(float((a<10).mean())*100)
        except Exception: d['w']=d['h']=None
        vistos[h]=d; filas.append(d)
json.dump(filas,open(out+'/informe.json','w'),indent=1,ensure_ascii=False)
tot=sum(1 for _ in filas)
print('únicas:',tot,'| MB:',sum(x['kb'] for x in filas)//1024)
g=[x for x in filas if x['w'] and x['w']>=400]; print('>=400px ancho:',len(g))
print('con alfa:',sum(1 for x in filas if x.get('alfa')),'| svg:',sum(1 for x in filas if x['tipo'].endswith('svg+xml')))
print('reutilizadas en >=5 clases:',sum(1 for x in filas if len(x['usada_en'])>=5))
import collections
c=collections.Counter(('<128' if (x['w'] or 0)<128 else '<400' if x['w']<400 else '<800' if x['w']<800 else '>=800') for x in filas if x['w']); print(c)
