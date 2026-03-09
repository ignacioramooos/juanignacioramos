

# Optimización del Portfolio

## Cambios a realizar

### 1. Blur detrás del texto (Hero)
Agregar un div con `backdrop-blur` después del nombre para crear separación visual entre el texto y el starfield.

**Archivo:** `src/components/sections/Hero.tsx`

---

### 2. Botones más grandes en Explore (Mobile)
Aumentar el tamaño de los links en el popup de Explore: padding más grande y fuente más legible.

**Archivo:** `src/components/MobileBottomNav.tsx`

---

### 3. Imágenes con placeholder blur-up
Crear un componente `BlurImage` que:
- Muestra un placeholder con blur mientras carga
- Transiciona suavemente a la imagen completa
- Usa CSS `filter: blur()` que se anima a `blur(0)`

**Archivos:** 
- Crear `src/components/ui/blur-image.tsx`
- Actualizar `src/pages/BlogPage.tsx` y `src/pages/BlogPostPage.tsx`

---

### 4. Quitar Sign Up
Eliminar toda la lógica de sign up del LoginPage, dejando solo el formulario de login.

**Archivo:** `src/pages/LoginPage.tsx`

---

### 5. Optimización de carga
El sitio ya es mayormente estático (React SPA). Los únicos datos dinámicos vienen de Supabase (blog posts, projects). Para mejorar perceived performance:
- Agregar `staleTime` alto a las queries de React Query
- Usar `placeholderData` para evitar loading states visibles
- Los componentes estáticos (Hero, About, etc.) ya no hacen fetch

**Archivo:** Componentes que usan `useQuery`

---

## Resumen técnico

| Cambio | Archivo |
|--------|---------|
| Backdrop blur en Hero | `Hero.tsx` |
| Botones Explore más grandes | `MobileBottomNav.tsx` |
| BlurImage component | Nuevo + BlogPage/BlogPostPage |
| Solo login, sin signup | `LoginPage.tsx` |
| Optimizar React Query | Componentes con useQuery |

