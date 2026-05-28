# Netflix Senior Mode v2

Prototipo de Netflix Senior Mode para el Proyecto 2 de Interaccion Humano-Computadora. Esta version implementa mejoras de usabilidad para adultos mayores de 60+ con poca experiencia digital, basadas en pruebas con usuarios.

## Objetivo del proyecto

Netflix Senior Mode v2 busca reducir la carga cognitiva y mejorar la accesibilidad visual mediante:

- Texto mas grande en titulos, botones, categorias y descripciones.
- Alto contraste para facilitar la lectura.
- Pantalla principal simplificada.
- Botones grandes con texto claro e iconos.
- Buscador visible en la barra superior.
- Secciones claras: "Recomendado para ti" y "Peliculas clasicas".
- Opcion visible de "Senior Mode".
- Control para aumentar texto o activar vista accesible.
- Boton "Volver" visible para mejorar control y libertad.
- Mensajes de confirmacion despues de acciones importantes.

## Heuristicas de Nielsen aplicadas

- H2 Correspondencia entre el sistema y el mundo real: acciones con lenguaje claro como "Buscar", "Reproducir", "Volver" y "Guardar para despues".
- H3 Control y libertad del usuario: boton de regreso visible y controles simples durante la reproduccion.
- H6 Reconocimiento antes que recuerdo: funciones principales siempre visibles, sin depender de memoria.
- H8 Estetica y diseno minimalista: menos categorias y menos elementos innecesarios en la pantalla principal.
- H9 Ayuda para reconocer y recuperarse de errores: mensajes claros cuando no hay resultados o cuando una accion se completa.

## Tecnologias utilizadas

- React
- Vite
- React Router
- Lucide React
- CSS personalizado

## Requisitos

Tener instalado:

- Node.js
- npm o pnpm

El proyecto incluye `pnpm-lock.yaml`, por lo que se recomienda usar pnpm.

## Instalacion

Desde la carpeta del proyecto:

```powershell
cd "C:\Users\Eduardo Ramirez\Documents\Proyecto 2 IHC"
pnpm install
```

Si prefieres npm:

```powershell
npm install
```

## Correr el proyecto localmente

Con pnpm:

```powershell
pnpm dev
```

Con npm:

```powershell
npm run dev
```

Luego abrir en el navegador:

```text
http://127.0.0.1:5173/
```

En esta computadora tambien se puede correr con el Node incluido en Codex:

```powershell
& "C:\Users\Eduardo Ramirez\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" ".\node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5173
```

## Compilar para produccion

Con pnpm:

```powershell
pnpm build
```

Con npm:

```powershell
npm run build
```

La carpeta generada sera:

```text
dist/
```

## Previsualizar la compilacion

Despues de compilar:

```powershell
pnpm preview
```

O con npm:

```powershell
npm run preview
```

## Flujo principal verificado

El flujo principal funciona sin interrupciones:

1. Entrar a la pantalla principal.
2. Presionar "Buscar".
3. Buscar una pelicula, por ejemplo "Roma".
4. Abrir la pantalla de detalle.
5. Presionar "Reproducir".
6. Guardar la pelicula con "Guardar para despues".
7. Recibir mensaje claro de confirmacion.

## Estructura del proyecto

```text
src/
  components/
    AppShell.jsx
    PosterCard.jsx
    SectionHeading.jsx
  data/
    catalog.js
  hooks/
    useVoiceGuidance.js
  lib/
    app-model.jsx
    copy.js
    storage.js
  screens/
    CategoriesScreen.jsx
    DetailScreen.jsx
    HomeScreen.jsx
    PlayerScreen.jsx
    SearchScreen.jsx
    SettingsScreen.jsx
  App.jsx
  main.jsx
  styles.css
```

## Archivos importantes

- `src/screens/HomeScreen.jsx`: pantalla principal simplificada para Senior Mode v2.
- `src/screens/SearchScreen.jsx`: buscador visible y facil de usar.
- `src/screens/SettingsScreen.jsx`: opciones de texto grande, vista accesible y ayudas.
- `src/components/AppShell.jsx`: navegacion principal, boton Volver, Buscar y Aumentar texto.
- `src/styles.css`: estilos de alto contraste, botones grandes y layout accesible.
- `src/data/catalog.js`: catalogo de peliculas, series y documentales.

## Repositorio

Repositorio del proyecto:

```text
https://github.com/Guallitoprogra/Proyecto2_Netflix-.git
```
