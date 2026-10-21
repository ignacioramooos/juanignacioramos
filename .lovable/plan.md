# Plan — Rediseño "Dark Room" del portfolio

## Dirección (design-taste-frontend, seed 1817372739) + skills de motion (emil-design-eng, apple-design, review-animations)

**"The dark room"**: un solo campo oscuro de arriba abajo — tu starfield ES la sala — y dentro, cosas iluminadas como piezas de una galería nocturna. Nada de bandas de sección ni grillas de tarjetas: cada pantalla tiene una o dos piezas iluminadas con aire alrededor.

**Frase de idea:** En esta página, *el cielo nocturno sobre Montevideo* se convierte en *la sala donde se exhibe el trabajo*.

**Se mantiene intacto:** starfield (es la sala), Space Grotesk + DM Sans, paleta crema/grafito sin azul oscuro, dark mode por defecto, i18n EN/ES, easter eggs, rutas, contenido y textos actuales (solo cambia la presentación), secciones ocultas.

## Qué cambia, sección por sección

1. **Hero → "Tira iluminada, cuatro esquinas"**: campo negro con una tira horizontal de fotografías (tus fotos reales: space camp, BDE, eventos) que se arrastra de lado con scroll-snap — es también el movimiento firma ("drag row") y la "cosa viva" de la página. Nombre arriba-izquierda, una frase abajo-izquierda, una acción abajo-derecha. El frame central a brillo pleno, los demás atenuados. Sin pills, sin gradientes de texto, sin blur detrás del nombre.
2. **About → "Retrato como capitular"**: biografía en tipo grande con retrato flotado como letra capitular; stats como datos pequeños al margen. Sin tarjetas.
3. **Experience → "Dispersión con pausas"**: cada experiencia aparece una por vez, alternando márgenes (izquierda 3:2, derecha 4:5, centro 16:9), con 22–30vh de vacío entre ellas. Nombre arriba, una línea debajo.
4. **Skills → "Foto sticky + lista activa"**: foto fija a la izquierda que crossfadea según la fila activa; filas de skills a la derecha que se abren al hover/scroll.
5. **Awards / FeaturedIn → "Nombres como una sola frase"**: los reconocimientos escritos como una oración corrida en tipo grande; un nombre se ilumina cada 2 segundos.
6. **Contact → "Tarjeta de visita sobre fotografía"**: foto full-bleed (cielo/espacio, del set dealt) con una tarjeta sólida opaca en la esquina: título, datos, botón sólido.
7. **Footer → "Una sola línea quieta"**: tras 30svh de vacío, una línea con descripción, links centrados y año. Sin columnas ni logo.
8. **Navbar**: barra plana sin chrome (sin sombra, sin hairline permanente); misma lógica de grupos y rutas.
9. **Tokens y motion** (`index.css`): curva `--ease-out-expo: cubic-bezier(0.23,1,0.32,1)`, entradas escalonadas 60–90ms (translateY+opacity, una vez), `active:scale-[0.97]` en todo lo presionable, transiciones con propiedades explícitas (nunca `transition-all`), nada desde `scale(0)`, `prefers-reduced-motion` respetado, hover animado solo en `@media (hover:hover)`.

## Imágenes
- Tus fotos propias (space-camp, BDE) primero; el resto del set "Sky and space" (NASA/auroras, picsum, licencia Unsplash) con `brightness(0.85)` para fundirse con el fondo. Créditos en el footer.

## Verificación
- `lint.mjs` + `inspect.mjs` del skill en 1440/768/390, crítica de screenshots y una ronda de fixes.
- Typecheck + tests existentes. Revisión mobile y dark/light.

## Fuera de alcance
Contenido/textos, rutas, admin, backend, decks privados, secciones ocultas.
