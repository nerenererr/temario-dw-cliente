# Tema 3.3 Introducción al DOM

## Bloque 1: Selección y modificación básica

### Ejercicio 1: Interruptor de estado

**Conceptos:** `getElementById`, `textContent`, `style`, evento `click`.
Crea una estructura HTML con un párrafo `<p id="estado">Estado: Desconectado</p>` y un botón `<button id="btnToggle">Conectar</button>`.
Programa el JavaScript necesario para que, al hacer clic en el botón:

1. El texto del párrafo cambie a `"Estado: Conectado"`.
2. El color del texto del párrafo (`color`) pase a ser verde (`green`) y su peso de fuente (`fontWeight`) sea negrita (`bold`).
3. El texto del propio botón cambie a `"Conectado"`.

---

### Ejercicio 2: Vista previa de tarjeta en tiempo real

**Conceptos:** `getElementById`, evento `input`, `textContent`, `style`.
Crea un formulario sencillo con un campo de texto `<input type="text" id="inputNombre" placeholder="Escribe tu nombre...">` y un selector de color `<input type="color" id="inputColor">`. Debajo, crea un contenedor `<div id="tarjeta">Tu nombre aparecerá aquí</div>`.
Haz que en tiempo real (mientras el usuario interactúa con los campos):

1. El texto dentro de `#tarjeta` se actualice exactamente con lo que el usuario escribe en `#inputNombre`. Si el campo queda vacío, debe volver a mostrar `"Tu nombre aparecerá aquí"`.
2. Al cambiar el color en `#inputColor`, el color de fondo (`backgroundColor`) de `#tarjeta` cambie al valor seleccionado.

---

### Ejercicio 3: Validador de contraseña con alerta visual

**Conceptos:** `getElementById`, evento `input`, `textContent`, `style`.
Crea un campo `<input type="password" id="passwordInput" placeholder="Mínimo 8 caracteres">` y un párrafo `<p id="mensajeSeguridad">Introduce una contraseña</p>`.
Programa un escuchador en tiempo real que evalúe la longitud de la contraseña escrita:

* Si tiene **0 caracteres**: muestra `"Introduce una contraseña"` en color negro.
* Si tiene **menos de 8 caracteres**: muestra `"Contraseña débil (mínimo 8 caracteres)"` en color rojo (`red`).
* Si tiene **8 o más caracteres**: muestra `"Contraseña segura"` en color verde (`green`).

---

## Bloque 2: Creación, inserción y eliminación de elementos

### Ejercicio 4: Generador de etiquetas (Tags)

**Conceptos:** `createElement`, `appendChild`, `textContent`, `style`.
Crea un `<input type="text" id="tagInput" placeholder="Añadir etiqueta...">`, un `<button id="btnAddTag">Añadir</button>` y un contenedor `<div id="tagContainer"></div>`.
Al pulsar el botón:

1. Valida que el texto no esté vacío (usando `.trim()`).
2. Crea un nuevo elemento `<span>` en memoria.
3. Asígnale el texto introducido, un color de fondo gris claro (`lightgray`), un `padding` de `'5px 10px'` y un margen derecho (`marginRight`) de `'5px'`.
4. Insértalo dentro de `#tagContainer` y limpia el `input`.

---

### Ejercicio 5: Lista de compras con botón de borrado individual

**Conceptos:** `createElement`, `appendChild`, `remove`, `event.target` (Delegación de eventos).
Partiendo de un `<input id="productoInput">`, un `<button id="btnAgregar">Agregar</button>` y una lista `<ul id="listaCompra"></ul>`:

1. Al hacer clic en "Agregar", crea un `<li>` que contenga el nombre del producto y, dentro de ese mismo `<li>`, crea un `<button>` con el texto `"X"`.
2. Añade el botón al `<li>`, y el `<li>` al `<ul>`.
3. Implementa **delegación de eventos** sobre `#listaCompra` para que, al hacer clic específicamente en cualquiera de los botones `"X"` (`event.target.tagName === 'BUTTON'`), se elimine el elemento padre correspondiente (`event.target.parentElement.remove()`).

---

### Ejercicio 6: Historial de clics con límite

**Conceptos:** `createElement`, `appendChild`, `remove`, `querySelectorAll`.
Crea un botón `<button id="btnRegistrar">Registrar Acción</button>` y una lista `<ol id="historial"></ol>`.
Cada vez que el usuario pulse el botón:

1. Crea un `<li>` con el texto `"Acción registrada a las "` seguido de la hora actual (`new Date().toLocaleTimeString()`).
2. Insértalo en `#historial`.
3. Comprueba cuántos `<li>` hay en la lista usando `querySelectorAll('#historial li')`. Si hay **más de 5 elementos**, elimina el primer elemento de la lista (`items[0].remove()`) para que nunca se muestren más de 5 registros.

---

## Bloque 3: Colecciones de nodos, búsqueda y filtros dinámicos

### Ejercicio 7: Resaltador de palabras clave

**Conceptos:** `querySelectorAll`, `forEach`, `style`.
Crea 5 párrafos con la clase `.noticia` que contengan distintos textos sobre tecnología y deportes, y un botón `<button id="btnResaltar">Resaltar Noticias de JS</button>`.
Al hacer clic en el botón:

1. Selecciona todos los elementos con la clase `.noticia`.
2. Recórrelos usando `.forEach()`.
3. Si el `textContent` del párrafo contiene la palabra `"JavaScript"` (sin importar mayúsculas o minúsculas), cambia su `backgroundColor` a `'#fff3cd'` y su borde izquierdo (`borderLeft`) a `'4px solid #ffc107'`.

---

### Ejercicio 8: Buscador de productos en catálogo

**Conceptos:** `querySelectorAll`, `forEach`, `input`, `toLowerCase()`, `includes()`, `style.display`.
Crea un buscador `<input type="text" id="buscador" placeholder="Buscar producto...">` y una lista `<ul id="catalogo">` con al menos 8 elementos `<li>` (por ejemplo: *Teclado Mecánico, Ratón Inalámbrico, Monitor 24", Portátil Gaming, Auriculares Bluetooth, Alfombrilla XL, Webcam HD, Micrófono USB*).
Programa el evento `input` para que filtre la lista en tiempo real:

* Si el texto del `<li>` incluye lo escrito en el buscador, asegúrate de que su `display` sea `'list-item'`.
* De lo contrario, ocúltalo cambiando su `display` a `'none'`.

---

### Ejercicio 9: Contador de resultados visibles

**Conceptos:** `querySelectorAll`, `forEach`, `includes()`, `textContent`.
Toma como base el **Ejercicio 8** y añade un párrafo encima de la lista: `<p id="contadorResultados">Mostrando 8 de 8 productos</p>`.
Modifica la lógica del buscador para que, cada vez que el usuario escriba:

1. Cuente cuántos elementos `<li>` coinciden con la búsqueda.
2. Actualice el texto de `#contadorResultados` mostrando `"Mostrando X de Y productos"` (donde `X` son los visibles e `Y` el total de elementos en la lista).
3. Si `X` es igual a `0`, cambia el texto a `"No se encontraron productos"` en color rojo.

---

### Ejercicio 10: Gestor Completo de tareas

**Conceptos:** Todos los del tema (`getElementById`, `createElement`, `appendChild`, `remove`, `event.target`, `querySelectorAll`, `forEach`, `includes`, `input`, `click`).
Construye una aplicación de tareas completa con los siguientes elementos HTML:

* Un campo `<input id="nuevaTarea" placeholder="Nueva tarea...">` y un botón `<button id="btnCrear">Crear</button>`.
* Un segundo campo `<input id="filtroTareas" placeholder="Filtrar tareas...">`.
* Una lista `<ul id="listaTareas"></ul>`.

Funcionalidades requeridas:

1. **Añadir:** Al pulsar "Crear", añade un `<li>` con el texto de la tarea a `#listaTareas` (validando que no esté vacío).
2. **Completar / Eliminar (Delegación):** Al hacer clic sobre cualquier `<li>` de la lista:
* Si no está tachado, táchalo usando `event.target.style.textDecoration = 'line-through'` y cambia su color a `'gray'`.
* Si ya estaba tachado (`event.target.style.textDecoration === 'line-through'`), elimínalo del DOM usando `.remove()`.
3. **Filtrar:** Al escribir en `#filtroTareas`, oculta o muestra dinámicamente los `<li>` existentes según coincidan con el texto buscado.