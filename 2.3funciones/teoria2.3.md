# 2.3. Funciones

> Para unos parámetros (o argumentos) de entrada, la función devuelve una salida.

## Índice

1. [Paso de parámetros por valor](#1-paso-de-parámetros-por-valor)
2. [Una función es un objeto](#2-una-función-es-un-objeto)
3. [Las funciones como base de JS](#3-las-funciones-como-base-de-js)
4. [Librerías vs APIs](#4-librerías-vs-apis)
   - [Vuestras librerías](#41-vuestras-librerías)
   - [Librerías de terceros](#42-librerías-de-terceros)
   - [APIs del navegador](#43-apis-del-navegador)
   - [APIs de terceros](#44-apis-de-terceros)
   - [Frameworks JS](#45-frameworks-js)

---

## Antes de empezar: ¿qué es una función?

Una función es un bloque de código reutilizable al que le damos un nombre. Recibe unos valores de entrada (**parámetros**), hace algo con ellos, y normalmente devuelve un resultado (**return**).

```js
function sumar(a, b) {
  return a + b;
}

console.log(sumar(3, 4)); // 7
```

Formas de declarar una función en JS:

```js
// Declaración de función (function declaration)
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

// Expresión de función (function expression)
const saludar2 = function (nombre) {
  return `Hola, ${nombre}`;
};

// Función flecha (arrow function)
const saludar3 = (nombre) => {
  return `Hola, ${nombre}`;
};

// Función flecha con return implícito (una sola expresión, sin llaves)
const saludar4 = (nombre) => `Hola, ${nombre}`;
```

> **Diferencia:** una `function` declarada con `function nombre() {}` se puede llamar *antes* de donde aparece en el código (hoisting). Las funciones guardadas en una variable (`const saludar2 = ...`) no: hay que declararlas antes de usarlas, igual que cualquier otra variable.

---

## 1. Paso de parámetros por valor

Cuando llamas a una función, los parámetros que recibe se convierten en **variables locales**, propias de esa función. JavaScript pasa los argumentos **por valor**: dentro de la función se trabaja con una copia, no con la variable original.

```js
function incrementar(numero) {
  numero = numero + 1;
  console.log("Dentro de la función:", numero);
}

let x = 5;
incrementar(x);
console.log("Fuera de la función:", x); // x no ha cambiado
// Dentro de la función: 6
// Fuera de la función: 5
```

Al ser `numero` una variable local, cualquier cambio que le hagas dentro de la función desaparece al terminar: no afecta a la variable `x` que se pasó como argumento.

### El caso especial de objetos y arrays

Esto genera bastante confusión: con objetos y arrays, **lo que se copia es la referencia** (la "dirección" donde está guardado el objeto en memoria), no el objeto en sí. Por eso:

- Si **reasignas** el parámetro dentro de la función → no afecta al original (como con los primitivos).
- Si **modificas una propiedad** del objeto/array a través del parámetro → sí afecta al original, porque la referencia apunta al mismo objeto.

```js
function reasignar(alumno) {
  alumno = { nombre: "Otro" }; // esto solo cambia la variable local 'alumno'
}

function modificar(alumno) {
  alumno.nombre = "Modificado"; // esto SÍ cambia el objeto original
}

const persona = { nombre: "Ana" };

reasignar(persona);
console.log(persona.nombre); // "Ana" → no ha cambiado

modificar(persona);
console.log(persona.nombre); // "Modificado" → sí ha cambiado
```

> **Por eso se dice que JS "pasa por valor" siempre**, incluso con objetos: lo que se copia por valor es la *referencia* al objeto, no el objeto. La variable local es una copia de esa referencia, pero ambas apuntan al mismo objeto en memoria.

### Parámetros por defecto

Si no se pasa un argumento, el parámetro vale `undefined`, salvo que le des un valor por defecto:

```js
function saludar(nombre = "invitado") {
  return `Hola, ${nombre}`;
}

console.log(saludar("Marta")); // Hola, Marta
console.log(saludar());        // Hola, invitado
```

---

## 2. Una función es un objeto

En JavaScript, las funciones **son objetos** (de un tipo especial, que además se puede invocar con `()`). Esto tiene consecuencias muy importantes:

### Una variable puede apuntar a una función

```js
function decirHola() {
  console.log("Hola");
}

const miFuncion = decirHola; // sin paréntesis: guardamos la función, no el resultado de ejecutarla
miFuncion(); // Hola
```

Fíjate en la diferencia: `decirHola` (sin paréntesis) es una referencia a la función; `decirHola()` (con paréntesis) es **llamarla** y ejecutarla.

### Las funciones se pueden pasar como argumento

Una función que recibe otra función como parámetro se llama **función de orden superior** (higher-order function). Es la base de métodos muy usados como `forEach`, `map`, `filter` o `addEventListener`.

```js
function ejecutarDosVeces(funcion) {
  funcion();
  funcion();
}

ejecutarDosVeces(() => console.log("¡Hola!"));
// ¡Hola!
// ¡Hola!
```

```js
const numeros = [1, 2, 3];
numeros.forEach(function (numero) {
  console.log(numero * 2);
});
// 2, 4, 6
```

### Las funciones se pueden devolver desde otra función

```js
function crearMultiplicador(factor) {
  return function (numero) {
    return numero * factor;
  };
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log(duplicar(5));  // 10
console.log(triplicar(5)); // 15
```

### Una función puede tener propiedades

Como es un objeto, se le pueden añadir propiedades igual que a cualquier otro objeto (poco habitual en el día a día, pero demuestra bien la idea):

```js
function saludar() {
  console.log("Hola");
}

saludar.idioma = "español";
console.log(saludar.idioma); // español
console.log(typeof saludar); // "function" (aunque por dentro sea un objeto)
```

---

## 3. Las funciones como base de JS

Que las funciones sean "ciudadanos de primera clase" (se puedan guardar en variables, pasar como argumentos y devolver desde otras funciones) es lo que permite la **programación funcional** en JavaScript: escribir programas combinando funciones pequeñas y reutilizables, en lugar de ir modificando variables paso a paso.

Algunos conceptos habituales de este estilo:

- **Funciones puras**: dado el mismo input, siempre devuelven el mismo output, y no modifican nada fuera de ellas mismas (no tienen "efectos secundarios").

```js
// Pura: no depende ni modifica nada externo
function doblar(numero) {
  return numero * 2;
}

// Impura: modifica una variable externa (efecto secundario)
let total = 0;
function sumarAlTotal(numero) {
  total += numero;
}
```

- **Funciones callback**: una función que se pasa como argumento para que otra la ejecute en el momento adecuado.

```js
setTimeout(() => {
  console.log("Han pasado 2 segundos");
}, 2000);
```

- **Encadenar funciones** sobre arrays es muy típico en JS:

```js
const numeros = [1, 2, 3, 4, 5];

const resultado = numeros
  .filter((n) => n % 2 === 0) // se queda con los pares: [2, 4]
  .map((n) => n * 10);        // los multiplica por 10: [20, 40]

console.log(resultado); // [20, 40]
```

> Este enfoque funcional conecta directamente con todo lo visto antes (variables, operadores, estructuras de control): las funciones son la pieza que permite organizar y reutilizar ese código en lugar de repetirlo.

---

## 4. Librerías vs APIs

Es habitual confundir estos dos términos, pero representan dos formas distintas de añadir funcionalidad a tu código.

| | Librería | API |
|---|---|---|
| Qué es | Un conjunto de **funciones** reutilizables | Un conjunto de **objetos y métodos** para acceder a un recurso |
| Se basa en | Funciones sueltas que importas y llamas | Objetos que representan "algo" (el navegador, un servidor, un dispositivo...) |
| Ejemplo | `lodash`, una librería de validación de formularios | `fetch`, `document`, una API REST |
| Vínculo con un recurso | No tiene por qué | Normalmente sí (el DOM, una base de datos, un servicio externo...) |

En la práctica ambos conceptos se mezclan mucho (una librería puede exponer su funcionalidad mediante objetos, una API puede documentarse como si fuera una librería), pero la idea de fondo es: **librería = caja de herramientas de funciones**, **API = forma de hablar con un recurso concreto**.

### 4.1. Vuestras librerías

Son los módulos de funciones que tú mismo escribes dentro de tu proyecto, para no repetir código y organizarlo mejor.

```js
// archivo: utilidades.js
export function formatearFecha(fecha) {
  return fecha.toLocaleDateString("es-ES");
}

export function esEmailValido(email) {
  return /\S+@\S+\.\S+/.test(email);
}
```

```js
// archivo: main.js
import { formatearFecha, esEmailValido } from "./utilidades.js";

console.log(formatearFecha(new Date()));
console.log(esEmailValido("alumno@instituto.es"));
```

### 4.2. Librerías de terceros

Código escrito por otras personas o empresas que instalas (normalmente con `npm`) para añadir funcionalidad sin programarla tú desde cero.

```js
// Ejemplo: lodash, una librería muy usada de utilidades
import _ from "lodash";

const numeros = [3, 1, 4, 1, 5, 9];
console.log(_.uniq(numeros)); // [3, 1, 4, 5, 9] → elimina duplicados
```

Otros ejemplos habituales: `axios` (peticiones HTTP), `moment` / `date-fns` (fechas), `chart.js` (gráficos).

### 4.3. APIs del navegador

Son las que el propio navegador pone a tu disposición mediante objetos globales, sin que tengas que instalar nada. Por ejemplo:

```js
// API del DOM: manipular la página
document.querySelector("h1").textContent = "¡Hola!";

// API de almacenamiento local
localStorage.setItem("tema", "oscuro");

// API de geolocalización
navigator.geolocation.getCurrentPosition((posicion) => {
  console.log(posicion.coords.latitude, posicion.coords.longitude);
});

// API Fetch, para hacer peticiones a un servidor
fetch("https://api.ejemplo.com/datos")
  .then((respuesta) => respuesta.json())
  .then((datos) => console.log(datos));
```

### 4.4. APIs de terceros

Servicios externos (de otra empresa u organización) a los que accedes normalmente por internet, casi siempre devolviendo datos en formato JSON.

```js
// Ejemplo: pedir datos del tiempo a un servicio externo
fetch("https://api.ejemplo-tiempo.com/madrid")
  .then((respuesta) => respuesta.json())
  .then((datos) => console.log(`Temperatura: ${datos.temperatura}°`));
```

Otros ejemplos típicos: APIs de pago (Stripe, PayPal), APIs de mapas (Google Maps), APIs de redes sociales, APIs de IA.

### 4.5. Frameworks JS

Un paso más allá de una librería: un framework es un **paquete completo** (normalmente HTML + CSS + JS) que impone una forma concreta de estructurar tu aplicación, y sobre el que tú construyes tu código siguiendo sus reglas.

| | Librería | Framework |
|---|---|---|
| ¿Quién controla el flujo? | Tu código llama a la librería cuando quiere | El framework llama a tu código cuando lo necesita ("inversión de control") |
| Flexibilidad | Alta, la usas como quieras | Tienes que seguir su estructura y convenciones |
| Ejemplos | lodash, axios | React, Angular, Vue |

```js
// Ejemplo muy simplificado de un componente en React
function Saludo({ nombre }) {
  return <h1>Hola, {nombre}</h1>;
}
```

> La diferencia clave entre librería y framework no es el tamaño, sino **quién manda**: con una librería, tu código llama a sus funciones cuando quiere; con un framework, es el framework el que organiza la aplicación y llama a tu código.