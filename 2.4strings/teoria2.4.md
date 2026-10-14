# Strings en JavaScript

> **String** = secuencia de caracteres (texto).
> Referencia: [js_strings](https://www.w3schools.com/js/js_strings.asp)

---

## 1. Qué es un string y cómo se crea

Un string es **cero o más caracteres escritos entre comillas**.

```js
let nombre = "John Doe";   // comillas dobles
let coche  = 'Volvo XC60'; // comillas simples
```

- Comillas simples y dobles son **equivalentes**: no hay ninguna diferencia.
- Se puede usar un tipo de comilla **dentro** de otro distinto:

```js
let a = "It's alright";
let b = "Se llama 'Johnny'";
let c = 'Se llama "Johnny"';
```

### Propiedad `length`

Devuelve el número de caracteres.

```js
let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
abc.length; // 26
```

### Caracteres de escape

Si dentro del string necesitas las mismas comillas que lo delimitan, hay que "escaparlas" con la barra invertida `\`.

```js
let texto = "Somos los llamados \"Vikings\" del norte.";
```

| Código | Resultado | Descripción        |
| ------ | --------- | ------------------ |
| `\'`   | `'`       | Comilla simple     |
| `\"`   | `"`       | Comilla doble      |
| `\\`   | `\`       | Barra invertida    |

Otras secuencias válidas (heredadas de las máquinas de escribir):

| Código | Resultado              |
| ------ | ---------------------- |
| `\n`   | Nueva línea            |
| `\t`   | Tabulador horizontal   |
| `\r`   | Retorno de carro       |
| `\b`   | Retroceso (backspace)  |
| `\f`   | Salto de página        |
| `\v`   | Tabulador vertical     |

> `\b`, `\f` y `\v` casi no se usan hoy; en HTML no tienen efecto visual.

### Partir líneas largas

Una forma segura de partir un string largo es **concatenar con `+`**:

```js
let saludo = "Hola " +
             "mundo!";
```

(También se puede con plantillas multilínea, ver siguiente apartado.)

### Strings primitivos vs. objetos `String`

```js
let x = "John";             // primitivo (lo normal)
let y = new String("John"); // objeto  evitarlo
```

- **No crees objetos `String` con `new`**: complica el código, es más lento y da resultados raros.
- Con un primitivo y un objeto:
  - `x == y` → `true` (compara el valor)
  - `x === y` → `false` (distinto tipo)
- Dos objetos `String` comparados entre sí dan **siempre `false`** (con `==` y con `===`), porque se comparan referencias, no contenido.

---

## 2. Plantillas de cadena (template strings / template literals)

> Referencia: [js_string_templates](https://www.w3schools.com/js/js_string_templates.asp)

Se definen con **acento grave (backticks)** en vez de comillas. Se introdujeron en **ES6 (2015)**.

```js
let texto = `Hello World!`;
```

### Ventajas

**1. Admiten comillas simples y dobles dentro sin escapar**

```js
let t = `He's often called "Johnny"`;
```

**2. Admiten varias líneas**

```js
let poema = `The quick
brown fox
jumps over
the lazy dog`;
```

**3. Interpolación de variables con `${...}`**

```js
let nombre = "John";
let apellido = "Doe";
let msg = `Welcome ${nombre}, ${apellido}!`;
```

**4. Interpolación de expresiones**

Dentro de `${}` cabe cualquier expresión de JavaScript:

```js
let precio = 10;
let iva = 0.25;
let total = `Total: ${(precio * (1 + iva)).toFixed(2)}`; // "Total: 12.50"
```

**5. Útiles para generar HTML**

```js
let titulo = "Template Strings";
let etiquetas = ["template strings", "javascript", "es6"];

let html = `<h2>${titulo}</h2><ul>`;
for (const e of etiquetas) {
  html += `<li>${e}</li>`;
}
html += `</ul>`;
```

### Compatibilidad

Soportado en todos los navegadores modernos desde junio de 2017.

---

## 3. Métodos de String

> Referencia: [js_string_methods](https://www.w3schools.com/js/js_string_methods.asp)

> **Los strings son inmutables.** Ningún método modifica el original: **siempre devuelven un string nuevo**. Hay que guardar el resultado en una variable.

```js
let s = "hola";
s.toUpperCase();      // devuelve "HOLA", pero s sigue siendo "hola"
s = s.toUpperCase();  // ahora sí se guarda
```

### 3.1 Acceder a un carácter

| Método / forma       | Qué hace                                                      |
| -------------------- | ------------------------------------------------------------- |
| `charAt(pos)`        | Devuelve el carácter en esa posición                          |
| `charCodeAt(pos)`    | Devuelve el código UTF-16 (entero 0–65535) del carácter       |
| `codePointAt(pos)`   | Devuelve el *code point* Unicode en esa posición              |
| `at(pos)`            | Como `charAt`, pero **admite índices negativos** (ES2022)     |
| `texto[pos]`         | Acceso tipo array                                             |

```js
let t = "HELLO WORLD";
t.charAt(0);       // "H"
t.charCodeAt(0);   // 72
t.at(-1);          // "D"  (el último)
t[0];              // "H"
```

**Hay que tener cuidado con `[ ]`:**

- Hace que el string parezca un array, pero **no lo es**.
- Si no existe esa posición devuelve `undefined`, mientras que `charAt()` devuelve `""`.
- Es de **solo lectura**: `t[0] = "A"` no cambia nada (en modo estricto da error, en modo normal falla en silencio).

### 3.2 Unir strings: `concat()`

```js
"Hello".concat(" ", "World");  // "Hello World"
// equivale a: "Hello" + " " + "World"
```

### 3.3 Extraer partes

| Método                  | Parámetros                  | Notas                                                          |
| ----------------------- | --------------------------- | -------------------------------------------------------------- |
| `slice(inicio, fin)`    | posición inicial y final    | `fin` **no incluido**; admite negativos (cuentan desde el final) |
| `substring(inicio, fin)`| posición inicial y final    | Igual que `slice`, pero los negativos se tratan como `0`       |
| `substr(inicio, long)`  | posición inicial y **longitud** | ⛔ **Obsoleto**: usar `slice` o `substring`                |

```js
let frutas = "Apple, Banana, Kiwi";

frutas.slice(7, 13);     // "Banana"
frutas.slice(7);         // "Banana, Kiwi"  (hasta el final)
frutas.slice(-12);       // "Banana, Kiwi"
frutas.slice(-12, -6);   // "Banana"

frutas.substring(7, 13); // "Banana"

frutas.substr(7, 6);     // "Banana"  (obsoleto, no utilizar)
```

> Las posiciones empiezan en **0**.

### 3.4 Mayúsculas y minúsculas

```js
"Hello World!".toUpperCase(); // "HELLO WORLD!"
"Hello World!".toLowerCase(); // "hello world!"
```

### 3.5 Quitar espacios en blanco

| Método        | Quita espacios…           |
| ------------- | ------------------------- |
| `trim()`      | al principio y al final   |
| `trimStart()` | solo al principio (ES2019)|
| `trimEnd()`   | solo al final (ES2019)    |

```js
" Hello World! ".trim();  // "Hello World!"
```

### 3.6 Rellenar hasta una longitud: `padStart()` y `padEnd()` (ES2017)

Rellenan con otro string (las veces que haga falta) hasta alcanzar la longitud indicada.

```js
"5".padStart(4, "0");  // "0005"
"5".padEnd(4, "x");    // "5xxx"
```

Para rellenar un **número**, primero hay que convertirlo a string

```js
let n = 5;
n.toString().padStart(4, "0"); // "0005"
```

### 3.7 Repetir: `repeat(n)`

```js
"Hello world!".repeat(2);  // "Hello world!Hello world!"
```

### 3.8 Reemplazar

**`replace(buscar, nuevo)`**

- Reemplaza **solo la primera coincidencia**.
- Distingue mayúsculas de minúsculas.
- Devuelve un string nuevo.

```js
let t = "Please visit Microsoft and Microsoft!";

t.replace("Microsoft", "W3Schools");     // solo cambia la primera
t.replace(/MICROSOFT/i, "W3Schools");    // /i → ignora mayúsculas/minúsculas
t.replace(/Microsoft/g, "W3Schools");    // /g → cambia todas (global)
```

> Las expresiones regulares se escriben **sin comillas**.

**`replaceAll(buscar, nuevo)`** (ES2021)

Reemplaza **todas** las coincidencias.

```js
text = text.replaceAll("Cats", "Dogs");
```

Si le pasas una expresión regular, **debe llevar el flag `g`**; si no, lanza `TypeError`.

### 3.9 Convertir a array: `split(separador)`

```js
let t = "The quick brown fox.";

t.split(" ");   // ["The", "quick", "brown", "fox."]  → palabras
t.split(",");   // separa por comas
t.split("|");   // separa por barra vertical
t.split("");    // un elemento por carácter
t.split();      // sin separador → ["The quick brown fox."]
```

**`split("")` no es seguro con emojis o caracteres complejos** 

### 3.10 Otros métodos (ES2024)

| Método            | Qué hace                                                                 |
| ----------------- | ------------------------------------------------------------------------ |
| `isWellFormed()`  | `true` si el string no contiene *lone surrogates* (surrogates sueltos)   |
| `toWellFormed()`  | Devuelve un string donde los *lone surrogates* se sustituyen por `U+FFFD` |