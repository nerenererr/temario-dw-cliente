# Tema 3.1 Objetos nativos del lenguaje

## 3.1.1 Introducción

Un objeto predefinido (*built-in*) es un objeto que **ya existe** al arrancar el programa. Se dividen en dos familias:

| Familia | Quién lo define | Ejemplos |
|---|---|---|
| **Objetos del lenguaje** | ECMAScript (funcionan en navegador y Node) | `String`, `Number`, `Array`, `Math`, `Date`, `RegExp`, `Object`, `JSON`, `Map`, `Set`, `Error` |
| **Objetos del navegador** | El navegador | `window`, `document`, `location`, `history`, `navigator`, `screen`, `localStorage`, `console` |

Los del navegador se agrupan en el **BOM** (ventana y navegador) y el **DOM** (contenido de la página):

```
window                    ← objeto global del navegador
 ├── document             ← DOM
 ├── location · history · navigator · screen
 ├── localStorage · sessionStorage · console
 └── (y los objetos del lenguaje: Math, Date, JSON...)
```

**Detalles importantes:**

- Los primitivos (`"abc"`, `5`, `true`) se **envuelven temporalmente** en su objeto (`String`, `Number`, `Boolean`) al usar `.` sobre ellos. Por eso `"abc".length` funciona.
- **No uses `new String()`, `new Number()`, `new Boolean()`**: crean objetos, y un objeto siempre es *truthy* (`new Boolean(false)` se evalúa como `true`). Convierte con `String(x)`, `Number(x)`, `Boolean(x)` sin `new`.
- `typeof` no distingue bien: `typeof [] === "object"` y `typeof null === "object"`. Para arrays: `Array.isArray(x)`.

---

## 3.1.2 String, Number y Boolean

### String

Inmutable: los métodos **devuelven un string nuevo**, no modifican el original.

| Para... | Método | Ejemplo |
|---|---|---|
| Longitud | `length` | `"hola".length` → `4` |
| Un carácter | `at`, `charAt`, `[ ]` | `"hola".at(-1)` → `"a"` |
| Extraer | `slice(ini, fin)` | `"Apple, Kiwi".slice(-4)` → `"Kiwi"` |
| Buscar posición | `indexOf`, `lastIndexOf` | `"hola".indexOf("l")` → `2` (`-1` si no está) |
| Comprobar | `includes`, `startsWith`, `endsWith` | `"hola".startsWith("ho")` → `true` |
| Mayúsc./minúsc. | `toUpperCase`, `toLowerCase` | |
| Quitar espacios | `trim`, `trimStart`, `trimEnd` | `"  x ".trim()` → `"x"` |
| Rellenar | `padStart`, `padEnd` | `"5".padStart(3, "0")` → `"005"` |
| Repetir | `repeat` | `"ab".repeat(3)` → `"ababab"` |
| Reemplazar | `replace` (1.ª coincidencia), `replaceAll` | `"a-b-c".replaceAll("-", "+")` → `"a+b+c"` |
| A array | `split(sep)` | `"a,b,c".split(",")` → `["a","b","c"]` |

```js
let s = "hola";
s.toUpperCase();      // "HOLA" pero se pierde
s = s.toUpperCase();  // ahora sí se guarda

// Plantillas: interpolación y varias líneas
const nombre = "Ana", precio = 10;
`Hola ${nombre}, total: ${(precio * 1.21).toFixed(2)} €`;   // "Hola Ana, total: 12.10 €"
```

**Comparar:** `<` compara por código Unicode (`"Z" < "a"` es `true`, `"10" < "9"` es `true`). Para ordenar texto en un idioma: `localeCompare`.

```js
["ñ", "z", "a", "é"].sort((a, b) => a.localeCompare(b, "es"));   // [ 'a', 'é', 'ñ', 'z' ]
"ñandú".normalize("NFD").replace(/[\u0300-\u036f]/g, "");        // "nandu" (quitar tildes)
```

### Number

Todos los números son `number` (coma flotante de 64 bits).

```js
Number("42");     // 42        parseInt("42px");   // 42
Number("");       // 0  ← cuidado     parseInt("px42");   // NaN
Number("12px");   // NaN       parseFloat("3.14abc"); // 3.14
```

- `NaN` no es igual a sí mismo: usa `Number.isNaN(x)`.
- `["1","2","3"].map(parseInt)` da `[1, NaN, NaN]` → usa `.map(Number)`.
- **Decimales:** `0.1 + 0.2 === 0.3` es `false` (da `0.30000000000000004`). Para mostrar, `toFixed` (**devuelve string**); para comparar, usa tolerancia con `Number.EPSILON`; con dinero, trabaja en céntimos.

```js
(1234.5678).toFixed(2);   // "1234.57"
(255).toString(16);       // "ff"
Number.isInteger(5.0);    // true
Number.MAX_SAFE_INTEGER;  // 9007199254740991 → para enteros mayores: BigInt (123n)
```

**Formato por idioma:**

```js
(12345.5).toLocaleString("es-ES", { style: "currency", currency: "EUR" });   // "12.345,50 €"
new Intl.NumberFormat("es-ES", { style: "percent" }).format(0.256);           // "26 %"
```

### Boolean: valores *falsy*

Solo hay 7 valores falsy: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` y `NaN`. **Todo lo demás es truthy**, incluidos `"0"`, `[]` y `{}`.

```js
Boolean([]);    // true  ← un array vacío es truthy (usa arr.length)
!!"hola";       // true  (doble negación: convierte a booleano)
0 || 5;         // 5     (|| reacciona a cualquier falsy)
0 ?? 5;         // 0     (?? solo reacciona a null y undefined)
```

---

## 3.1.3 Array, Set y Map

### Array (referencia rápida)

| Necesito... | Uso | ¿Muta? |
|---|---|---|
| Añadir / quitar al final | `push` / `pop` | 🔴 |
| Añadir / quitar al principio | `unshift` / `shift` | 🔴 |
| Insertar, borrar o reemplazar | `splice(ini, cuántos, ...nuevos)` | 🔴 |
| Copiar una parte | `slice(ini, fin)` | 🟢 |
| Unir | `concat` o `[...a, ...b]` | 🟢 |
| Buscar valor | `indexOf`, `includes` | 🟢 |
| Buscar con condición | `find`, `findIndex`, `findLast` | 🟢 |
| Ordenar / invertir | `sort`, `reverse` (versiones sin mutar: `toSorted`, `toReversed`) | 🔴 |
| Transformar / filtrar / acumular | `map`, `filter`, `reduce` | 🟢 |
| Comprobar | `some` (alguno), `every` (todos) | 🟢 |
| A texto | `join(sep)` | 🟢 |

```js
[10, 9, 1].sort();                 // [ 1, 10, 9 ]  ← ordena como TEXTO
[10, 9, 1].sort((a, b) => a - b);  // [ 1, 9, 10 ] 

const nums = [1, 2, 3, 4];
nums.map((n) => n * 2);                // [ 2, 4, 6, 8 ]
nums.filter((n) => n % 2 === 0);       // [ 2, 4 ]
nums.reduce((acc, n) => acc + n, 0);   // 10
```

- `const` impide reasignar la variable, **no** modificar el contenido del array.
- **Copiar:** `const b = a` no copia (misma referencia). Usa `[...a]` (copia superficial) o `structuredClone(a)` (profunda).

### Set: valores únicos

```js
const s = new Set([1, 2, 2, 3, 3, 3]);   // Set(3) { 1, 2, 3 }
s.add(4); s.has(2); s.delete(1); s.size; // se usa size, no length

[...new Set([1, 2, 2, 3])];              // [ 1, 2, 3 ]  ← eliminar duplicados
```

### Map: pares clave-valor con claves de cualquier tipo

```js
const m = new Map([["a", 1], ["b", 2]]);
m.set("c", 3);
m.get("a");        // 1
m.has("z");        // false
m.size;            // 3

for (const [clave, valor] of m) console.log(clave, valor);   // iterable directamente
Object.fromEntries(m);                                       // { a: 1, b: 2, c: 3 }
```

| | Object | Map |
|---|---|---|
| Claves | Solo string/símbolo | **Cualquier tipo** |
| Orden | Enteros primero | Orden de inserción |
| Tamaño | `Object.keys(o).length` | `m.size` |

> **Contar ocurrencias:** `cont.set(p, (cont.get(p) ?? 0) + 1)`.

---

## 3.1.4 Math

No es un constructor: se usa directamente (`Math.floor(...)`).

| Función | Resultado |
|---|---|
| `Math.floor(-4.7)` / `Math.ceil(-4.7)` | `-5` / `-4` (abajo / arriba) |
| `Math.round(2.5)` / `Math.round(-2.5)` | `3` / `-2` (el .5 va hacia +∞) |
| `Math.trunc(-4.7)` | `-4` (quita decimales) |
| `Math.max(3, 7, 2)` / `Math.min(...)` | `7` / `2` (con array: `Math.max(...arr)`) |
| `Math.abs(-3.5)` | `3.5` |
| `Math.pow(2, 10)` o `2 ** 10` | `1024` |
| `Math.sqrt(16)` | `4` |
| `Math.PI` | `3.141592653589793` |
| `Math.random()` | decimal en [0, 1) |

```js
// Entero aleatorio entre min y max (ambos incluidos)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
randomInt(1, 6);   // tirada de dado

Math.round(3.14159 * 100) / 100;   // 3.14  (redondear a 2 decimales)
```

> Los ángulos de `Math.sin`, `Math.cos`... van en **radianes**. `Math.random()` no es seguro para contraseñas (usar `crypto.getRandomValues`).

---

## 3.1.5 Date

Guarda **milisegundos desde el 1/1/1970 UTC** (*timestamp*).

```js
new Date();                          // ahora
new Date(2026, 2, 15);               // 15 de MARZO de 2026 (hora local)
new Date("2026-03-15T10:30:00Z");    // desde string ISO
new Date(1773570645123);             // desde timestamp
Date.now();                          // timestamp actual (number)
```

> **Los meses empiezan en 0** (enero = 0, diciembre = 11). Los días del mes, en 1.

```js
const d = new Date(2026, 2, 15, 10, 30);

d.getFullYear();   // 2026
d.getMonth();      // 2   (marzo)
d.getDate();       // 15  (día del mes)
d.getDay();        // día de la semana: 0 = domingo ... 6 = sábado
d.getHours(); d.getMinutes(); d.getSeconds();
d.getTime();       // timestamp
```

Hay un `set` por cada `get` (`setDate`, `setMonth`...) y **modifican el objeto**. JS normaliza los desbordamientos:

```js
const f = new Date(2026, 0, 30);   // 30 de enero
f.setDate(f.getDate() + 5);        // → 4 de febrero (suma 5 días)

new Date(2026, 2, 0).getDate();    // 28  → el día 0 de un mes es el último del anterior
```

**Comparar y restar:**

```js
const a = new Date(Date.UTC(2026, 0, 1));
const b = new Date(Date.UTC(2026, 11, 25));

b > a;                              // true   (<, > funcionan)
(b - a) / (1000 * 60 * 60 * 24);    // 358    (días de diferencia; la resta da milisegundos)
a.getTime() === new Date(a).getTime();   // true  (== y === NO sirven con fechas)
```

**Formatear:**

```js
d.toISOString();                                   // "2026-03-15T10:30:00.000Z" (siempre UTC)
d.toLocaleDateString("es-ES");                     // "15/3/2026"
d.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
// "domingo, 15 de marzo de 2026"
new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeStyle: "short" }).format(d);

const z = (n) => String(n).padStart(2, "0");       // formato manual: 5 → "05"
`${z(d.getDate())}/${z(d.getMonth() + 1)}/${d.getFullYear()}`;   // "15/03/2026"
```

**Parsear (hay que tener cuidado):**

- `new Date("2026-03-15")` → se interpreta como **UTC**; `new Date("2026-03-15T00:00:00")` → como **hora local**.
- Usa siempre formato **ISO**. Evita `"15/03/2026"`: no es fiable. Si lo recibes, trocéalo: `const [d, m, a] = txt.split("/"); new Date(a, m - 1, d);`

**Fecha inválida:**

```js
isNaN(new Date("hola"));   // true  (toString() da "Invalid Date")
```

> Hora local frente a UTC: cada getter tiene su versión UTC (`getUTCHours`...). Guarda y envía fechas en **UTC/ISO**, y conviértelas a hora local solo para mostrarlas.

---

## 3.1.6 RegExp

Patrón para **validar, buscar y reemplazar** texto.

```js
const re1 = /hola/i;                  // literal (lo habitual)
const re2 = new RegExp("hola", "i");  // desde una variable
```

**Flags:** `i` (ignora mayúsculas), `g` (todas las coincidencias), `m` (`^`/`$` por línea), `s` (el `.` incluye saltos de línea), `u` (Unicode, permite `\p{L}`).

| Patrón | Significa | Patrón | Significa |
|---|---|---|---|
| `.` | cualquier carácter | `a?` `a*` `a+` | 0-1 · 0 o más · 1 o más |
| `\d` `\w` `\s` | dígito · letra/dígito/`_` · espacio | `a{3}` `a{2,4}` | exactamente 3 · entre 2 y 4 |
| `[abc]` `[a-z]` `[^abc]` | clase · rango · negación | `^` `$` | inicio · fin |
| `(ab)` `(?<n>ab)` | grupo · grupo con nombre | `a\|b` | `a` o `b` |
| `\b` | límite de palabra | `\.` | punto literal (escapar `. * + ? ( ) [ ] { } \| \ ^ $`) |

**Métodos:**

| Método | Devuelve |
|---|---|
| `regex.test(str)` | `true` / `false` |
| `str.match(regex)` | Con `g`: array de coincidencias · sin `g`: detalle con grupos · `null` si no hay |
| `str.matchAll(regex)` | Iterador con todas las coincidencias y sus grupos (requiere `g`) |
| `str.replace(regex, nuevo)` | String con sustituciones (`$1`, `$2`... = grupos) |
| `str.split(regex)` | Array |

```js
/^\d{5}$/.test("28001");                  // true  (con ^ y $ se valida el texto COMPLETO)
"a1b22c333".match(/\d+/g);                // [ '1', '22', '333' ]
"Hola Mundo".replace(/o/g, "0");          // "H0la Mund0"
"2026-03-15".replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1");   // "15/03/2026"
"a, b;c  d".split(/[,; ]+/);              // [ 'a', 'b', 'c', 'd' ]

const m = "2026-03-15".match(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/);
m.groups.y;    // "2026"
```

> **Trampa con `g` y `test`:** una regex con `g` recuerda dónde se quedó (`lastIndex`) y alterna `true`/`false` si la reutilizas. **No pongas `g` en las regex que uses con `test`.**

> Los cuantificadores son voraces: `/<.+>/` captura hasta el último `>`; con `?` (`/<.+?>/`) captura hasta el primero.

**Validaciones habituales:**

```js
const cp    = /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/;      // código postal español
const tel   = /^[6-9]\d{8}$/;                         // teléfono español
const dni   = /^\d{8}[A-Za-z]$/;                      // formato DNI (no valida la letra)
const hora  = /^([01]\d|2[0-3]):[0-5]\d$/;            // HH:MM
const email = /^[\w.+-]+@[\w-]+\.[\w.-]+$/;           // email (comprobación básica de forma)
const pass  = /^(?=.*[A-Z])(?=.*\d).{8,}$/;           // 8+ caracteres, una mayúscula y un dígito

tel.test("612345678");   // true
tel.test("512345678");   // false
hora.test("24:00");      // false
```

---

## 3.1.7 Object, JSON y errores

### Object

```js
const per = { nombre: "Ana", edad: 25, ciudad: "Madrid" };

Object.keys(per);     // [ 'nombre', 'edad', 'ciudad' ]
Object.values(per);   // [ 'Ana', 25, 'Madrid' ]
Object.entries(per);  // [ ['nombre','Ana'], ['edad',25], ['ciudad','Madrid'] ]
Object.fromEntries([["a", 1], ["b", 2]]);   // { a: 1, b: 2 }

Object.hasOwn(per, "nombre");   // true (propiedad propia)
{ ...per, edad: 26 };           // copia con cambios (superficial)

const { nombre, ...resto } = per;           // desestructuración
per.direccion?.calle ?? "sin calle";        // ?. evita el error si falta; ?? da valor por defecto
```

- `Object.freeze(o)` impide añadir, borrar y modificar propiedades, pero es **superficial** (los objetos anidados siguen siendo modificables).
- `for...in` recorre también propiedades heredadas; `Object.keys` solo las propias.

### JSON

Formato de texto para intercambiar datos. Claves y strings siempre con **comillas dobles**; no admite `undefined`, funciones ni comentarios.

```js
const texto = JSON.stringify({ a: 1, b: [1, 2] });   // '{"a":1,"b":[1,2]}'  (objeto → texto)
JSON.parse(texto);                                    // { a: 1, b: [1, 2] }  (texto → objeto)
JSON.stringify(obj, null, 2);                         // con sangría (legible)
```

- Al serializar: funciones y `undefined` se **omiten**, `NaN` pasa a `null`, `Date` pasa a string ISO, y `Map`/`Set` se pierden (`{}`).
- `JSON.parse` lanza `SyntaxError` si el texto no es válido → protégelo con `try...catch`.
- Para copias profundas, mejor `structuredClone(obj)` que `JSON.parse(JSON.stringify(obj))`.

### Errores: `try...catch...finally`

```js
try {
  JSON.parse("{'a':1}");          // código que puede fallar
} catch (e) {
  console.log(e.name, e.message); // SyntaxError + mensaje
} finally {
  console.log("se ejecuta siempre");
}

function dividir(a, b) {
  if (b === 0) throw new Error("No se puede dividir entre cero");   // lanzar un error propio
  return a / b;
}
```

| Tipo | Cuándo |
|---|---|
| `SyntaxError` | Código o JSON mal formado |
| `ReferenceError` | Variable que no existe |
| `TypeError` | Operación sobre un tipo incorrecto (`null.x`, reasignar una `const`) |
| `RangeError` | Valor fuera de rango (`new Array(-1)`) |

> Lanza siempre objetos `Error` (llevan la traza `stack`). No dejes un `catch` vacío: trata el error o vuelve a lanzarlo.