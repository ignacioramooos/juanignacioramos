# Plan — Rediseño visual del portfolio

## Dirección (skill design-taste-frontend, seed 1842902362)

**"The page is the object"**: la página se convierte en un artefacto impreso del mundo de Juan Ignacio — el ticket de evento / manifiesto de misión. Papel sobre fondo, bordes con forma (muescas, festones, perforaciones), alineación tipográfica de imprenta, dos tintas.

**Frase de idea:** En esta página, *el ticket de las Nuits y el manifiesto de vuelo* se convierten en *la página misma*.

**Se respeta la memoria del proyecto:** dark mode por defecto, Space Grotesk + DM Sans, paleta crema/grafito (sin azul oscuro), starfield como fondo (es la identidad: el "papel" flota sobre las estrellas), bloques de contenido opacos, i18n EN/ES intacto, secciones ocultas (Colleges, USA) no se tocan.

## Cambios por capa

### 1. Tokens y base (`src/index.css`)
- Nuevos tokens: `--paper` (color papel), `--ink`, `--perforation` y utilidades `.ticket-notch`, `.scallop-edge`, `.perf-line` (clip-path/bordes punteados de puntos ≥4px).
- Curva de easing propia `--ease-out-expo: cubic-bezier(0.23,1,0.32,1)` (skill emil-design-eng).
- Radios: un solo radio del sistema; botones de una sola forma (pill, ya es la marca).
- Se eliminan gradientes de texto y sombras decorativas en reposo; superficies separadas por paso de tono, no por hairlines.

### 2. Hero → "El ticket" (reescritura de `Hero.tsx`)
- Panel papel 5:7 centrado, borde superior con muescas de ticket (clip-path), cortado por el borde inferior del viewport (la página continúa como el resto del ticket).
- Nombre en dos líneas grandes escalonadas (Juan Ignacio / Ramos), datos como líneas de ticket: Montevideo · 18 · Aerospace, separados por un rombo sólido.
- Franja perforada con código de barras decorativo en CSS y "ADMIT ONE → scroll".
- Una sola acción primaria (Ver proyectos). Sin pills, sin blur detrás del nombre (el panel papel ya da legibilidad — reemplaza la regla de hero-readability por un mecanismo mejor).
- Se conserva el starfield de fondo y el easter egg `data-easter-egg="header-name"`.

### 3. About → "Carta del fundador"
- Hoja papel de 640px con borde inferior festoneado y tira troquelada con el email, sobre fondo de contraste. Texto en primera persona (p1–p3 existentes), stats como fila de datos impresos (sin tarjetas).

### 4. Projects preview / Experience → "Carpetas apiladas con pestañas"
- Bandas de color plano full-width con `position: sticky` y offsets crecientes; cada proyecto/experiencia es una carpeta con pestaña (clip-path polygon) que lleva el nombre. Foto 16:10 a la izquierda, descripción a la derecha.

### 5. Skills → "Palabra gigante + filas de barras"
- Título de una palabra en capitales condensadas que llena el ancho (container units); grupos de skills como barras rellenas expansibles (`<details>`), nombre a la izquierda, + a la derecha.

### 6. Awards/FeaturedIn → "Lista de invitados impresa"
- Panel papel rotado 1–2°, cortado por el borde inferior de la sección, nombres como líneas centradas separadas por middots, foto insertada.

### 7. Contact → "Tarjeta de visita sobre fotografía"
- Foto full-bleed (arquitectura/estructura, set dealt, grayscale para casar con la paleta) con tarjeta papel opaca en esquina: título, datos, botón sólido full-width.

### 8. Footer → "El dorso de la tarjeta" + cortina
- Nuevo `Footer.tsx`: panel papel con festones superiores, mensaje a la izquierda, bloque de enlaces a la derecha, "sello postal" (foto 3:4), línea de imprenta con copyright.
- **Movimiento firma: curtain footer** — el contenido sube como hoja y descubre el footer (sticky + z-index, sin JS).

### 9. Navbar
- Barra plana: monograma JIR, links, una acción. Se mantiene la lógica de grupos/rutas; se simplifica el chrome (sin shadow, hairline solo al hacer scroll si hace falta).

### 10. Motion (skill emil-design-eng)
- Entradas escalonadas por sección (60–90ms, translateY 16–32px + opacity, una sola vez).
- `active:scale-[0.97]` en todo lo presionable; transiciones con propiedades explícitas, nunca `transition-all`.
- Nada anima desde scale(0); popovers con transform-origin en el trigger.
- `prefers-reduced-motion` respetado.

## Verificación
- `lint.mjs` + `inspect.mjs` del skill contra la preview; screenshots en 1440/768/390; crítica con rubrica y una ronda de fixes.
- Typecheck + tests existentes (`bdePhotos.test.ts`, `gas.test.ts`).
- Revisar mobile y dark/light (Ctrl+D).

## Fuera de alcance
- No se tocan: contenido/textos (solo presentación), rutas, admin, backend, secciones ocultas, decks privados.
