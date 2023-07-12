# CAC23001-TIF
El presente proyecto es una app full stack que lista una serie de productos y permite hacer operaciones CRUD a una API.

## Arquitectura

### Backend
Para el backend se utilizó Python Flask para la gestión de rutas y MariaDB para la administración de tablas.

### Frontend
El frontend es una SPA hecha íntegramente con Vue3 utilizando la sintaxis "Composition API". Incluye las librerías Vue-router para las rutas y Vuex para la administración de estado global. Para los estilos se utilizaron las clases de Bootstrap5

### Alojamiento
La API de consulta se encuentra alojado en el servicio de PythonAnyware. Por razones de seguridad la 

El frontend se encuentra en Netlify:
https://tintinando-cac23001.netlify.app

## Utilización
Es una app extremadamente sencilla. En el menú principal lista los productos, y tiene un falso login que permite hacer una edición o eliminación del producto.

El estado Login habilita el apartado "Agregar productos", donde se obtiene un formulario para completar los datos de un producto nuevo junto con la URL de la imagen.