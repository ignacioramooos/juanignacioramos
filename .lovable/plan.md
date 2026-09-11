# Dossier BDE Stanislas — présentation « Organisation d'événements »

Presentación nueva, **en francés**, dentro del espacio protegido (`/resume/private`), pensada para el jurado del BDE: muchas diapositivas, poca carga por diapositiva, y cifras reales extraídas de tus planillas.

## Cifras verificadas en tus archivos

Leí las cinco planillas que subiste. Estos son los números reales que usaré (nada inventado):

**La Nuit 28/02** — objetivo 750 entradas, **821 vendidas**, 873 personas en lista, ingreso bruto **406.090 UYU**, presupuesto de gastos 216.900 UYU (carpa 60.000, luces/sonido/cerchas 35.000, seguridad 40.000, terreno 40.000, generador 17.000, baños 8.000, DJ 10.000). Público: 44,4 % chicos / 55,6 % chicas. Escala de precios en 5 tandas (350 → 800).

**La Nuit 2** — objetivo 1.110, **1.246 entradas vendidas**, presupuesto 310.500 UYU (carpa 125.000 = 85.500 + 40.000 de movimiento de último momento, luces/sonido 60.000, seguridad 37.500, terreno 35.000, alcohol+agua 14.000), previsión bruta 606.700 UYU, 7 tandas (350 → 1.000). Incluye La Nuit 3 en el local del centro (hoja «Costo Nuit en rincón»).

**La Fet (22/08/2025)** — cierre contable completo: entradas 276.400, ropería 11.400, barra 5.300; costos 127.546; **ganancia neta 134.566 UYU** tras IVA. Personal: 18 puestos por 51.021 UYU (limpieza, bartenders, cajeros, ropería, encargado, portero, 4 seguridad + encargado, 2 guardias 223, iluminación/DJ), BPS 6.237, AGADU 14.462, permiso IMM, contador.

**Gradu francesa** — 1.013 entradas, gastos totales 1.382.000 UYU, 10 tandas de precio (850 → 2.000), costo por persona 1.300.

**Proyecto LEA (04.07)** — 157 confirmados (107 mujeres / 50 hombres), objetivo 150, aforo máximo seguro 180, control por cédula, y un **modelo probabilístico de asistencia** propio: asistencia esperada 124,9, rango 80 % = 118–131.

**LFMUN** — 150 invitados, 13 colegios, 6 comisiones, catering y protocolo diplomático.

## Relato de apertura (tu contexto)

Antes, en el liceo, las fiestas de graduación se financiaban con actividades que rendían poco y los estudiantes terminaban pagando de su bolsillo. En la primera asamblea general propuse hacer fiestas de verdad; nació el «comité jodas» y quedé como presidente. Empezamos 10, terminamos 4 trabajando codo a codo. Buscamos todo desde cero — terreno, baños, generador, luces, sonido, DJ, seguridad, permisos — e incluso construimos nuestro propio escenario para las dos primeras. Todo mientras preparábamos el bac: imprevistos de último momento, decisiones difíciles, delegar, buscar alternativas. Salió bien. Cierre de esa idea: candidatura al pôle Événementiel, y también a la présidence si el jurado lo considera.

## Estructura de la presentación (≈24 diapositivas, en francés)

1. Portada — Candidature BDE Stanislas, pôle Événementiel (y présidence)
2. Le point de départ — antes las graduaciones se pagaban del bolsillo de los alumnos
3. La proposition en assemblée générale — nace el « comité jodas », presidencia
4. L'équipe — de 10 a 4 personas, reparto de roles
5. Tout partir de zéro — terreno, baños, generador, luces, sonido, seguridad, permisos
6. Notre propre scène — construida por nosotros en las dos primeras ediciones
7. En parallèle du bac — gestión del estrés y de las prioridades
8. Panorama : 6 eventos dirigidos, cifras clave en 3 stats
9. Chronologie des événements (tabla corta)
10. La Nuit 28/02 — le pari (objectif 750)
11. La Nuit 28/02 — le résultat (821, 406.090 UYU)
12. La Nuit 28/02 — le budget (captura de planilla)
13. La Nuit 2 — passer à l'échelle (1.246 entradas)
14. La Nuit 2 — 310.500 UYU de coûts (captura)
15. La Nuit 2 — l'imprévu à 40.000 (carpa) y cómo se absorbió
16. La Nuit 3 — même cadre, salle en centre-ville
17. La Fet — du chiffre d'affaires au résultat net (captura del balance)
18. La Fet — 18 personnes payées, en règle (captura de la hoja de personal)
19. Sécurité — dispositif type y costos
20. Gradu française — 1.013 entradas, 1.382.000 UYU (captura de tandas)
21. Projet LEA — contrôle d'accès par pièce d'identité + modelo probabilístico (captura)
22. LFMUN — 150 invités, format non festif
23. Valeurs humaines : bénévolat, Foro Ágora, Engineering for Impact, deporte, amistades y contactos que dejó el camino
24. Ce que je ferais au BDE + candidature (événementiel / présidence) y cierre humilde con « Mind and Hand »


## «Capturas» de los Excel

No puedo pegar imágenes reales de tus hojas, pero sí reproducirlas fielmente: agregaré un bloque nuevo tipo *sheet* que dibuja una grilla estilo planilla (letras de columna, números de fila, celdas de totales resaltadas) con los datos exactos de tus archivos. Se ve como una captura de Excel y las cifras son las tuyas. Si después subís capturas reales en PNG, las reemplazo en un minuto.

## Detalles técnicos

- Nuevo bloque `{ type: "sheet"; title?; columns; rows; highlightRows? }` en `src/data/decks/types.ts` y su render en `SlideDeck.tsx` (grilla monoespaciada, cabecera tipo hoja de cálculo, filas de total en negrita).
- Nuevo archivo `src/data/decks/bdeStanislas.ts` con el deck en francés.
- `ResumePrivatePage.tsx`: agregar el deck a la lista (queda junto al de «Event Organization»).
- El deck existente en inglés se mantiene sin cambios.
- Cifras siempre en UYU con nota «≈ conversión indicative en EUR» donde aporte contexto.
