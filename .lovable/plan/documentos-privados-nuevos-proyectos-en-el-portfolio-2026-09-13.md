# Documentos privados + nuevos proyectos en el portfolio

## 1. Nueva sección "Documentos" dentro de la zona privada

Dentro de `/resume/private` (detrás de la misma contraseña) aparece una sección **Documentos**, junto a las presentaciones.

Se muestra todo el contenido de tu carpeta de Drive **ya desplegado**: cada subcarpeta es un encabezado y debajo, visibles de entrada, todos sus archivos. No hay que hacer clic en ninguna carpeta para ver qué contiene. Si una subcarpeta tiene carpetas adentro, se anidan igual, todas abiertas.

Hoy tu carpeta contiene 10 subcarpetas: Resume, Gradu/Prom, Transcript, Recommendations, rocket simulation, cor ad cor, foro agora, 2020 desalination project, DHS-C y sheets nuit.

Cada archivo se muestra con su nombre limpio (sin el prefijo "Copy of"), un icono según el tipo (PDF, documento, planilla, imagen, video) y el peso. Al hacer clic se abre una vista previa dentro del sitio, en una ventana grande; también hay un botón para abrirlo en Drive.

La lista se arma en vivo desde Drive: cuando agregues o saques archivos allá, la sección se actualiza sola sin tocar el sitio.

## 2. Lectura y análisis de los documentos

Voy a abrir y leer cada documento de las carpetas de proyectos (DHS-C, 2020 desalination project, cor ad cor, foro agora, rocket simulation, Gradu/Prom, sheets nuit, Transcript, Recommendations) para entender exactamente qué es cada uno: alcance, fechas, resultados, cifras reales.

## 3. Sumar al portfolio y al resume

Con eso, **agrego** — sin quitar ni bajarle protagonismo a nada existente:

- Proyectos nuevos que hoy no figuran en el sitio, como entradas propias en la página de proyectos y en la sección técnica del resume.
- Detalle real (fechas, resultados, cifras, tecnologías) a los proyectos que ya existen: destilador solar, Cor ad Cor, Foro Ágora, simulación de cohetes.
- Traducciones al español de todo lo nuevo.

Regla que mantengo: no invento datos; solo uso lo que digan los documentos. Si algo es ambiguo, te lo pregunto antes de publicarlo. Nada de lo privado (cartas de recomendación, boletín) se publica en la parte pública del sitio.

## Detalles técnicos

- Nueva edge function `private-documents`: recibe la contraseña (misma validación de tiempo constante contra `RESUME_ACCESS_PASSWORD` que `resume-access`), y solo si es correcta consulta Drive por el gateway de conectores (`google_drive`, conexión ya existente) recorriendo recursivamente la carpeta raíz. Devuelve un árbol `{ name, files: [{ id, name, mimeType, size, webViewLink, iconType }], folders: [...] }`. El ID de la carpeta raíz queda como constante en la función; la contraseña nunca se guarda en el cliente más allá de la sesión ya existente.
- El front guarda la contraseña validada en `sessionStorage` (ya existe el flag de desbloqueo) para poder pedir el listado; si falla la validación se muestra el estado bloqueado.
- Nuevo componente `src/components/private/DocumentTree.tsx` renderiza el árbol expandido, y `DocumentPreview.tsx` muestra el visor (`https://drive.google.com/file/d/<id>/preview` en iframe; para Docs/Sheets el `/preview` equivalente).
- `ResumePrivatePage.tsx` gana un conmutador entre "Presentaciones" y "Documentos".
- Contenido nuevo del portfolio: entradas en `src/data/profile.ts` / proyectos y en `src/data/resume.ts`, más cadenas en `src/i18n/translations/en.ts` y `es.ts`.
- Verificación: typecheck, tests y recorrido con Playwright en `/resume/private` (desbloqueo, listado desplegado, apertura de una vista previa) en escritorio y móvil.
