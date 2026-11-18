# Tema 3.3 Introducción al DOM

La manipulación del **DOM (Document Object Model)** es el mecanismo mediante el cual JavaScript interactúa con la estructura HTML de una página web, permitiendo modificar contenido, estilos y responder a las interacciones del usuario en tiempo real.

---

## 1. Selección y modificación básica del DOM

### 1.1 Selección de Elementos por ID
Para interactuar con un elemento de la página, primero debemos seleccionarlo. El método más directo y eficiente para acceder a un elemento específico es `document.getElementById()`.

```javascript
const elemento = document.getElementById('id-del-elemento');
```
* **Nota:** El parámetro debe coincidir exactamente con el valor del atributo `id` en el HTML (sin incluir `#`).

### 1.2 Lectura y modificación de contenido (`textContent`)
La propiedad `textContent` permite obtener o modificar el contenido en texto plano de un nodo del DOM. A diferencia de `innerHTML`, `textContent` no interpreta etiquetas HTML, lo que la hace más segura contra ataques XSS (Cross-Site Scripting).

```javascript
// Leer texto
console.log(elemento.textContent);

// Modificar texto
elemento.textContent = 'Nuevo contenido de texto';
```

### 1.3 Modificación directa de estilos (`style`)
Podemos aplicar o alterar propiedades CSS en línea directamente sobre un elemento utilizando la propiedad `style`.

```javascript
elemento.style.propiedadCSS = 'valor';
```
* Las propiedades CSS compuestas en JS utilizan la convención **camelCase** (por ejemplo, `background-color` se transforma en `backgroundColor`).

```javascript
elemento.style.backgroundColor = 'yellow';
elemento.style.fontSize = '18px';
```

### 1.4 Manejo del evento `input`
El evento `'input'` se dispara de forma inmediata cada vez que el valor de un `<input>` o `<textarea>` cambia. Es ideal para acciones en tiempo real mientras el usuario escribe, borra o pega texto.

```javascript
inputElement.addEventListener('input', () => {
    // Código a ejecutar en tiempo real
});
```

---

### Ejemplos prácticos

#### Ejemplo 1: Cambiador de texto y color
Modifica el texto y el formato de un párrafo mediante la interacción con un botón.

```html
<h1 id="mainTitle">Exercise 1</h1>
<p id="description">This is the original text.</p>
<button id="changeBtn">Change Content</button>

<script>
    // 1. Selección de elementos
    const description = document.getElementById('description');
    const changeBtn = document.getElementById('changeBtn');

    // 2. Registro del escuchador de eventos
    changeBtn.addEventListener('click', () => {
        description.textContent = 'The text has been successfully updated!';
        description.style.backgroundColor = 'yellow';
        description.style.padding = '10px';
    });
</script>
```

#### Ejemplo 2: Contador de caracteres en tiempo real
Monitorea la longitud de un texto ingresado y actualiza dinámicamente el estado y la apariencia del contador.

```html
<h3>Leave a comment</h3>
<textarea id="userComment" rows="4" cols="40" placeholder="Type here..."></textarea>
<p id="charCounter">Characters: 0 / 100</p>

<script>
    const userComment = document.getElementById('userComment');
    const charCounter = document.getElementById('charCounter');
    const limit = 100;

    userComment.addEventListener('input', () => {
        const currentLength = userComment.value.length;
        charCounter.textContent = `Characters: ${currentLength} / ${limit}`;

        if (currentLength > limit) {
            charCounter.style.color = 'red';
            charCounter.style.fontWeight = 'bold';
        } else {
            charCounter.style.color = 'black';
            charCounter.style.fontWeight = 'normal';
        }
    });
</script>
```

---

## 2. NCreación, inserción y eliminación de elementos

### 2.1 Creación de elementos (`document.createElement`)
Para agregar dinámicamente nuevos elementos al DOM, primero se genera el nodo en memoria usando `document.createElement('tagName')`.

```javascript
const nuevoItem = document.createElement('li');
nuevoItem.textContent = 'Nuevo Elemento';
```

### 2.2 Inserción en el DOM (`appendChild`)
Una vez creado el nodo en memoria, debe insertarse dentro del árbol del DOM usando el método `parentElement.appendChild(newChild)`. Este método coloca el nuevo nodo como el último hijo del elemento padre.

```javascript
const lista = document.getElementById('miLista');
lista.appendChild(nuevoItem);
```

### 2.3 Eliminación directa de nodos (`element.remove`)
Cualquier nodo del DOM puede ser eliminado directamente llamando a su método `.remove()`.

```javascript
const elementoAEliminar = document.getElementById('item');
elementoAEliminar.remove();
```

### 2.4 Delegación de eventos (`event.target`)
La **delegación de eventos** es un patrón de diseño fundamental donde, en lugar de asignar un escuchador de eventos a múltiples elementos hijos individualmente, se asigna **un único escuchador al elemento padre**.

Gracias a la propagación de eventos (bubbling), cualquier evento en un hijo "sube" hasta el padre. Usamos `event.target` para identificar el elemento exacto que desencadenó el evento.

```javascript
padre.addEventListener('click', (event) => {
    // Filtrar si el clic fue en un elemento específico
    if (event.target.tagName === 'LI') {
        // Manipular event.target
        event.target.remove();
    }
});
```

* **Ventajas de la Delegación:**
  1. **Rendimiento:** Reduce significativamente el consumo de memoria al crear menos funciones escuchadoras.
  2. **Elementos Dinámicos:** Funciona automáticamente para elementos que se añadan al DOM en el futuro sin necesidad de volver a vincular eventos.

---

#### Ejemplo 3: Agregar elementos a una lista
Toma la entrada de un usuario, valida que no esté vacía, crea un elemento `<li>` y lo adjunta a una lista `<ul>`.

```html
<input type="text" id="taskInput" placeholder="Enter a new task...">
<button id="addTaskBtn">Add Task</button>
<ul id="taskList"></ul>

<script>
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            // Crear el nuevo elemento en memoria
            const newTask = document.createElement('li');
            newTask.textContent = taskText;

            // Insertar el elemento en el DOM
            taskList.appendChild(newTask);

            // Limpiar el campo de entrada
            taskInput.value = '';
        } else {
            alert('Please enter a valid task.');
        }
    });
</script>
```

#### Ejemplo 4: Eliminar elementos mediante delegación de eventos
Permite eliminar elementos de una lista al hacer clic sobre ellos, utilizando un solo *event listener* en el elemento padre `<ul>`.

```html
<h2>Shopping List (Click any item to remove it)</h2>
<ul id="shoppingList">
    <li>Apples</li>
    <li>Milk</li>
    <li>Bread</li>
    <li>Eggs</li>
</ul>

<script>
    const shoppingList = document.getElementById('shoppingList');

    // Delegación de eventos sobre la lista <ul>
    shoppingList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.remove();
        }
    });
</script>
```

---

## 3. NColecciones de nodos, búsqueda y filtros dinámicos

### 3.1 Selección múltiple (`querySelectorAll`)
`document.querySelectorAll('selectorCSS')` devuelve una colección de nodos estática (**NodeList**) que contiene todos los elementos que coinciden con el selector CSS especificado.

```javascript
const items = document.querySelectorAll('.item-clase');
```

### 3.2 Iteración con `forEach`
Las estructuras `NodeList` cuentan con el método nativo `.forEach()`, permitiendo recorrer cada nodo de forma limpia y declarativa.

```javascript
items.forEach(item => {
    console.log(item.textContent);
});
```

### 3.3 Normalización y búsqueda de cadenas (`toLowerCase()`, `includes()`)
Para realizar búsquedas o filtros eficientes (sin distinguir mayúsculas de minúsculas):
1. Convertimos tanto la búsqueda como el contenido objetivo a minúsculas mediante `.toLowerCase()`.
2. Verificamos la coincidencia mediante el método `.includes()`.

```javascript
const coincidencia = textoOriginal.toLowerCase().includes(busqueda.toLowerCase());
```

---

#### Ejemplo 5: Buscador / Filtro dinámico en tiempo real
Oculta o muestra elementos de una lista según coincidan con el texto que escribe el usuario en un buscador.

```html
<input type="text" id="searchInput" placeholder="Search country...">
<ul id="countryList">
    <li>Argentina</li>
    <li>Brazil</li>
    <li>Colombia</li>
    <li>Spain</li>
    <li>Mexico</li>
    <li>Peru</li>
</ul>

<script>
    const searchInput = document.getElementById('searchInput');
    const countryItems = document.querySelectorAll('#countryList li');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();

        countryItems.forEach(item => {
            const countryName = item.textContent.toLowerCase();

            if (countryName.includes(query)) {
                item.style.display = 'list-item';
            } else {
                item.style.display = 'none';
            }
        });
    });
</script>
```