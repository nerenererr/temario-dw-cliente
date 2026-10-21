# 2.5. Arrays
> Un **array** es una estructura de datos que guarda una **lista ordenada de valores** bajo un único nombre. Es una de las estructuras más usadas en JavaScript.
> Referencias: [js_arrays](https://www.w3schools.com/js/js_arrays.asp) · [js_array_methods](https://www.w3schools.com/js/js_array_methods.asp)
## Índice
1. [Qué es un array y cómo se crea](#1-qué-es-un-array-y-cómo-se-crea)
2. [Se declaran como constantes](#2-se-declaran-como-constantes)
3. [Acceder, modificar y recorrer](#3-acceder-modificar-y-recorrer)
4. [Métodos de arrays](#4-métodos-de-arrays)
   - [Convertir a string](#41-convertir-a-string-tostring-y-join)
   - [Añadir y quitar elementos](#42-añadir-y-quitar-elementos)
   - [Extraer, unir y modificar por posición](#43-extraer-unir-y-modificar-por-posición)
   - [Buscar](#44-buscar)
   - [Ordenar e invertir](#45-ordenar-e-invertir)
   - [Transformar y recorrer con funciones](#46-transformar-y-recorrer-con-funciones)
   - [Aplanar arrays](#47-aplanar-arrays-flat-y-flatmap)
5. [Copiar arrays](#5-copiar-arrays)
6. [Otras herramientas útiles](#6-otras-herramientas-útiles)
---
## 1. Qué es un array y cómo se crea
Imagina una fila de casillas numeradas: cada casilla guarda un valor, y para llegar a él usas su número (el **índice**). **Los índices empiezan en 0.**
```
 índice:   0         1         2
         ┌─────────┬─────────┬─────────┐
 valor:  │ "Volvo" │ "BMW"   │ "Saab"  │
         └─────────┴─────────┴─────────┘
```
### Literal de array (la forma recomendada)
```js
const coches = ["Saab", "Volvo", "BMW"];
```
Puede contener valores de **cualquier tipo, mezclados**: números, strings, booleanos, objetos, otros arrays e incluso funciones.
```js
const mezcla = ["Ana", 25, true, { ciudad: "Madrid" }, [1, 2]];
```
También se puede declarar en varias líneas (más legible si es largo):
```js
const asignaturas = [
  "Programación",
  "Bases de datos",
  "Lenguajes de marcas",
  "Entornos de desarrollo"
];
```
### `new Array()` (evitar)
```js
const a = new Array("Saab", "Volvo", "BMW"); // funciona, pero no se recomienda
```
Es más largo y tiene una trampa: con **un solo argumento numérico** no crea un array con ese número, sino un array **vacío de esa longitud**:
```js
const x = new Array(40, 100); // [40, 100]  → dos elementos
const y = new Array(40);      // [ <40 empty items> ] → ¡40 huecos vacíos!
```
> **Regla:** usa siempre `[ ]`.
### ¿Cómo saber si algo es un array?
`typeof` no sirve: un array es un objeto, así que devuelve `"object"`.
```js
typeof [];            // "object"   ← no ayuda
Array.isArray([]);    // true       ← la forma correcta
Array.isArray("hola"); // false
```
---
## 2. Se declaran como constantes
Lo habitual es declarar los arrays con `const`:
```js
const coches = ["Saab", "Volvo", "BMW"];
```
Esto genera confusión al principio, porque parece contradictorio con poder modificarlos. La clave: `const` impide **reasignar la variable**, pero **no impide cambiar el contenido** del array (lo que guarda `coches` es una referencia al array, y esa no cambia).
```js
const coches = ["Saab", "Volvo", "BMW"];
coches[0] = "Audi";        // cambiar un elemento
coches.push("Fiat");       // añadir un elemento
console.log(coches);       // [ 'Audi', 'Volvo', 'BMW', 'Fiat' ]
coches = ["Seat", "Opel"]; // TypeError: Assignment to constant variable
```
>  usa `const` por defecto. Solo usarías `let` si necesitas reasignar la variable entera a otro array (algo poco frecuente).
> Además, `const` nos protege de un error típico: perder el array por reasignarlo sin querer.
---
## 3. Acceder, modificar y recorrer
### Acceder a un elemento
```js
const coches = ["Saab", "Volvo", "BMW"];
coches[0];            // "Saab"   (el primero)
coches[2];            // "BMW"
coches[10];           // undefined (esa posición no existe)
coches[coches.length - 1]; // "BMW"  (el último)
coches.at(-1);        // "BMW"    (el último, forma moderna; admite negativos)
```
### `length`: cuántos elementos hay
```js
coches.length; // 3
```
### Modificar un elemento
```js
coches[1] = "Tesla";
console.log(coches); // [ 'Saab', 'Tesla', 'BMW' ]
```
> **Cuidado con dejar huecos!** Si escribes en una posición muy lejana, JS rellena el medio con huecos vacíos:
> ```js
> const x = [1, 2, 3];
> x[5] = 6;
> console.log(x);        // [ 1, 2, 3, <2 empty items>, 6 ]
> console.log(x.length); // 6
> ```
> Para añadir al final, usa `push()` y evitarás sorpresas.
### Recorrer un array
```js
const frutas = ["Manzana", "Pera", "Uva"];
// 1) for clásico: cuando necesitas el índice
for (let i = 0; i < frutas.length; i++) {
  console.log(i, frutas[i]);
}
// 2) for...of: cuando solo necesitas los valores (lo más cómodo)
for (const fruta of frutas) {
  console.log(fruta);
}
// 3) forEach: método que ejecuta una función por cada elemento
frutas.forEach((fruta, indice) => {
  console.log(indice, fruta);
});
```
> No uséis `for...in` con arrays (recorre índices como strings y puede incluir propiedades extra). Para arrays, `for...of`.
---
## 4. Métodos de arrays
Un **método** es una función que "viene incluida" en el array y se llama con un punto: `array.metodo()`. Hay muchísimos; aquí van los que más se usan, agrupados por para qué sirven.
> **Antes de nada, una distinción importante:** algunos métodos **modifican el array original** (se dice que *mutan*) y otros **devuelven uno nuevo** sin tocar el original. En los ejemplos lo indico con 🔴 (muta) y 🟢 (no muta). Al final tienes una tabla resumen.
### 4.1. Convertir a string: `toString()` y `join()`
🟢 Ninguno modifica el original.
```js
const frutas = ["Banana", "Orange", "Apple"];
frutas.toString();   // "Banana,Orange,Apple"
frutas.join(" * ");  // "Banana * Orange * Apple"
frutas.join("");     // "BananaOrangeApple"
```
`join` es como `toString`, pero **tú eliges el separador**. Es el método contrario de `split()` de los strings.
### 4.2. Añadir y quitar elementos
🔴 Los cuatro **modifican** el array.
| Método | Dónde actúa | Qué hace | Devuelve |
|---|---|---|---|
| `push(x)` | final | Añade al final | La nueva longitud |
| `pop()` | final | Quita el último | El elemento quitado |
| `unshift(x)` | principio | Añade al principio | La nueva longitud |
| `shift()` | principio | Quita el primero | El elemento quitado |
```js
const frutas = ["Banana", "Orange", "Apple"];
frutas.push("Kiwi");
// [ 'Banana', 'Orange', 'Apple', 'Kiwi' ]
const ultimo = frutas.pop();
// ultimo = 'Kiwi'  →  frutas = [ 'Banana', 'Orange', 'Apple' ]
frutas.unshift("Lemon");
// [ 'Lemon', 'Banana', 'Orange', 'Apple' ]
const primero = frutas.shift();
// primero = 'Lemon'  →  frutas = [ 'Banana', 'Orange', 'Apple' ]
```
> Truquillo para recordarlos: **push/pop** trabajan por el **final** (como una pila de platos), **unshift/shift** por el **principio**. Los métodos del principio son más lentos en arrays grandes, porque hay que mover todos los demás elementos.
También se pueden añadir varios a la vez: `frutas.push("A", "B", "C")`.
### 4.3. Extraer, unir y modificar por posición
#### `slice(inicio, fin)` — extrae una parte 🟢
Devuelve un array nuevo con los elementos desde `inicio` hasta `fin` (**sin incluir `fin`**). Admite negativos (cuentan desde el final). Es igual que el `slice` de los strings.
```js
const n = [1, 2, 3, 4, 5];
n.slice(1, 3);  // [ 2, 3 ]
n.slice(2);     // [ 3, 4, 5 ]  (hasta el final)
n.slice(-2);    // [ 4, 5 ]     (los dos últimos)
```
#### `splice(inicio, cuántos, ...nuevos)` — insertar, borrar o reemplazar 🔴
El "cuchillo suizo" de los arrays: modifica el array **en su sitio** y devuelve un array con los elementos que ha quitado.
```js
const frutas = ["Banana", "Orange", "Apple", "Mango"];
// Insertar (0 elementos a borrar) en la posición 2:
frutas.splice(2, 0, "Lemon", "Kiwi");
// [ 'Banana', 'Orange', 'Lemon', 'Kiwi', 'Apple', 'Mango' ]
// Borrar 2 elementos desde la posición 1:
const quitados = frutas.splice(1, 2);
// quitados = [ 'Orange', 'Lemon' ]
// frutas   = [ 'Banana', 'Kiwi', 'Apple', 'Mango' ]
// Reemplazar 1 elemento en la posición 0:
frutas.splice(0, 1, "Cherry");
// [ 'Cherry', 'Kiwi', 'Apple', 'Mango' ]
```
> **No hay que confundir `slice` con `splice`:** `slice` **copia** una parte sin tocar el original; `splice` **modifica** el original. La diferencia es una sola letra y es un error muy típico.
> **Evitad `delete`:** `delete frutas[1]` no elimina el elemento, deja un **hueco vacío** y la longitud no cambia. Usa `splice` para borrar de verdad.
> ```js
> const d = [1, 2, 3];
> delete d[1];
> console.log(d, d.length); // [ 1, <1 empty item>, 3 ] 3
> ```
#### `concat()` — unir arrays 🟢
```js
const a = ["Ana", "Luis"];
const b = ["Eva"];
const c = ["Pablo", "Marta"];
a.concat(b);       // [ 'Ana', 'Luis', 'Eva' ]
a.concat(b, c);    // [ 'Ana', 'Luis', 'Eva', 'Pablo', 'Marta' ]
a.concat("Rosa");  // [ 'Ana', 'Luis', 'Rosa' ]
```
Hoy se usa mucho más el operador **spread** (`...`), que hace lo mismo y es más flexible:
```js
const todos = [...a, ...b, ...c];
const conExtra = [...a, "Rosa", ...b];
```
#### `fill()` — rellenar 🔴
```js
const x = [1, 2, 3, 4];
x.fill(0);        // [ 0, 0, 0, 0 ]
new Array(3).fill(0); // [ 0, 0, 0 ]  → forma útil de crear un array "inicializado"
```
### 4.4. Buscar
| Método | Devuelve | Si no lo encuentra |
|---|---|---|
| `indexOf(x)` | La **posición** de la primera coincidencia | `-1` |
| `lastIndexOf(x)` | La posición de la **última** coincidencia | `-1` |
| `includes(x)` | `true` / `false` | `false` |
| `find(fn)` | El **primer elemento** que cumple la condición | `undefined` |
| `findIndex(fn)` | La **posición** del primer elemento que cumple | `-1` |
| `findLast(fn)` | El **último elemento** que cumple (ES2023) | `undefined` |
| `findLastIndex(fn)` | La posición del último que cumple (ES2023) | `-1` |
🟢 Ninguno modifica el original.
```js
const frutas = ["Apple", "Orange", "Apple", "Mango"];
frutas.indexOf("Apple");      // 0
frutas.lastIndexOf("Apple");  // 2
frutas.indexOf("Kiwi");       // -1  (no está)
frutas.includes("Mango");     // true
```
`indexOf` e `includes` buscan un valor **exacto**. Cuando la condición es más compleja ("el primero mayor que 18"), se usa `find` o `findIndex` pasándoles una función:
```js
const edades = [4, 12, 19, 25, 17];
edades.find((e) => e > 18);       // 19   (el primero que cumple)
edades.findIndex((e) => e > 18);  // 2    (su posición)
edades.findLast((e) => e > 18);   // 25   (el último que cumple)
edades.find((e) => e > 100);      // undefined
```
```js
const alumnos = [
  { nombre: "Ana", nota: 4 },
  { nombre: "Luis", nota: 8 },
  { nombre: "Eva", nota: 9 }
];
const primerAprobado = alumnos.find((a) => a.nota >= 5);
console.log(primerAprobado); // { nombre: 'Luis', nota: 8 }
```
> **`find` devuelve un elemento; `filter` devuelve un array con todos los que cumplen.** Si solo necesitas uno, `find`; si necesitas todos, `filter`.
> `includes` detecta `NaN`, pero `indexOf` no:
> ```js
> [NaN].includes(NaN); // true
> [NaN].indexOf(NaN);  // -1
> ```
### 4.5. Ordenar e invertir
#### `sort()` 🔴
Ordena el array **en su sitio**. Por defecto ordena **como si los elementos fueran texto**, alfabéticamente.
```js
const frutas = ["Banana", "Orange", "Apple", "Mango"];
frutas.sort();
console.log(frutas); // [ 'Apple', 'Banana', 'Mango', 'Orange' ]
```
> **La trampa más famosa de los arrays: con números, `sort()` ordena mal.** Como compara como texto, `"100"` va antes que `"25"` (porque `"1"` < `"2"`).
> ```js
> const n = [40, 100, 1, 5, 25, 10];
> n.sort();
> console.log(n); // [ 1, 10, 100, 25, 40, 5 ]  ← incorrecto!
> ```
Para ordenar bien hay que pasarle una **función de comparación** `(a, b) => ...`:
- Si devuelve un número **negativo** → `a` va antes que `b`.
- Si devuelve **positivo** → `b` va antes que `a`.
- Si devuelve **0** → se quedan igual.
```js
const n = [40, 100, 1, 5, 25, 10];
n.sort((a, b) => a - b);  // ascendente:  [ 1, 5, 10, 25, 40, 100 ]
n.sort((a, b) => b - a);  // descendente: [ 100, 40, 25, 10, 5, 1 ]
```
Para ordenar **objetos** por una propiedad:
```js
const alumnos = [
  { nombre: "Luis", nota: 8 },
  { nombre: "Ana", nota: 4 },
  { nombre: "Eva", nota: 9 }
];
alumnos.sort((a, b) => a.nota - b.nota);
// [ Ana (4), Luis (8), Eva (9) ]
```
Para ordenar **strings con tildes o mayúsculas** correctamente, mejor `localeCompare`:
```js
const nombres = ["Ana", "bea", "Carlos"];
nombres.sort();                                 // [ 'Ana', 'Carlos', 'bea' ] ← las mayúsculas van antes
nombres.sort((a, b) => a.localeCompare(b));     // [ 'Ana', 'bea', 'Carlos' ] ✅
```
#### `reverse()` 🔴
Da la vuelta al array en su sitio.
```js
const x = [3, 1, 2];
x.reverse();
console.log(x); // [ 2, 1, 3 ]  (no ordena: solo invierte el orden actual)
```
#### Versiones que NO mutan (ES2023) 🟢
Existen versiones "seguras" que devuelven un array nuevo y dejan el original intacto:
| Mutan 🔴 | No mutan 🟢 |
|---|---|
| `sort()` | `toSorted()` |
| `reverse()` | `toReversed()` |
| `splice()` | `toSpliced()` |
| `arr[i] = x` | `with(i, x)` |
```js
const n = [40, 100, 1, 5, 25, 10];
const ordenado = n.toSorted((a, b) => a - b);
console.log(ordenado); // [ 1, 5, 10, 25, 40, 100 ]
console.log(n);        // [ 40, 100, 1, 5, 25, 10 ]  ← el original no cambia
const frutas = ["Banana", "Orange", "Apple", "Mango"];
frutas.toReversed();       // [ 'Mango', 'Apple', 'Orange', 'Banana' ]
frutas.with(0, "Z");       // [ 'Z', 'Orange', 'Apple', 'Mango' ]
frutas.toSpliced(1, 1, "X"); // [ 'Banana', 'X', 'Apple', 'Mango' ]
```
### 4.6. Transformar y recorrer con funciones
Son los métodos de **orden superior**: reciben una función (callback) que se aplica a cada elemento. Todos son 🟢 (no modifican el original, salvo `forEach` si tú lo haces dentro).
#### `forEach(fn)` — hacer algo con cada elemento
No devuelve nada (`undefined`). Se usa para efectos como mostrar por consola.
```js
["a", "b", "c"].forEach((letra, i) => console.log(i, letra));
// 0 a
// 1 b
// 2 c
```
> `forEach` no admite `break` ni `continue`, y no se puede "cortar". Si necesitas salir a mitad, usa `for...of`.
#### `map(fn)` — transformar cada elemento
Devuelve un **array nuevo del mismo tamaño**, con el resultado de la función para cada elemento.
```js
const n = [1, 2, 3];
n.map((x) => x * 2);          // [ 2, 4, 6 ]
n.map((x) => `Nº ${x}`);      // [ 'Nº 1', 'Nº 2', 'Nº 3' ]
const alumnos = [{ nombre: "Ana", nota: 7 }, { nombre: "Luis", nota: 9 }];
alumnos.map((a) => a.nombre); // [ 'Ana', 'Luis' ]
```
#### `filter(fn)` — quedarse con los que cumplen
Devuelve un **array nuevo** (igual o más corto) con los elementos para los que la función devuelve `true`.
```js
const n = [1, 2, 3, 4, 5, 6];
n.filter((x) => x % 2 === 0); // [ 2, 4, 6 ]
n.filter((x) => x > 3);       // [ 4, 5, 6 ]
```
#### `reduce(fn, valorInicial)` — reducir a un único valor
Recorre el array **acumulando** un resultado. La función recibe el acumulador y el elemento actual, y lo que devuelva será el nuevo acumulador.
```js
const n = [1, 2, 3, 4];
const suma = n.reduce((acumulado, x) => acumulado + x, 0);
console.log(suma); // 10
```
Paso a paso (con valor inicial `0`):
| Vuelta | `acumulado` | `x` | Devuelve |
|---|---|---|---|
| 1 | 0 | 1 | 1 |
| 2 | 1 | 2 | 3 |
| 3 | 3 | 3 | 6 |
| 4 | 6 | 4 | 10 ← resultado final |
```js
// Más ejemplos
n.reduce((a, x) => a * x, 1);              // 24  (producto)
n.reduce((max, x) => (x > max ? x : max)); // 4   (el mayor)
const carrito = [{ precio: 10 }, { precio: 25 }, { precio: 5 }];
carrito.reduce((total, p) => total + p.precio, 0); // 40
```
> Poned siempre el **valor inicial** (el segundo argumento). Sin él, usa el primer elemento como inicial y falla con arrays vacíos.
#### `some(fn)` y `every(fn)` — comprobar condiciones
Devuelven `true` / `false`.
```js
const n = [1, 2, 3];
n.some((x) => x > 2);   // true  → AL MENOS UNO es mayor que 2
n.every((x) => x > 2);  // false → TODOS deberían ser mayores que 2
n.every((x) => x > 0);  // true
```
#### Encadenar métodos
Como `map` y `filter` devuelven arrays, se pueden encadenar:
```js
const alumnos = [
  { nombre: "Ana", nota: 4 },
  { nombre: "Luis", nota: 8 },
  { nombre: "Eva", nota: 9 }
];
const mediaAprobados = alumnos
  .filter((a) => a.nota >= 5)                       // se queda con Luis y Eva
  .map((a) => a.nota)                                // [ 8, 9 ]
  .reduce((suma, nota, _, lista) => suma + nota / lista.length, 0);
console.log(mediaAprobados); // 8.5
```
### 4.7. Aplanar arrays: `flat()` y `flatMap()`
🟢 Útiles cuando hay arrays dentro de arrays.
```js
const anidado = [1, [2, [3, [4]]]];
anidado.flat();          // [ 1, 2, [ 3, [ 4 ] ] ]  → aplana 1 nivel (por defecto)
anidado.flat(2);         // [ 1, 2, 3, [ 4 ] ]
anidado.flat(Infinity);  // [ 1, 2, 3, 4 ]         → aplana todo
```
`flatMap` hace un `map` y después un `flat` de un nivel:
```js
const frases = ["hola mundo", "buenos días"];
frases.map((f) => f.split(" "));
// [ [ 'hola', 'mundo' ], [ 'buenos', 'días' ] ]
frases.flatMap((f) => f.split(" "));
// [ 'hola', 'mundo', 'buenos', 'días' ]
```
---
## 5. Copiar arrays
Aquí aparece otra consecuencia de que los arrays sean objetos: **asignar un array a otra variable NO lo copia**, solo copia la referencia. Las dos variables apuntan al **mismo** array.
```js
const a = [1, 2, 3];
const b = a;        // ❌ no es una copia
b.push(4);
console.log(a);     // [ 1, 2, 3, 4 ]  ← ¡a también ha cambiado!
```
Para hacer una copia real:
```js
const original = [1, 2, 3];
const copia1 = [...original];       // spread (lo más habitual)
const copia2 = original.slice();    // slice sin argumentos
const copia3 = Array.from(original);
copia1.push(4);
console.log(original); // [ 1, 2, 3 ]  ← intacto
console.log(copia1);   // [ 1, 2, 3, 4 ]
```
> **Estas copias son "superficiales" (shallow).** Copian el array, pero si contiene **objetos**, esos objetos siguen compartidos:
> ```js
> const o = [{ n: 1 }];
> const copia = [...o];
> copia[0].n = 99;
> console.log(o); // [ { n: 99 } ]  ← el objeto de dentro es el mismo
> ```
> Para una copia **profunda** (deep) usa `structuredClone`:
> ```js
> const profunda = structuredClone(o);
> profunda[0].n = 5;
> console.log(o); // [ { n: 99 } ]  ← ahora sí independiente
> ```
> Los métodos que **mutan** son justo la razón por la que a veces conviene copiar antes: `const ordenado = [...n].sort(...)` (o, mejor, `n.toSorted(...)`) evita estropear el array original.
---
## 6. Otras herramientas útiles
### `Array.from()` — crear arrays a partir de otras cosas
```js
Array.from("abc");                         // [ 'a', 'b', 'c' ]
Array.from({ length: 3 }, (_, i) => i * 2); // [ 0, 2, 4 ]
```
### Desestructuración — sacar valores a variables
```js
const [primero, segundo, ...resto] = [1, 2, 3, 4];
console.log(primero); // 1
console.log(segundo); // 2
console.log(resto);   // [ 3, 4 ]
```
### Arrays bidimensionales (arrays de arrays)
Sirven para representar tablas o matrices. Se accede con dos índices: `[fila][columna]`.
```js
const tabla = [
  [1, 2, 3],
  [4, 5, 6]
];
tabla[1][0]; // 4  (fila 1, columna 0)
for (const fila of tabla) {
  for (const valor of fila) {
    console.log(valor);
  }
}
```
### Arrays de objetos
Es la estructura más habitual para datos "reales" (similar a las filas de una tabla de base de datos), y encaja perfectamente con `filter`, `map`, `find` y `sort`:
```js
const productos = [
  { id: 1, nombre: "Teclado", precio: 25 },
  { id: 2, nombre: "Monitor", precio: 150 },
  { id: 3, nombre: "Ratón", precio: 15 }
];
productos.find((p) => p.id === 2);               // { id: 2, nombre: 'Monitor', precio: 150 }
productos.filter((p) => p.precio < 30);          // Teclado y Ratón
productos.map((p) => p.nombre);                  // [ 'Teclado', 'Monitor', 'Ratón' ]
productos.toSorted((a, b) => a.precio - b.precio); // ordenados de barato a caro
```
