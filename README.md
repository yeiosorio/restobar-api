# RestoBar API

API REST para el procesamiento de imágenes y gestión de estadísticas.

## Características

- Procesamiento de imágenes (JPG → PNG)
- Almacenamiento en Firebase Storage
- Registro en Firestore
- Estadísticas temporales
- Documentación Swagger/OpenAPI

## Endpoints Principales

- `POST /api/images/upload`: Subir y procesar imagen
- `GET /api/images/by-date-range`: Obtener imágenes por fecha
- `GET /api/images/stats/hourly`: Estadísticas por hora

## Requisitos

- Node.js >= 18.x

## Configuración

3. **Instalación**
   ```bash
   # Instalar dependencias
   npm install

   # Desarrollo
   npm run dev

   # Producción
   npm start
   ```

## Documentación

La documentación completa de la API está disponible en `/api-docs` cuando el servidor está en ejecución.

## Tecnologías

- Express.js
- Firebase Admin SDK
- Multer (manejo de archivos)
- Sharp (procesamiento de imágenes)
- Swagger/OpenAPI (documentación) 