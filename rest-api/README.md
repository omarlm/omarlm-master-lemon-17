# Rick and Morty Character Explorer

Esta aplicación permite explorar y gestionar personajes de Rick and Morty utilizando diferentes fuentes de datos.

## Características

- Visualización de lista de personajes con detalles
- Edición de información de personajes
- Almacenamiento de la "mejor frase" para cada personaje
- Múltiples fuentes de datos:
  - Datos mock (funcionamiento offline)
  - API REST local (servidor mock)
  - API GraphQL de Rick and Morty (solo lectura)

## Cómo ejecutar la aplicación

### Requisitos previos

- Node.js (versión recomendada: 14.x o superior)
- npm (incluido con Node.js)

### Pasos para ejecutar

1. Instalar dependencias:
   ```
   npm install
   ```

2. Para usar el servidor mock local (opcional):
   ```
   npm run start:server
   ```

3. Iniciar la aplicación:
   ```
   npm run start:dev
   ```

4. Abrir en el navegador:
   ```
   http://localhost:8080
   ```

## Fuentes de datos

La aplicación permite cambiar entre diferentes fuentes de datos usando el selector en la parte superior:

### 1. Datos Mock (Mock Data)
- Datos estáticos incluidos en la aplicación
- Funciona sin conexión a internet
- Permite simular todas las operaciones CRUD

### 2. API REST (REST API)
- Requiere que el servidor mock local esté en ejecución (`npm run start:server`)
- Permite operaciones CRUD completas
- Los datos se almacenan localmente en el servidor mock

### 3. API GraphQL (GraphQL API)
- Conecta con la API oficial de Rick and Morty usando GraphQL
- Solo lectura (las operaciones de escritura se simulan)
- Requiere conexión a internet

## Estructura del proyecto

- `/src/pods/character`: Componentes y lógica para la vista de detalle de personaje
- `/src/pods/character-collection`: Componentes y lógica para la lista de personajes
- `/src/core/api-context`: Contexto para gestionar la selección de la fuente de datos
- `/src/common/components`: Componentes comunes, incluido el selector de API

## Notas técnicas

- La API GraphQL de Rick and Morty es de solo lectura, por lo que las operaciones de escritura se simulan
- El campo "bestSentence" es una extensión propia y no existe en la API original
- El servidor mock local almacena los datos en memoria, por lo que se reinician al reiniciar el servidor
