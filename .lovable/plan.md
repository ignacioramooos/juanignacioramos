# Ajustes: CPGE MPSI + aplicar las skills al resto del sitio

## 1. Bloque CPGE MPSI (Educación)
Dejar solo dos puntos, en inglés y español:
- "Selective two-year intensive program admitted via Parcoursup" / "Programa intensivo selectivo de dos años, admisión vía Parcoursup"
- "Prepares for France's Grandes Écoles." / "Prepara para las Grandes Écoles de Francia."

Se quitan la lista de escuelas y el punto de los orales semanales (colles).

## 2. Menú de abajo del celular (lo que señalaste)
Problemas que las skills nombran explícitamente y que el menú actual tiene:
- Usa íconos Lucide genéricos (redesign-existing-projects: "Lucide exclusively = default AI choice"; minimalist-ui y high-end-visual-design también los prohíben).
- Usa metáforas cliché: cohete para Projects, maletín para Services.
- Texto de 10px y zonas táctiles chicas (menos de 44px de alto).
- El estado activo solo cambia el color gris, casi invisible.
- El panel "Explore" pone 5 enlaces en una fila: en 402px de ancho se desborda.
- El margen inferior del iPhone no está bien resuelto.

Rediseño:
- Íconos de Phosphor en un solo peso fino y uniforme, con metáforas menos obvias (ej.: Projects = órbita/plano, Services = herramienta/compás, Explore = constelación, Contact = sobre/señal).
- Ítems de al menos 44×44px, etiqueta legible (~11–12px, Space Grotesk) y estado activo claro: un punto/línea crema bajo el ítem activo que se desliza entre pestañas (resorte sin rebote, al estilo apple-design).
- Respuesta inmediata al tocar (leve reducción de tamaño), sin esperar al soltar.
- "Explore" abre una hoja desde abajo, en lista vertical (no fila), que sale y vuelve por el mismo camino, con fondo atenuado y cierre al tocar afuera.
- Margen inferior con `env(safe-area-inset-bottom)`.
- Con "reducir movimiento" activado: transiciones solo de opacidad.

## 3. Íconos en todo el sitio
- Reemplazar Lucide por Phosphor en los ~50 archivos que lo usan (navbar, secciones, páginas, admin), con un mismo peso y tamaño coherente.
- Revisar y cambiar metáforas cliché (cohete = "lanzar", escudo = "seguridad", etc.) donde aparezcan.
- Los componentes internos de la interfaz (menús, diálogos) también se pasan a Phosphor para que no queden dos estilos mezclados.

## 4. Pasada de skills por el resto de la página
Releer completas design-taste-frontend, redesign-existing-projects, high-end-visual-design, minimalist-ui, apple-design, emil-design-eng, mobile-native y web-design-guidelines, y corregir lo que se encuentre, priorizando:
- Navbar de escritorio: menú hamburguesa que se transforma en X, desplegable "Portfolio" que nace del botón.
- Botones con flecha: la flecha dentro de su propio círculo.
- Sin emojis, sin filas de tarjetas idénticas con ícono arriba, sin adornos decorativos.
- Respuesta al presionar en todos los botones; animaciones interrumpibles.
- Tipografía: títulos grandes con interletrado negativo, texto normal sin cambiar.
- Celular: nada se desborda en 402px, zonas táctiles de 44px.

Se mantienen sin cambios: dirección "dark room", fondo de estrellas, colores (sin azul oscuro), Space Grotesk/DM Sans, Hero sin fotos, foto de Space Camp en Featured In, secciones ocultas y el estilo Harvard del Resume.

## 5. Verificación
Capturas en celular (402×725) y escritorio de la home, el menú inferior abierto y cerrado, Projects, Services y Explore; build y tests en verde.

## Detalles técnicos
- Agregar `@phosphor-icons/react`; quitar `lucide-react` cuando no quede ningún uso.
- Pestaña activa en `MobileBottomNav` con `layoutId` de Framer Motion (`type: spring, bounce: 0`).
- Lint de design-taste-frontend sobre `src/components` y `src/pages` hasta 0 FAIL.
