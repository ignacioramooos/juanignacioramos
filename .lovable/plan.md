# Documentos privados: arreglar el acceso y mostrar vistas previas

## Problema 1: la sección se queda vacía

Cuando la pestaña ya estaba "desbloqueada" de una visita anterior, la página se salta el
formulario de contraseña pero no tiene guardada la contraseña necesaria para pedir los
documentos. Resultado: no muestra nada y tampoco te deja volver a escribirla. En una
ventana de incógnito todo arranca de cero y por eso ahí sí funciona.

Arreglo: si falta la contraseña guardada, la página vuelve a mostrar el candado para que
la escribas una vez; a partir de ahí queda todo en la misma sesión. Además, los errores de
carga muestran un botón para reintentar sin recargar.

## Problema 2: vistas previas

Hoy cada documento es una fila con un ícono. Pasa a ser una grilla de tarjetas con
miniatura real del documento (primera página del PDF, foto, portada del video), al estilo
del portfolio y el blog.

Reglas visuales:
- Todas las tarjetas comparten el mismo alto y el mismo marco redondeado: nada de bordes
  grises desiguales aunque los archivos tengan tamaños distintos.
- La miniatura llena la tarjeta recortando de forma pareja (centrada), con un degradado
  suave abajo para el nombre.
- Si un archivo no tiene miniatura, la tarjeta muestra un fondo sobrio con el ícono del
  tipo de archivo, con el mismo tamaño y forma que las demás.
- Carga progresiva (aparecen con un fundido) y estados de carga con placeholders del mismo
  tamaño, para que la grilla no salte.
- En móvil: 2 columnas; en pantallas medianas 3; en grandes 4.

Las carpetas siguen expandidas, con sus archivos debajo del nombre, como ahora.

## Detalles técnicos

- `supabase/functions/private-documents/index.ts`: pedir también `thumbnailLink` y
  `hasThumbnail` a Drive. Como esas URLs requieren credenciales, la función descarga cada
  miniatura a través del gateway (en paralelo, con límite de concurrencia y tamaño máximo)
  y la devuelve como data URL dentro de cada archivo. Si falla una, el archivo se devuelve
  sin miniatura y se usa el fallback con ícono.
- `src/components/private/DocumentTree.tsx`: reemplazar la lista por una grilla de tarjetas
  con `aspect-[4/3]`, `object-cover`, `rounded-2xl`, borde y overlay de nombre; enlace
  "Abrir en Drive" como botón flotante en la esquina.
- `src/pages/ResumePrivatePage.tsx`: si `sessionStorage` tiene la marca de desbloqueo pero
  no la contraseña, forzar `unlocked = false` para volver a pedirla.
- Verificación: typecheck, y recorrido con navegador en `/resume/private` comprobando
  desbloqueo, grilla con miniaturas y vista previa, en escritorio y móvil.
