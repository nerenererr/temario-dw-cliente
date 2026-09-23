# Tema 2.1 Variables, Datos y Operadores en JavaScript

## Índice

1. [Variables en JS](#1-variables-en-js)
2. [Constantes (`const`)](#2-constantes---const)
3. [`let`](#3-predefinir-variables---let)
4. [Operadores](#4-operadores)
   - [Aritméticos](#41-operadores-aritméticos)
   - [Asignación](#42-operadores-de-asignación)
   - [Precedencia](#43-precedencia-de-operadores)
5. [Ámbito de las variables](#5-ámbito-de-las-variables-scope)
6. [Tipos de datos](#6-tipos-de-datos)

---

## 1. Variables en JS

Una variable es simplemente un **contenedor con nombre** donde guardamos un valor para poder usarlo más tarde. En JavaScript hay tres formas de declarar una variable: `var`, `let` y `const`.

```js
var nombre = "Ana";
let edad = 17;
const curso = "DAW";
```

`var` es la forma "antigua" (desde 1995) de declarar variables. Hoy en día casi no se usa porque tiene un comportamiento raro con el ámbito (lo vemos más abajo). En proyectos modernos se usa `let` y `const` casi en exclusiva.

> Se puede declarar una variable sin darle valor inicial: `let x;`. En ese caso, `x` vale `undefined` hasta que le asignes algo.

### Reglas para nombrar variables

- Pueden contener letras, números, `$` y `_`, pero no pueden empezar por un número.
- Son sensibles a mayúsculas: `edad` y `Edad` son variables distintas.
- No se pueden usar palabras reservadas (`let`, `class`, `return`...).
- Convención: `camelCase` para variables y funciones (`nombreCompleto`, no `nombre_completo`).

---

## 2. Constantes - `const`

`const` declara una variable cuyo valor **no se puede reasignar** una vez definido. Es la opción por defecto que deberías usar salvo que sepas que el valor va a cambiar.

```js
const PI = 3.1416;
PI = 3.2; // Error: Assignment to constant variable.
```

> Importante: Objetos y arrays con `const`: lo que no se puede cambiar es la *referencia*, no el contenido. Puedes modificar las propiedades de un objeto o los elementos de un array declarados con `const`, solo no puedes reasignar la variable entera.

```js
const alumno = { nombre: "Luis", nota: 7 };
alumno.nota = 9;        // Funciona, modificamos una propiedad
alumno = { nombre: "Ana" }; // Error, no podemos reasignar el objeto entero

const numeros = [1, 2, 3];
numeros.push(4);       // Funciona
numeros = [];          // Error
```

> **Buena práctica:** usa siempre `const` por defecto. Cámbialo a `let` solo cuando realmente necesites reasignar el valor (contadores en bucles, acumuladores, etc.).

---

## 3. Predefinir variables - `let`

`let` se introdujo en ES6 (2015) para solucionar los problemas de `var`. Es como `var`, pero con ámbito de bloque (lo explicamos en el punto 5) y sin permitir "redeclarar" la misma variable dos veces en el mismo ámbito.

```js
let contador = 0;
contador = contador + 1; // Se puede reasignar

let contador = 5; // Error: 'contador' ya ha sido declarada
```

Un caso típico de uso es un bucle:

```js
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

| | `var` | `let` / `const` |
|---|---|---|
| Ámbito | De función | De bloque |
| ¿Se puede redeclarar? | Sí | No |
| Comportamiento antes de declararse | `undefined` (hoisting) | Error (zona muerta temporal) |

---

## 4. Operadores

Un operador realiza una operación sobre uno o varios valores (operandos) y devuelve un resultado.

### 4.1. Operadores aritméticos

| Operador | Nombre | Ejemplo | Resultado |
|---|---|---|---|
| `+` | Suma | `5 + 2` | `7` |
| `-` | Resta | `5 - 2` | `3` |
| `*` | Multiplicación | `5 * 2` | `10` |
| `/` | División | `5 / 2` | `2.5` |
| `%` | Módulo (resto) | `5 % 2` | `1` |
| `**` | Potencia | `5 ** 2` | `25` |
| `++` | Incremento | `let a=5; a++` | `a` vale `6` |
| `--` | Decremento | `let a=5; a--` | `a` vale `4` |

> El operador `%` (módulo) es la forma habitual de comprobar si un número es par o impar: `numero % 2 === 0` → par.

```js
const a = 10, b = 3;
console.log(a + b);  // 13
console.log(a % b);  // 1  (10 dividido entre 3 = 3, sobra 1)
console.log(a ** 2); // 100
```

Un caso especial: el `+` con cadenas de texto hace **concatenación**, no suma:

```js
console.log("5" + 2);   // "52" (concatena, porque "5" es texto)
console.log(5 + 2);     // 7   (suma normal)
console.log("5" - 2);   // 3   (con - , *, / , JS convierte el texto a número)
```

### 4.2. Operadores de asignación

Sirven para asignar un valor a una variable, muchas veces combinando la asignación con una operación:

| Operador | Equivale a | Ejemplo |
|---|---|---|
| `=` | Asignación simple | `x = 5` |
| `+=` | `x = x + y` | `x += 3` |
| `-=` | `x = x - y` | `x -= 3` |
| `*=` | `x = x * y` | `x *= 3` |
| `/=` | `x = x / y` | `x /= 3` |
| `%=` | `x = x % y` | `x %= 3` |
| `**=` | `x = x ** y` | `x **= 2` |

```js
let puntos = 10;
puntos += 5;  // puntos = puntos + 5 → 15
puntos *= 2;  // puntos = puntos * 2 → 30
console.log(puntos); // 30
```

### 4.3. Precedencia de operadores

Cuando hay varios operadores en una misma expresión, JS decide el orden según unas reglas de precedencia (parecidas a las matemáticas: primero potencias, luego multiplicación/división, luego suma/resta).

```js
console.log(2 + 3 * 4);   // 14, no 20 (primero se multiplica)
console.log((2 + 3) * 4); // 20, los paréntesis fuerzan el orden
```

> **Recomendación:** aunque te sepas el orden de precedencia, **usa siempre paréntesis** cuando la expresión no sea trivial. Hace el código mucho más fácil de leer y evita errores tontos, tanto para ti como para quien lo lea después.

---

## 5. Ámbito de las variables (Scope)

El **ámbito** (scope) es la zona del código donde una variable existe y se puede usar. Fuera de esa zona, la variable "no existe" para el resto del programa.

### 5.1. Block Scope (ámbito de bloque)

Las variables declaradas con `let` y `const` solo existen dentro del bloque `{ }` donde se han creado (un `if`, un `for`, un `while`...).

```js
{
  let mensaje = "Hola";
  console.log(mensaje); // "Hola" 
}
console.log(mensaje); // Error: mensaje no está definida aquí
```

### 5.2. Function Scope (ámbito de función)

Una variable declarada dentro de una función solo es visible dentro de esa función. `var` tiene *solo* este tipo de ámbito (ignora los bloques `{ }` que no sean funciones).

```js
function saludar() {
  var saludo = "Buenos días";
  console.log(saludo); // funciona aquí dentro
}
saludar();
console.log(saludo); // Error: saludo no existe fuera de la función
```

> **El problema clásico de `var`:** "escapa" de los bloques que no son funciones.

```js
if (true) {
  var x = 10;
}
console.log(x); // 10 → var "se escapa" del if, algo poco intuitivo

if (true) {
  let y = 10;
}
console.log(y); // Error → let se queda dentro del bloque, como se espera
```

### 5.3. Global Scope (ámbito global)

Una variable declarada fuera de cualquier función o bloque es **global**: se puede usar en cualquier parte del programa, incluso dentro de funciones anidadas.

```js
const nombreApp = "MiApp"; // global

function mostrarNombre() {
  console.log(nombreApp); // accesible aquí también
}
mostrarNombre();
```

> **Buena práctica:** evita en lo posible las variables globales. Cuantas más variables globales hay, más fácil es que dos partes distintas del código se "pisen" sin querer. Declara las variables lo más cerca posible de donde las vas a usar.

---

## 6. Tipos de datos

### 6.1. Lenguaje débilmente tipado y dinámico

JavaScript es un lenguaje de **tipado dinámico**: no declaras el tipo de una variable (no existe algo como `int edad = 17;`), el tipo lo decide el valor que contiene en cada momento, y ese valor puede cambiar de tipo en cualquier momento.

```js
let dato = 42;        // dato es number
console.log(typeof dato);  // "number"

dato = "cuarenta y dos"; // ahora dato es string, ¡sin dar ningún error!
console.log(typeof dato);  // "string"
```

> También se dice que es **débilmente tipado** porque convierte tipos automáticamente cuando lo necesita (por ejemplo, al hacer `"5" - 2`, visto antes). Esto es cómodo, pero también fuente de bugs si no tienes cuidado — por eso conviene usar `===` en vez de `==`, para comparar sin conversión de tipos.

### 6.2. Tipos primitivos

#### Boolean

Solo puede valer `true` o `false`. Es el resultado típico de una comparación.

```js
const esMayorDeEdad = true;
const haAprobado = 5 >= 5; // true
console.log(typeof false); // "boolean"
```

#### Number

Representa tanto enteros como decimales (JS no distingue `int` de `float`, todo es `number`).

```js
const edad = 17;
const pi = 3.1416;
const negativo = -8;
console.log(typeof 3.14); // "number"

console.log(1/0);  // Infinity
console.log("a" * 2); // NaN → "Not a Number", pero typeof NaN es "number" (curiosidad)
```

#### String

Texto entre comillas simples `'`, dobles `"` o backticks `` ` `` (plantillas literales, permiten interpolar variables).

```js
const nombre = "John";
const apellido = 'Smith';
const saludo = `Hola, ${nombre} ${apellido}`; // interpolación con backticks
console.log(saludo); // "Hola, John Smith"
console.log(typeof "John"); // "string"
```

#### Symbol y BigInt (menos comunes)

- **Symbol**: crea un valor único e inmutable, se usa sobre todo para claves de propiedades que no queremos que choquen entre sí. `const id = Symbol("id");`
- **BigInt**: para trabajar con enteros más grandes de lo que `number` puede representar con precisión. Se escribe añadiendo una `n` al final: `const numeroEnorme = 9007199254740993n;`

### 6.3. `null` vs `undefined`

Parecen lo mismo, pero **no lo son**:

| | `undefined` | `null` |
|---|---|---|
| Significado | Una variable existe pero **no se le ha asignado valor** todavía | Se ha asignado **explícitamente** "ningún valor" |
| ¿Quién lo pone? | JavaScript, automáticamente | El programador, a propósito |
| `typeof` | `"undefined"` | `"object"` (fallo histórico de JS, muy conocido) |

```js
let a;
console.log(a);          // undefined (declarada, sin valor)

let b = null;
console.log(b);          // null (vacío a propósito)

console.log(a == null);   // true  (== compara "flexible")
console.log(a === null);  // false (=== compara tipo y valor, y son tipos distintos)
```

> En la práctica usa `null` cuando tú quieras indicar "esto está vacío a propósito" (por ejemplo, "sin usuario logueado todavía"), y deja que `undefined` aparezca solo cuando algo no se ha inicializado.

### 6.4. Objetos — en JS casi todo es un objeto

Un objeto es una colección de pares **clave: valor**. Es la estructura que usamos para representar entidades del mundo real (un alumno, un producto, un coche...).

```js
const alumno = {
  nombre: "María",
  edad: 18,
  aprobado: true,
  asignaturas: ["JS", "BBDD", "HTML"], // un array también es un objeto
  saludar: function() {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

console.log(alumno.nombre);      // "María" (notación con punto)
console.log(alumno["edad"]);     // 18 (notación con corchetes)
alumno.saludar();                // "Hola, soy María"
console.log(typeof alumno);    // "object"
```

> **"Todo es un objeto" en JS:** los arrays son objetos especiales (con índices numéricos), las funciones son objetos (se pueden guardar en variables, pasar como parámetros...), y hasta `typeof null` devuelve `"object"` aunque `null` no sea realmente un objeto (bug histórico del lenguaje que se mantiene por compatibilidad). Los únicos que **no** son objetos son los primitivos: `boolean`, `number`, `string`, `undefined`, `symbol` y `bigint`.