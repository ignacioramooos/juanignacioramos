# Integrar las 22 fotos en la presentación BDE Stanislas

## Resultado

La presentación francesa de candidatura tendrá las **22 fotos de la carpeta de Google Drive**, sin omitir ni repetir ninguna. Cada foto aparecerá en una diapositiva distinta y se conservarán las cifras, textos y planillas actuales.

## Distribución de las imágenes

1. Descargar las 22 imágenes originales desde la carpeta compartida y crear un inventario verificable por nombre.
2. Respetar las asociaciones explícitas:
   - `ADMINS NUIT.JPG` → diapositiva **« De dix personnes à quatre »**.
   - `armado de escenario nuit.JPG` → diapositiva **« Nous avons construit notre propre scène »**.
   - `photo nuit (foto de toda la generación).JPEG` → tramo final sobre amistades, contactos y lo más importante de la experiencia.
   - `la fet 1.heic`, `la fet 2.heic`, `la fet 3.JPG` → tres diapositivas distintas de La Fet.
   - `nuit en salon .PNG`, `nuit en salon vista 2.JPG`, `nuit salon 3.JPG` → tres diapositivas distintas vinculadas a La Nuit 3 / formato sala.
   - `fuegos artificiales nuit.jpg`, `vista nuit 1.JPG` y `vista nuit 2.jpg` → diapositivas distintas de La Nuit 28/02 y La Nuit 2.
3. Inspeccionar visualmente las once fotos con nombres genéricos (`EE377…`, `IMG_0217`, `IMG_0948`, `IMG_1053`, `IMG_1258`, `IMG_1605`, `IMG_1636`, `IMG_2882`, `IMG_3156`, `IMG_8619`) y asignarlas según su contenido a las diapositivas restantes: montaje, escala, seguridad, logística, graduación, LEA, LFMUN, valores o cierre.
4. Si una imagen genérica no permite identificar un evento concreto, usarla en una diapositiva narrativa compatible sin atribuirle datos no comprobados.

## Calidad y presentación

- Guardar localmente los originales descargados para que la presentación no dependa de enlaces temporales de Drive.
- Convertir las fotos HEIC a un formato web de alta calidad, sin reducir innecesariamente su resolución ni deformar su proporción.
- Adaptar el sistema de diapositivas para composiciones visuales: imagen lateral, imagen protagonista o imagen de fondo con texto legible, según orientación y contenido.
- Usar recorte controlado y posición focal para rostros y sujetos; las capturas o imágenes documentales usarán ajuste completo cuando un recorte quite información.
- Mantener el diseño oscuro, la tipografía y la navegación/pantalla completa existentes.

## Control de integridad

- Añadir un manifiesto de las 22 imágenes y una comprobación automática que confirme:
  - 22 archivos esperados.
  - 22 referencias en la presentación.
  - Ninguna imagen repetida.
  - Ninguna imagen sin uso.
  - Una sola imagen de esta colección por diapositiva.
- Revisar visualmente las 26 diapositivas en escritorio y móvil, además del modo Present, para comprobar legibilidad, encuadre y ausencia de desbordes.

## Detalles técnicos

- Ampliar el bloque `image` del modelo de diapositivas con opciones semánticas de composición y encuadre.
- Actualizar el render de `SlideDeck` para permitir texto e imagen en una composición estable de 1920×1080.
- Incorporar las 22 referencias en `bdeStanislas.ts`, manteniendo intactos los números verificados de los Excel.
- Añadir los archivos optimizados bajo los recursos locales del proyecto y dejar los nombres trazables respecto de Drive.
