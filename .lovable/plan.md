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

## Estructura de la presentación (≈22 diapositivas, en francés)

1. Portada — Candidature BDE Stanislas, pôle Événementiel
2. Ce que je ne prétends pas / ce que j'apporte (tono humilde)
3. Panorama : 6 événements dirigés, chiffres clés en 3 stats
4. Chronologie des événements (tabla corta)
5. La Nuit 28/02 — le pari (objectif 750)
6. La Nuit 28/02 — le résultat (821, 406.090 UYU)
7. La Nuit 28/02 — le budget (captura de planilla)
8. La Nuit 2 — passer à l'échelle (1.246 entradas)
9. La Nuit 2 — 310.500 UYU de coûts (captura)
10. La Nuit 2 — l'imprévu à 40.000 (carpa) y cómo se absorbió
11. La Nuit 3 — même cadre, salle en centre-ville
12. La Fet — du chiffre d'affaires au résultat net (captura del balance)
13. La Fet — 18 personnes payées, en règle (captura de la hoja de personal)
14. Sécurité — dispositif type y costos
15. Gradu française — 1.013 entradas, 1.382.000 UYU
16. Gradu française — tarification par paliers (captura)
17. Projet LEA — contrôle d'accès par pièce d'identité
18. Projet LEA — modèle probabilistique de présence (captura del dashboard)
19. LFMUN — 150 invités, format non festif
20. Valeurs humaines : bénévolat, Foro Ágora, Engineering for Impact, deporte
21. Ce que je ferais au BDE (método: presupuesto, equipo, seguridad, post-mortem)
22. Cierre humilde + cita «Mind and Hand»

## «Capturas» de los Excel

No puedo pegar imágenes reales de tus hojas, pero sí reproducirlas fielmente: agregaré un bloque nuevo tipo *sheet* que dibuja una grilla estilo planilla (letras de columna, números de fila, celdas de totales resaltadas) con los datos exactos de tus archivos. Se ve como una captura de Excel y las cifras son las tuyas. Si después subís capturas reales en PNG, las reemplazo en un minuto.

## Detalles técnicos

- Nuevo bloque `{ type: "sheet"; title?; columns; rows; highlightRows? }` en `src/data/decks/types.ts` y su render en `SlideDeck.tsx` (grilla monoespaciada, cabecera tipo hoja de cálculo, filas de total en negrita).
- Nuevo archivo `src/data/decks/bdeStanislas.ts` con el deck en francés.
- `ResumePrivatePage.tsx`: agregar el deck a la lista (queda junto al de «Event Organization»).
- El deck existente en inglés se mantiene sin cambios.
- Cifras siempre en UYU con nota «≈ conversión indicative en EUR» donde aporte contexto.
