import json, os, warnings; warnings.filterwarnings('ignore')
from PIL import Image, ImageDraw
R='banco-imagenes'; os.makedirs(R+'/vistas-previas',exist_ok=True)
b=json.load(open(R+'/banco.json'))['imagenes']
def hoja(nombre,lst,T=150,cols=12,maxn=144):
    lst=[x for x in lst if not x['archivo'].endswith('.svg')][:maxn]
    if not lst: return
    rows=(len(lst)+cols-1)//cols; s=Image.new('RGB',(cols*T,rows*(T+12)),(225,225,232)); d=ImageDraw.Draw(s)
    for i,x in enumerate(lst):
        im=Image.open(f"{R}/{x['archivo']}").convert('RGBA'); im.thumbnail((T-6,T-6))
        bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im)
        X,Y=(i%cols)*T,(i//cols)*(T+12); s.paste(bg.convert('RGB'),(X+3,Y+3)); d.text((X+3,Y+T-1),x['id'][-6:],fill=(0,0,0))
    s.save(f'{R}/vistas-previas/{nombre}.png')
for cat,sub in [('juego',''),('personajes','npc'),('tematicos','por-clasificar'),('interfaz','barras-y-marcos'),('escenarios',''),('_descartadas','posible-ip-terceros')]:
    hoja((cat+'-'+sub).strip('-'),[x for x in b if x['categoria']==cat and x['subcategoria']==sub])
print(os.listdir(R+'/vistas-previas'))
