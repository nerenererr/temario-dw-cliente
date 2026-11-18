# Tema 3.2 Modelo del navegador (BOM)

> Estos objetos solo existen en el navegador: hay que probar los ejemplos en la consola (F12) o en una página HTML.

### window

Objeto global: todo lo demás cuelga de él (`alert()` es `window.alert()`).

```js
var a = 1; let b = 2;
window.a;   // 1          (var global → propiedad de window)
window.b;   // undefined  (let y const no)

window.innerWidth;    // ancho del área visible (viewport)
window.innerHeight;
window.scrollY;       // desplazamiento vertical
window.scrollTo({ top: 0, behavior: "smooth" });
```

**Diálogos** (bloquean la ejecución; útiles para practicar, no para aplicaciones reales):

```js
alert("Guardado");                          // informa
const ok = confirm("¿Borrar?");             // true / false
const nombre = prompt("¿Nombre?", "Anónimo");   // string, o null si cancela (siempre string!)
const edad = Number(prompt("¿Edad?"));
```

**Temporizadores:**

| Función | Hace |
|---|---|
| `setTimeout(fn, ms)` | Ejecuta `fn` **una vez** tras `ms` |
| `setInterval(fn, ms)` | Ejecuta `fn` **cada** `ms` |
| `clearTimeout(id)` / `clearInterval(id)` | Cancelan (reciben el id que devolvió el `set...`) |

```js
const id = setInterval(() => console.log("tick"), 1000);
setTimeout(() => clearInterval(id), 3500);   // se detiene a los 3,5 s
```

El tiempo es un **mínimo**, no una garantía. Orden de ejecución: primero el código síncrono, luego las microtareas (promesas) y después los temporizadores:

```js
console.log("1");
setTimeout(() => console.log("4 (timeout 0)"), 0);
Promise.resolve().then(() => console.log("3 (microtarea)"));
console.log("2");
// 1, 2, 3, 4
```

### location y URL

Para `https://www.ejemplo.es:8080/ruta/pagina.html?q=js&page=2#seccion`:

| Propiedad | Valor |
|---|---|
| `location.href` | URL completa |
| `location.protocol` · `hostname` · `port` | `https:` · `www.ejemplo.es` · `8080` |
| `location.pathname` | `/ruta/pagina.html` |
| `location.search` | `?q=js&page=2` |
| `location.hash` | `#seccion` |

```js
location.href = "https://example.com";    // navegar (queda en el historial)
location.replace("https://example.com");  // navegar SIN dejar la página actual en el historial
location.reload();                         // recargar

const params = new URLSearchParams(location.search);
params.get("q");        // "js"
params.get("zz");       // null (no existe)
params.set("page", "3");
params.toString();      // "q=js&page=3"

new URL("https://x.es/a?b=1").searchParams.get("b");   // "1"
```

> `URL` y `URLSearchParams` se encargan de codificar los caracteres especiales: mejor que concatenar strings.

### history

```js
history.length;      // páginas en el historial de la pestaña
history.back();      // = botón "Atrás"
history.forward();
history.go(-2);      // retroceder 2 páginas
history.pushState({ pagina: 2 }, "", "/productos/2");   // cambia la URL SIN recargar (base de las SPA)
```

Por privacidad, JS no puede leer las URL del historial, solo moverse por él.

### navigator y screen

```js
navigator.language;    // "es-ES"
navigator.onLine;      // true / false (¿hay conexión?)
navigator.geolocation.getCurrentPosition(
  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
  (err) => console.log("Sin permiso o error:", err.message)
);

screen.width;  screen.height;   // resolución de la PANTALLA
screen.colorDepth;              // profundidad de color
```

> No uses `navigator.userAgent` para decidir qué código ejecutar: es poco fiable. Usa **detección de características**: `if ("geolocation" in navigator) { ... }`.
> No confundir `screen.width` (pantalla) con `window.innerWidth` (área visible de la página).

### localStorage y sessionStorage

| | `localStorage` | `sessionStorage` |
|---|---|---|
| Duración | Permanente | Hasta cerrar la pestaña |
| Alcance | Mismo origen | Mismo origen y misma pestaña |

```js
localStorage.setItem("tema", "oscuro");
localStorage.getItem("tema");       // "oscuro"
localStorage.getItem("nada");       // null
localStorage.removeItem("tema");
localStorage.clear();
```

**Solo guardan strings**: los objetos se convierten en `"[object Object]"`. Usa JSON:

```js
localStorage.setItem("usuario", JSON.stringify({ nombre: "Ana" }));
const usuario = JSON.parse(localStorage.getItem("usuario"));

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];   // valor por defecto
```

> No está cifrado y cualquier script de la página puede leerlo: no guardes contraseñas ni datos sensibles. Capacidad ~5 MB. Las **cookies** (`document.cookie`) son para datos que debe recibir el servidor: se envían en cada petición y caben ~4 KB.

### console

`console.log` · `console.warn` · `console.error` · `console.table(array)` (muestra una tabla) · `console.group()` / `groupEnd()` · `console.time("x")` / `timeEnd("x")` (mide tiempos) · `console.assert(cond, msg)` (muestra el mensaje solo si la condición es falsa).