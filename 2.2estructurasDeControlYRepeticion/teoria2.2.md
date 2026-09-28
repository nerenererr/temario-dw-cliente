# 2.2. Estructuras de Control y Repetición

## Índice

1. [Estructuras de control](#1-estructuras-de-control)
   - [if / else if / else](#11-if--else-if--else)
   - [switch](#12-switch)
2. [Estructuras de repetición](#2-estructuras-de-repetición)
   - [for](#21-for)
   - [for...in y for...of](#22-forin-y-forof)
   - [while y do...while](#23-while-y-dowhile)
3. [Modificar el flujo: break y continue](#3-modificar-el-flujo-break-y-continue)
4. [forEach](#4-foreach)

---

## 1. Estructuras de control

Las estructuras de control permiten que el programa **decida qué código ejecutar** según se cumpla o no una condición. Sin ellas, el código se ejecutaría siempre línea a línea, de arriba abajo, sin posibilidad de reaccionar a nada.

Antes de empezar, dos ideas clave:

- Una **condición** es cualquier expresión que se pueda evaluar como `true` o `false`.
- JS convierte automáticamente otros valores a booleano cuando se usan en una condición. Los valores **falsy** (se consideran `false`) son: `false`, `0`, `""` (cadena vacía), `null`, `undefined` y `NaN`. Todo lo demás es **truthy**.

### Operadores de comparación y lógicos

| Operador | Significado | Ejemplo | Resultado |
|---|---|---|---|
| `===` | Igual (mismo valor **y** mismo tipo) | `5 === "5"` | `false` |
| `==` | Igual (con conversión de tipos) | `5 == "5"` | `true` |
| `!==` | Distinto (estricto) | `5 !== 3` | `true` |
| `>` `<` | Mayor / menor | `5 > 3` | `true` |
| `>=` `<=` | Mayor o igual / menor o igual | `5 >= 5` | `true` |
| `&&` | Y lógico (AND) | `true && false` | `false` |
| `\|\|` | O lógico (OR) | `true \|\| false` | `true` |
| `!` | Negación (NOT) | `!true` | `false` |

> Usa siempre `===` y `!==` en lugar de `==` y `!=`. Así evitas conversiones de tipo inesperadas.

### 1.1. `if` / `else if` / `else`

#### `if` simple

Ejecuta un bloque de código **solo si** la condición es verdadera.

```js
const edad = 20;

if (edad >= 18) {
  console.log("Eres mayor de edad");
}
```

#### `if ... else`

Añade una alternativa para cuando la condición **no** se cumple.

```js
const nota = 45;

if (nota >= 60) {
  console.log("Aprobado");
} else {
  console.log("Suspenso");
}
// Suspenso
```

#### `if ... else if ... else`

Para encadenar varias condiciones. JS las evalúa **en orden** y ejecuta solo la primera que sea verdadera; el resto se ignoran.

```js
const mes = 10;

if (mes >= 3 && mes <= 5) {
  console.log("Primavera");
} else if (mes >= 6 && mes <= 8) {
  console.log("Verano");
} else if (mes >= 9 && mes <= 11) {
  console.log("Otoño");
} else {
  console.log("Invierno");
}
// Otoño
```

> Como se ejecuta solo la primera condición verdadera, las más específicas deben ir primero.

```js
const puntos = 95;

if (puntos >= 50) {
  console.log("Bien");        // ← se ejecuta esta, y las demás ni se miran
} else if (puntos >= 90) {
  console.log("Excelente");   // ← nunca se llega aquí
}
```

#### Combinar condiciones

```js
const edad = 20;
const tieneCarnet = true;

if (edad >= 18 && tieneCarnet) {
  console.log("Puede conducir");
}

const esFinDeSemana = true;
const esFestivo = false;

if (esFinDeSemana || esFestivo) {
  console.log("Hoy no se trabaja");
}
```

#### Operador ternario

Es un `if ... else` en una sola línea. Sintaxis: `condicion ? valorSiTrue : valorSiFalse`.

```js
const numero = 7;
const tipo = numero % 2 === 0 ? "Par" : "Impar";
console.log(tipo); // Impar
```

> Es importamte que solo lo uséis para casos **sencillos**. Si necesitas anidar ternarios dentro de ternarios, mejor usa un `if / else if` normal: se lee mucho mejor.

#### Ejemplo completo con función

```js
function calificarNota(puntuacion) {
  if (puntuacion >= 90) {
    return "Sobresaliente";
  } else if (puntuacion >= 70) {
    return "Notable";
  } else if (puntuacion >= 60) {
    return "Aprobado";
  } else {
    return "Suspenso";
  }
}

console.log(calificarNota(95)); // Sobresaliente
console.log(calificarNota(65)); // Aprobado
console.log(calificarNota(30)); // Suspenso
```

### 1.2. `switch`

Sirve para comparar **una misma variable contra varios valores concretos**. Es una alternativa más limpia a muchos `else if` seguidos cuando todos comparan con `===` la misma variable.

```js
const dia = 3;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  default:
    console.log("Otro día");
}
// Miércoles
```

Cosas que hay que saber:

- `switch` compara con `===` (igualdad estricta).
- `default` es opcional y se ejecuta si ningún `case` coincide (equivale al `else` final).
- **El `break` es importante**: sin él, JS sigue ejecutando los `case` siguientes aunque no coincidan. Esto se llama *fall-through*.

#### El problema de olvidar el `break`

```js
const dia = 1;

switch (dia) {
  case 1:
    console.log("Lunes");
  case 2:
    console.log("Martes");   // ← también se ejecuta, ¡sin querer!
  case 3:
    console.log("Miércoles"); // ← y esta también
}
// Lunes
// Martes
// Miércoles
```

#### Usar el fall-through a propósito

A veces sí interesa agrupar varios casos que hacen lo mismo:

```js
function obtenerTipoDia(dia) {
  switch (dia) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return "Día laboral";
    case 6:
    case 7:
      return "Fin de semana";
    default:
      return "Número de día inválido";
  }
}

console.log(obtenerTipoDia(3)); // Día laboral
console.log(obtenerTipoDia(6)); // Fin de semana
console.log(obtenerTipoDia(9)); // Número de día inválido
```

> 💡 Cuando usas `return` dentro de un `case`, no hace falta `break`, porque `return` ya sale de la función.

#### ¿`if` o `switch`?

| Usa `if / else if` cuando... | Usa `switch` cuando... |
|---|---|
| Las condiciones son rangos (`>=`, `<`) | Comparas una variable con valores exactos |
| Combinas condiciones con `&&` / `\|\|` | Hay muchos casos posibles |
| Solo hay 2 o 3 opciones | Varios casos comparten el mismo código |

---

## 2. Estructuras de repetición

Los bucles (loops) permiten **ejecutar un bloque de código varias veces** sin tener que copiarlo y pegarlo.

### 2.1. `for`

Es el bucle clásico, ideal cuando **sabes cuántas veces** vas a repetir. Tiene tres partes separadas por `;`:

```
for (inicialización; condición; actualización) {
  // código a repetir
}
```

1. **Inicialización**: se ejecuta una sola vez, al principio (normalmente declara el contador).
2. **Condición**: se comprueba antes de cada vuelta. Si es `true`, se ejecuta el bloque; si es `false`, el bucle termina.
3. **Actualización**: se ejecuta al final de cada vuelta (normalmente incrementa el contador).

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// 0, 1, 2, 3, 4
```

#### Recorrer un array por índice

```js
const frutas = ["manzana", "pera", "uva"];

for (let i = 0; i < frutas.length; i++) {
  console.log(`Fruta ${i}: ${frutas[i]}`);
}
// Fruta 0: manzana
// Fruta 1: pera
// Fruta 2: uva
```

#### Acumular un resultado

```js
const precios = [10, 20, 5];
let total = 0;

for (let i = 0; i < precios.length; i++) {
  total += precios[i];
}

console.log(total); // 35
```

#### Contar hacia atrás y saltar de dos en dos

```js
for (let i = 10; i > 0; i--) {
  console.log(i); // 10, 9, 8 ... 1
}

for (let i = 0; i <= 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8, 10
}
```

> **Error típico:** usar `<=` en vez de `<` al recorrer un array. Como los índices empiezan en 0, el último índice es `length - 1`. Con `i <= frutas.length` intentarías leer `frutas[3]`, que es `undefined`.

### 2.2. `for...in` y `for...of`

Son dos bucles distintos que se parecen mucho en la sintaxis pero hacen cosas diferentes. Esta es una confusión muy frecuente.

| Bucle | Recorre... | Devuelve en cada vuelta | Se usa principalmente con |
|---|---|---|---|
| `for...in` | Las **claves / propiedades** | El nombre de la propiedad (string) | **Objetos** |
| `for...of` | Los **valores** | El valor del elemento | **Arrays, strings**, Map, Set |

#### `for...in` — recorre las claves

```js
const alumno = {
  nombre: "María",
  edad: 18,
  curso: "DAW"
};

for (const clave in alumno) {
  console.log(`${clave}: ${alumno[clave]}`);
}
// nombre: María
// edad: 18
// curso: DAW
```

Fíjate en que dentro del bucle `clave` es el **nombre** de la propiedad (`"nombre"`, `"edad"`...), y para obtener el valor hay que usar `alumno[clave]`.

> **No uséis `for...in` con arrays.** Aunque funciona, devuelve los índices **como strings** (`"0"`, `"1"`, `"2"`) y además puede recorrer propiedades heredadas o añadidas al array. Para arrays usa `for...of` o un `for` normal.

```js
const colores = ["rojo", "verde", "azul"];

for (const i in colores) {
  console.log(i, typeof i); // "0" "string", "1" "string"...
}
```

#### `for...of` — recorre los valores

```js
const frutas = ["manzana", "pera", "uva"];

for (const fruta of frutas) {
  console.log(fruta);
}
// manzana
// pera
// uva
```

Es mucho más cómodo que el `for` clásico cuando no necesitas el índice.

También funciona con **strings**, que se recorren letra a letra:

```js
for (const letra of "Hola") {
  console.log(letra);
}
// H, o, l, a
```

#### Si necesito el índice con `for...of`

Se puede usar `.entries()`, que devuelve pares `[índice, valor]`:

```js
const frutas = ["manzana", "pera", "uva"];

for (const [indice, fruta] of frutas.entries()) {
  console.log(`${indice}: ${fruta}`);
}
// 0: manzana
// 1: pera
// 2: uva
```

#### Recorrer un objeto con `for...of`

Un objeto normal **no es iterable**, así que `for...of` da error directamente. La forma habitual es convertirlo antes con `Object.keys()`, `Object.values()` u `Object.entries()`:

```js
const alumno = { nombre: "María", edad: 18 };

for (const [clave, valor] of Object.entries(alumno)) {
  console.log(`${clave} -> ${valor}`);
}
// nombre -> María
// edad -> 18
```

#### En definitiva, ¿cuál uso?

```js
const array = ["a", "b", "c"];
const objeto = { x: 1, y: 2 };

for (const valor of array)    { }  // valores de un array
for (const clave in objeto)   { }  // claves de un objeto
```

> **Ayuda para no confundirlos:** `for...o**f**` → los valores (**of** = "de"), `for...i**n**` → los **n**ombres de las propiedades.

### 2.3. `while` y `do...while`

Se usan cuando **no sabes de antemano cuántas vueltas** hará el bucle: se repite mientras una condición sea verdadera.

#### `while`

Comprueba la condición **antes** de cada vuelta. Si desde el principio es falsa, el bloque no se ejecuta ni una vez.

```js
let contador = 0;

while (contador < 3) {
  console.log(`Vuelta ${contador}`);
  contador++;
}
// Vuelta 0
// Vuelta 1
// Vuelta 2
```

> **Bucle infinito:** si la condición nunca llega a ser falsa, el programa se queda colgado. Es el error más típico con `while`: olvidar actualizar la variable de la condición (aquí, `contador++`).

```js
let n = 0;
while (n < 3) {
  console.log(n);
  // ¡falta n++! → se ejecuta infinitas veces
}
```

Un ejemplo más realista: repetir hasta llegar a cierta condición.

```js
let saldo = 1000;
let años = 0;

while (saldo < 2000) {
  saldo *= 1.05; // 5% de interés anual
  años++;
}

console.log(`Se duplica en ${años} años`); // Se duplica en 15 años
```

#### `do...while`

Comprueba la condición **después** de cada vuelta, así que el bloque se ejecuta **siempre al menos una vez**.

```js
let numero = 10;

do {
  console.log(`numero vale ${numero}`);
  numero++;
} while (numero < 5);
// numero vale 10   ← se ejecuta una vez aunque 10 < 5 sea falso
```

| `while` | `do...while` |
|---|---|
| Comprueba antes | Comprueba después |
| Puede no ejecutarse nunca | Se ejecuta al menos una vez |
| El más habitual | Poco usado (casos como validar una entrada del usuario) |

#### ¿`for` o `while`?

- `for` → sabes cuántas vueltas (recorrer un array, contar del 1 al 10).
- `while` → dependes de una condición que puede cumplirse en cualquier momento (esperar a que algo cambie, repetir hasta acertar, etc.).

---

## 3. Modificar el flujo: `break` y `continue`

> **Hay que pensar bien antes de usarlos.** Saltarse el flujo normal de un bucle hace que el código sea más difícil de seguir. Úsalos cuando realmente simplifiquen algo, no por costumbre.

### `break` — sale del bucle

Termina el bucle inmediatamente, aunque la condición siga siendo verdadera.

```js
const numeros = [3, 8, 12, 5, 20];

for (const n of numeros) {
  if (n > 10) {
    console.log(`Primer número mayor que 10: ${n}`);
    break; // ya lo hemos encontrado, no hace falta seguir
  }
}
// Primer número mayor que 10: 12
```

### `continue` — salta a la siguiente vuelta

Se salta el resto del código de la vuelta actual y pasa directamente a la siguiente.

```js
for (let i = 1; i <= 6; i++) {
  if (i % 2 === 0) {
    continue; // si es par, salta esta vuelta
  }
  console.log(i);
}
// 1, 3, 5
```

### `break` en `switch`

Como he dicho anteriormente, dentro de un `switch` el `break` evita que se ejecuten los `case` siguientes. No confundir: dentro de un `switch` que está dentro de un bucle, `break` sale del **switch**, no del bucle.

### Etiquetas (labels) para bucles anidados

`break` solo sale del bucle **más interno**. Si necesitas salir de varios a la vez, se puede usar una etiqueta, aunque es una característica poco recomendable (suele indicar que hay que replantear el código o meterlo en una función con `return`).

```js
externo: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break externo; // sale de AMBOS bucles
    }
    console.log(i, j);
  }
}
// 0 0, 0 1, 0 2, 1 0
```

### Alternativa más limpia: `return` dentro de una función

Muchas veces, en lugar de `break`, es más claro meter el bucle en una función y usar `return`:

```js
function buscarPrimerMayorQue10(numeros) {
  for (const n of numeros) {
    if (n > 10) {
      return n; // sale de la función (y por tanto del bucle)
    }
  }
  return null; // si no se encuentra ninguno
}

console.log(buscarPrimerMayorQue10([3, 8, 12, 5, 20])); // 12
```

---

## 4. forEach

`forEach` es un **método de los arrays** que ejecuta una función por cada elemento. Es otra forma de recorrer un array, sin escribir el bucle a mano.

```js
const frutas = ["manzana", "pera", "uva"];

frutas.forEach((fruta, indice) => {
  console.log(`${indice}: ${fruta}`);
});
// 0: manzana
// 1: pera
// 2: uva
```

La función que le pasas recibe hasta tres parámetros: el **elemento**, el **índice** y el **array completo** (los dos últimos son opcionales).

### Diferencias importantes con `for` / `for...of`

| | `for` / `for...of` | `forEach` |
|---|---|---|
| ¿Se puede usar `break` / `continue`? | Sí | No |
| ¿Se puede usar `return` para salir del bucle? | Sí (dentro de una función) | No (solo sale de esa vuelta) |
| Sintaxis | Bucle | Método con función callback |
| Funciona con objetos normales | Solo con `for...in` | No (solo arrays, Map, Set...) |

```js
[1, 2, 3, 4].forEach((n) => {
  if (n === 2) {
    return; // NO detiene el forEach, solo se salta esta vuelta (como un continue)
  }
  console.log(n);
});
// 1, 3, 4
```

> Si necesitas poder **cortar el recorrido** a mitad, usa `for...of`. Si simplemente quieres hacer algo con cada elemento, `forEach` queda mejor y más compacto.