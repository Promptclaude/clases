## 🔴 PRIORIDAD 69 · ALTA — JUEGO «DETECTIVE» Y CALIDAD DE IMÁGENES (motor 31)

### 1. Juego `detective` (alfabetización digital: correos, mensajes, sitios y noticias)
El estudiante toca las partes **sospechosas** 🚩 de un mensaje y pulsa «Revisar». Tiene **2 revisiones** y 💡 Pista; cada revisión dice «Encontraste 4 de 5 pistas y 1 señal que en realidad estaba bien» **sin decir cuáles**. 1.ª revisión perfecta = 1 punto · 2.ª = 0,5 · tras 2 fallos se muestran todas las pistas con su explicación (0). No toca la nota ni retiene a nadie («No me sale»).
```json
{"id":"d03","type":"detective","titulo":"Detective del correo","contexto":"✉️ Correo recibido",
 "intro":"…","ejemplo":"…","pista":"(opcional)","lineas":[
  [{"t":"De:","fijo":true},{"t":"premios@gmai1.com","s":true,"porQue":"El remitente escribe gmai1 con el número 1: es una dirección falsa."}],
  [{"t":"Para:","fijo":true},{"t":"ana@colegio.edu.co"}],
  [{"t":"Gracias por leer este mensaje."}]]}
```
- Cada línea es una lista de **partes**. `fijo:true` = etiqueta que no se toca («De:», «Asunto:»). `s:true` = **pista** (con `porQue` de 4+ palabras). Sin `s` = parte normal que sirve de **falsa alarma**.
- Entre **3 y 6 pistas** y **al menos 2 partes normales claramente normales** (no ambiguas: un saludo genérico como «Estimado usuario» SÍ es una señal, no lo uses de relleno). Mínimo 3 líneas.
- Úsalo para: correo falso (phishing), mensaje de WhatsApp con cadena, sitio de compras falso, noticia falsa, perfil sospechoso, contraseña débil.
- Cada clase de Tecnología con tema de seguridad o información en internet debería llevar **al menos un** `detective`.

### 2. Calidad de las imágenes del banco
`banco.json` tiene ahora el campo `recorte` en personajes e ilustraciones que **tocan el borde** del lienzo (casi siempre son recortes de una lámina y se ven cortados). El empaquetador avisa al usarlas; `buscar_banco.py --sin-recorte` las excluye.
- **Prefiere imágenes sin `recorte`.** Si usas una con `recorte`, confirma en pantalla que se ve completa y menciónalo en el informe al docente.
- Después de agregar imágenes nuevas al banco, ejecuta `python3 banco-imagenes/_herramientas/medir_recortes.py`.

### Pruebas
El e2e (T27) comprueba: revisar sin marcar no gasta revisión, el aviso «x de n pistas y y falsas alarmas» sin revelar, la pista, lograrlo en la 2.ª revisión, la explicación final de cada pista y que tras 2 fallos muestra lo que faltó y deja continuar. Ejemplo real: `plantilla/ejemplos/tec5_detectives_internet.datos.json`.
