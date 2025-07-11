# Master Front End XVII - Módulo 3 - Bundling Laboratorio - Básico

## Comandos utilizados y explicados

### **1. Inicialización del proyecto**
Crea un nuevo proyecto y genera un archivo `package.json`:
```bash
npm init -y
```

### **2. Instalación de dependencias**

#### **Dependencias de desarrollo:**
Instala Webpack y herramientas necesarias:
```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev html-webpack-plugin ts-loader typescript
npm install --save-dev sass sass-loader css-loader style-loader
```

### **3. Configuración de Webpack y TypeScript**

#### Configuración básica:
- Crea un archivo `webpack.config.js` para gestionar el bundling.
- Configura TypeScript en un archivo `tsconfig.json`.

#### Ejemplo de `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### **4. Scripts en `package.json`**
Añade los siguientes scripts para facilitar el desarrollo y la producción:
```json
"scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
}
```

### **5. Crear estructura del proyecto**

#### Estructura básica:
```
01_bundling_basic/
├── src/
│   ├── index.ts
│   ├── styles.scss
├── public/
│   ├── index.html
├── dist/
├── tsconfig.json
├── webpack.config.js
├── package.json
```

#### Archivo `public/index.html`:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>01_bundling_basic</title>
</head>

<body>
    <div id="app"></div>
</body>

</html>
```

#### Archivo `src/index.ts`:
```typescript
import './styles.scss';

const appDiv: HTMLElement | null = document.getElementById('app');

if (appDiv) {
    appDiv.innerHTML = `
        <h1 class="title">Hello World!</h1>
        <img src="/lemoncode.png" alt="Logo" class="logo">
    `;
}
```

#### Archivo `src/styles.scss`:
```scss
$primary-color: #3498db;

.title {
    color: $primary-color;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
}

.logo {
    display: block;
    margin: 1rem auto;
    max-width: 150px;
    height: auto;
}
```

### **6. Servir la aplicación en modo desarrollo**
Inicia el servidor de desarrollo:
```bash
npm start
```
Esto servirá la aplicación en [http://localhost:8080/](http://localhost:8080/).

### **7. Generar el build de producción**
Genera los archivos optimizados para producción:
```bash
npm run build
```
Esto generará el contenido en la carpeta `dist`.

---

## Resumen de comandos

| **Tarea**                           | **Comando**                          |
| ----------------------------------- | ------------------------------------ |
| Inicializar proyecto                | `npm init -y`                        |
| Instalar herramientas de desarrollo | `npm install --save-dev webpack ...` |
| Servir en desarrollo                | `npm start`                          |
| Generar build de producción         | `npm run build`                      |
