# BDE Stanislas: fusionar diapositivas 17 y 18 en la 16

## Qué cambia

1. **Se eliminan las diapositivas 17 y 18** ("Une salle pleine, une autre dynamique" y "Observer la salle en temps réel"). El deck pasa de 26 a 24 diapositivas.
2. **Sus dos fotos se mueven a la diapositiva 16** ("Même cadre, format salle"), junto con la que ya estaba ahí: tres fotos de La Nuit 3 en una sola diapositiva.
3. **Todas las imágenes del deck se ven enteras**, sin recortes, en todas las diapositivas.
4. **Se quitan todos los pies de foto** del deck.

Las 22 fotos siguen presentes, ninguna se pierde.

## Detalles técnicos

- `src/components/deck/SlideDeck.tsx`:
  - Soportar varios bloques `image` por diapositiva: se recogen todos y se renderizan en la columna lateral; con 2 o 3 imágenes se apilan verticalmente repartiendo la altura disponible.
  - Forzar `object-contain` (con fondo `bg-muted`) en todas las imágenes, ignorando `fit`/`position`, para que nunca se recorten.
  - Eliminar el render de `figcaption`.
- `src/data/decks/bdeStanislas.ts`:
  - Borrar las entradas `nuit3-vista` y `nuit3-production`.
  - Añadir a `nuit3` los bloques imagen `nuitSalonVista2` y `nuitSalon3` (queda con `nuitSalon` + 2).
  - Quitar la propiedad `caption` de todos los bloques `image`.
- `src/data/decks/types.ts`: dejar `caption` fuera del bloque `image` (y `fit`/`position` sin efecto o eliminados).
- `src/data/decks/bdePhotos.test.ts`: actualizar la regla "máximo 1 imagen por diapositiva" para permitir hasta 3; se mantiene la verificación de 22 fuentes, 22 usadas y sin repeticiones.

## Verificación

- Test unitario del inventario de fotos.
- Typecheck.
- Recorrido con navegador del deck completo en escritorio y móvil: confirmar 24 diapositivas, las tres fotos juntas en la 16, ninguna imagen recortada y ningún pie de foto.
