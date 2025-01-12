# React + Webpack Project

## Comandos utilizados y explicados

### **1. Inicialización del proyecto**
Crea un nuevo proyecto y genera un archivo `package.json`:
```bash
mkdir react-hola-mundo
cd react-hola-mundo
npm init -y
```

### **2. Instalación de dependencias**

#### **Dependencias principales:**
Instala React y ReactDOM:
```bash
npm install react react-dom
```

#### **Dependencias de desarrollo:**
Instala Webpack, Babel y otras herramientas necesarias:
```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
npm install --save-dev html-webpack-plugin dotenv-webpack
npm install --save-dev webpack-bundle-analyzer
```

### **3. Configuración de Webpack y Babel**

#### Configuración básica:
- Crea un archivo `webpack.config.js` para gestionar el bundling.
- Configura Babel en un archivo `.babelrc`:

`.babelrc`
```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### **4. Scripts en `package.json`**
Añade los siguientes scripts para facilitar el desarrollo, producción y análisis:
```json
"scripts": {
    "start": "webpack serve --env production=false",
    "build": "webpack --env production=true",
    "analyze": "webpack --env production=true --env analyze=true"
}
```

### **5. Variables de entorno**

#### Crea archivos `.env`:
- **`.env.development`**:
  ```env
  REACT_APP_API_URL=https://api.dev.example.com
  REACT_APP_ENVIRONMENT=Development
  ```
- **`.env.production`**:
  ```env
  REACT_APP_API_URL=https://api.example.com
  REACT_APP_ENVIRONMENT=Production
  ```

Webpack gestiona estos archivos mediante `dotenv-webpack`.

### **6. Servir la aplicación en modo desarrollo**
Inicia el servidor de desarrollo:
```bash
npm start
```
Esto usará las variables de `.env.development`.

### **7. Generar el build de producción**
Genera los archivos optimizados para producción:
```bash
npm run build
```
Esto generará el contenido en la carpeta `dist`.

### **8. Análisis del bundle**
Ejecuta el análisis del tamaño del bundle:
```bash
npm run analyze
```
Esto abrirá un reporte visual del tamaño de cada archivo en el navegador.

### **9. Servir en producción**
#### **Usar `serve`**
Instala y ejecuta un servidor estático:
```bash
npm install --global serve
serve -s dist
```
Esto servirá la aplicación en [http://localhost:3000/](http://localhost:3000/).

---

## Resumen de comandos

| **Tarea**                           | **Comando**                          |
| ----------------------------------- | ------------------------------------ |
| Inicializar proyecto                | `npm init -y`                        |
| Instalar dependencias               | `npm install react react-dom`        |
| Instalar herramientas de desarrollo | `npm install --save-dev webpack ...` |
| Servir en desarrollo                | `npm start`                          |
| Generar build de producción         | `npm run build`                      |
| Analizar tamaño del bundle          | `npm run analyze`                    |
| Servir en producción (con `serve`)  | `serve -s dist`                      |
