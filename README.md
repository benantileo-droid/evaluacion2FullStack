🌱 Huerto Hogar
Huerto Hogar es una aplicación web desarrollada con React para la venta de productos orgánicos, frutas y verduras.

El proyecto fue desarrollado para la Evaluación 2 de la asignatura FullStack II (DSY1104) de Duoc UC.

🚀 Tecnologías utilizadas
React
Vite
JavaScript
Bootstrap
React Router DOM
LocalStorage
Jasmine
Karma
Testing Library
esbuild
Git y GitHub
🛒 Funcionalidades principales
La aplicación permite:

Visualizar productos disponibles.
Filtrar productos por categoría.
Buscar productos.
Ver el detalle de cada producto.
Agregar productos al carrito.
Aumentar o disminuir cantidades.
Eliminar productos del carrito.
Calcular automáticamente el total de la compra.
Realizar un proceso de Checkout.
Simular una compra exitosa o fallida.
Visualizar ofertas.
Registrar usuarios.
Iniciar sesión.
Visualizar información de Huerto Hogar.
Utilizar un formulario de contacto.
Visualizar publicaciones del Blog y sus detalles.
⚙️ Panel de administración
La aplicación incluye un modo administrador que permite realizar operaciones CRUD sobre los productos.

El administrador puede:

Crear productos.
Visualizar productos.
Editar productos.
Eliminar productos.
Cada producto puede contener:

Nombre.
Precio.
Categoría.
Descripción.
Imagen.
Los cambios realizados en los productos se almacenan utilizando LocalStorage para mantener la información después de recargar la página.

🧪 Pruebas unitarias
El proyecto utiliza Jasmine y Karma para las pruebas unitarias.

Jasmine se utiliza para definir y escribir las pruebas, mientras que Karma se encarga de ejecutarlas utilizando ChromeHeadless como navegador.

Actualmente el proyecto cuenta con 10 pruebas unitarias.

Las pruebas comprueban:

Renderizado de componentes.
Uso de props.
Cambios de estado.
Eventos de usuario.
Renderizado condicional.
Funciones mediante Spy.
Cálculo del total del carrito.
Interacciones con productos y carrito.
Resultado actual:

Executed 10 of 10 SUCCESS
TOTAL: 10 SUCCESS
▶️ Ejecutar el proyecto
Primero se deben instalar las dependencias:

npm install
Luego iniciar el servidor de desarrollo:

npm run dev
Vite mostrará una dirección local para acceder a la aplicación desde el navegador.

🧪 Ejecutar las pruebas
Para ejecutar las pruebas unitarias:

npm test
Karma iniciará ChromeHeadless y ejecutará las pruebas desarrolladas con Jasmine.

📦 Generar versión de producción
Para generar el proyecto para producción:

npm run build
Los archivos generados quedarán almacenados en la carpeta:

dist/
📁 Estructura principal
src/
├── assets/
├── components/
├── data/
├── pages/
├── test/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
components
Contiene componentes reutilizables de la aplicación, como las tarjetas y detalles de productos.

data
Contiene los datos iniciales utilizados por la aplicación.

pages
Contiene las diferentes vistas de Huerto Hogar, incluyendo productos, carrito, checkout, administración, registro, login, blog
