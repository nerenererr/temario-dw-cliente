# Tema 4.1 Objetos literales y this 

## Índice

1. [Introducción](#1-introducción)
2. [Objetos literales](#2-objetos-literales)
   - [Crear, acceder y modificar](#21-crear-acceder-y-modificar)
   - [Métodos](#22-métodos)
   - [Objetos anidados y encadenamiento opcional](#23-objetos-anidados-y-encadenamiento-opcional)
   - [Recorrer y comprobar propiedades](#24-recorrer-y-comprobar-propiedades)
   - [Referencia, copia y comparación](#25-referencia-copia-y-comparación)
   - [Desestructuración, spread y rest](#26-desestructuración-spread-y-rest)
   - [Getters y setters](#27-getters-y-setters)
3. [La palabra clave `this`](#3-la-palabra-clave-this)

---

## 1. Introducción

Una **estructura definida por el usuario** es un tipo de dato que creamos nosotros para representar algo propio de nuestro problema, juntando:

- **Datos** (propiedades): `nombre`, `edad`, `saldo`...
- **Comportamiento** (métodos): `saludar()`, `ingresar()`, `apilar()`...

En JavaScript hay varias formas de definirlas:

| Forma | Cuándo se usa | Ejemplo |
|---|---|---|
| **Objeto literal** | Un único objeto, o datos sencillos | `const user = { name: "Ana" }` |
| **Función constructora** | Forma antigua de crear "moldes" de objetos (ES5) | `function Person(name) {...}` |
| **Clase** (`class`) | Forma moderna y recomendada de crear "moldes" (ES6) | `class Person {...}` |
| **Módulo** | Organizar el código en archivos | `export class Person {...}` |

> Las clases de JavaScript son, por debajo, funciones constructoras y prototipos con una **sintaxis más cómoda** ("azúcar sintáctico"). Entender los prototipos ayuda a comprender cómo funciona realmente la herencia.

## 2. Objetos literales

### 2.1. Crear, acceder y modificar

```js
const person = { name: "Ana", age: 25, city: "Madrid" };

person.name;            // "Ana"       (notación de punto)
person["age"];          // 25          (notación de corchetes)

person.email = "ana@mail.com";   // añadir una propiedad
person.age = 26;                 // modificar
delete person.city;              // eliminar

console.log(person);   // { name: 'Ana', age: 26, email: 'ana@mail.com' }
```

> `const` impide reasignar la variable, pero **no** modificar las propiedades del objeto.

**Atajos de sintaxis:**

```js
const name = "Ana", age = 25;

{ name, age };                       // { name: 'Ana', age: 25 }   (propiedad abreviada)

const key = "color";
{ [key + "1"]: "rojo", ["a" + 1]: 1 };   // { color1: 'rojo', a1: 1 }   (claves calculadas)
```

### 2.2. Métodos

Un **método** es una propiedad cuyo valor es una función:

```js
const user = {
  name: "Ana",
  greet() {                              // sintaxis abreviada de un método
    return `Hola, soy ${this.name}`;     // this = el objeto sobre el que se llama
  }
};

user.greet();   // "Hola, soy Ana"
```

### 2.3. Objetos anidados y encadenamiento opcional

Un objeto puede contener otros objetos y arrays:

```js
const emp = {
  name: "Luis",
  address: { city: "Sevilla", geo: { lat: 1 } },
  skills: ["js", "css"]
};

emp.address.city;     // "Sevilla"
emp.skills[1];        // "css"
emp.address.geo.lat;  // 1
```

Acceder a una propiedad de algo que no existe lanza un error. El **encadenamiento opcional** `?.` corta la cadena y devuelve `undefined`:

```js
emp.contact.phone;                       // ❌ TypeError (emp.contact es undefined)
emp.contact?.phone;                      // undefined
emp.contact?.phone ?? "sin teléfono";    // "sin teléfono"   (?? da un valor por defecto)
```

### 2.4. Recorrer y comprobar propiedades

```js
for (const [key, value] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, value);   // a 1 · b 2
}

Object.keys(person);     // [ 'name', 'age', 'email' ]
Object.values(person);   // [ 'Ana', 26, 'ana@mail.com' ]

"name" in person;                 // true   (también busca en el prototipo)
Object.hasOwn(person, "name");    // true   (solo propiedades propias)
"toString" in person;             // true   (heredada de Object)
Object.hasOwn(person, "toString");// false
person.phone;                     // undefined (no existe: no da error)
```

### 2.5. Referencia, copia y comparación

Los objetos se manejan **por referencia**: la variable guarda "la dirección" del objeto, no el objeto.

```js
const o1 = { x: 1 };
const o2 = o1;        // NO es una copia: ambas apuntan al mismo objeto
o2.x = 99;
o1.x;                 // 99

{ a: 1 } === { a: 1 };   // false  → dos objetos distintos, aunque tengan el mismo contenido
```

**Copiar:**

```js
const base = { a: 1, nested: { n: 1 } };

const shallow = { ...base };           // copia superficial
shallow.nested.n = 2;                  // ¡el objeto interior es el mismo!
base.nested.n;                         // 2

const deep = structuredClone(base);    // copia profunda
deep.nested.n = 3;
base.nested.n;                         // 2   (no cambia)
```

### 2.6. Desestructuración, spread y rest

La **desestructuración** extrae propiedades (o elementos) a variables:

```js
const { name, age: years = 18, city = "Sin ciudad", ...rest } =
  { name: "Ana", age: undefined, x: 1, y: 2 };
// name = "Ana"           · age se renombra a years y toma el valor por defecto 18
// city = "Sin ciudad"    · rest = { x: 1, y: 2 }

const { address: { city: town } } = emp;   // desestructuración anidada → town = "Sevilla"

const [first, , third = "def", ...others] = [1, 2, undefined, 4, 5];
// first = 1 · third = "def" · others = [4, 5]

let a = 1, b = 2;
[a, b] = [b, a];                           // intercambiar variables → a = 2, b = 1
```

También en los **parámetros** de una función:

```js
const show = ({ name, age = 0 }) => `${name} (${age})`;

show({ name: "Eva" });             // "Eva (0)"
show({ name: "Eva", age: 30 });    // "Eva (30)"
```

El operador `...` (**spread** al usarlo para esparcir, **rest** al usarlo para agrupar):

```js
const merged = { ...{ a: 1, b: 2 }, ...{ b: 3, c: 4 } };   // { a: 1, b: 3, c: 4 }  (lo último gana)

const sum = (...nums) => nums.reduce((t, n) => t + n, 0);   // rest: agrupa los argumentos en un array
sum(1, 2, 3);                  // 6
Math.max(...[1, 5, 3]);        // 5   (spread: esparce el array como argumentos)
```

### 2.7. Getters y setters

Permiten que una propiedad **se calcule** al leerla (`get`) o **ejecute código** al asignarla (`set`):

```js
const circle = {
  radius: 2,
  get area() { return Math.PI * this.radius ** 2; },    // propiedad calculada
  set diameter(d) { this.radius = d / 2; }              // asignar el diámetro cambia el radio
};

circle.area.toFixed(2);   // "12.57"   (se usa sin paréntesis: es una propiedad, no una función)
circle.diameter = 10;
circle.radius;            // 5
```

---

## 3. La palabra clave `this`

`this` hace referencia al **objeto sobre el que se ha llamado a la función**. Su valor **no depende de dónde se define la función, sino de cómo se llama**.

| Cómo se llama | Valor de `this` |
|---|---|
| `objeto.metodo()` | `objeto` |
| `funcion()` (función suelta) | `window` en un script normal; `undefined` en módulos, clases y modo estricto |
| `new Clase()` | El objeto nuevo que se está creando |
| `fn.call(obj)` / `fn.apply(obj)` / `fn.bind(obj)` | `obj` (fijado a mano) |
| **Función flecha** | No tiene `this` propio: usa el del código que la rodea |

```js
const counter = {
  count: 0,
  inc() { this.count++; return this.count; }
};

counter.inc();   // 1   → this es counter
```

### Perder el `this`

Si se **separa** el método del objeto, se pierde la referencia:

```js
class BankAccount {
  #balance = 0;
  deposit(amount) { this.#balance += amount; }
}

const acc = new BankAccount();
const f = acc.deposit;      // copiamos el método a una variable
f(10);                      // ❌ TypeError: Cannot read properties of undefined (reading '#balance')
```

Esto ocurre mucho al pasar un método como *callback* (`setTimeout`, `addEventListener`...). Soluciones:

```js
counter.inc.bind(counter);        // bind: devuelve una función con this fijado
setTimeout(() => counter.inc(), 100);   // flecha que llama al método sobre el objeto
```

### `this` y las funciones flecha

Una función flecha **hereda** el `this` del lugar donde se escribe, lo que la hace ideal para *callbacks* dentro de un método:

```js
const team = {
  name: "A",
  members: ["x", "y"],
  list() {
    return this.members.map((m) => `${m} (${this.name})`);   // la flecha usa el this de list()
  }
};

team.list();   // [ 'x (A)', 'y (A)' ]
```

Con una función normal como callback, `this` dejaría de ser `team` y `this.name` no valdría `"A"`.

> Por la misma razón, **no uses funciones flecha como métodos de un objeto** si necesitan `this`: la flecha no apunta al objeto.

En las clases se puede usar un **campo con función flecha** para que el método conserve siempre su `this`:

```js
class Btn {
  count = 0;
  inc = () => { this.count++; return this.count; };   // this siempre es la instancia
}

const b = new Btn();
const { inc } = b;     // aunque se separe del objeto...
inc();                 // 1
inc();                 // 2   ...sigue funcionando
```