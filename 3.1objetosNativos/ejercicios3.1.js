// Exercises: Tema 3.1 - Introducción a los objetos predefinidos en JavaScript

// 1. Notación de punto y de corchetes
console.log("Ejercicio 1: Notación de punto y de corchetes");
// Escribe una función llamada 'getValue' que tome un objeto ('person') y el
// nombre de una propiedad ('key', en un string), y devuelva el valor de esa
// propiedad.

const getValue = (person, key) => person[key];

const person = { name: "Ana", age: 25 };
console.log(getValue(person, "age"));   // Debería mostrar: 25
console.log(getValue(person, "name"));  // Debería mostrar: 'Ana'
console.log(getValue(person, "city"));  // Debería mostrar: undefined

// 2. Propiedades y métodos de un primitivo
console.log("\nEjercicio 2: Propiedades y métodos de un primitivo");
// Escribe una función llamada 'describeText' que tome un string ('text') y
// devuelva un objeto con tres propiedades:
// - 'length': la longitud del texto
// - 'upper': el texto en mayúsculas
// - 'first': su primer carácter

const describeText = (text) => ({
    length: text.length,
    upper: text.toUpperCase(),
    first: text.at(0),
});

console.log(describeText("hola"));
// Debería mostrar: { length: 4, upper: 'HOLA', first: 'h' }

// 3. El operador typeof
console.log("\nEjercicio 3: El operador typeof");
// Escribe una función llamada 'getTypes' que tome un array de valores
// ('values') y devuelva un nuevo array con el tipo de cada uno de ellos
// según el operador 'typeof'.

const getTypes = (values) => values.map((v) => typeof v);

console.log(getTypes([1, "a", true, undefined, null, [], {}, () => 1, 10n, Symbol("x")]));
// Debería mostrar:
// [ 'number', 'string', 'boolean', 'undefined', 'object', 'object', 'object', 'function', 'bigint', 'symbol' ]

// 4. Detectar el tipo real
console.log("\nEjercicio 4: Detectar el tipo real");
// 'typeof' no distingue un array, una fecha o 'null' de un objeto normal.
// Escribe una función llamada 'getRealType' que tome un valor ('value') y
// devuelva su tipo real en minúsculas ("array", "null", "date", "regexp",
// "number", "string", "object"...).

const getRealType = (value) =>
    Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

console.log(getRealType([]));          // Debería mostrar: 'array'
console.log(getRealType(null));        // Debería mostrar: 'null'
console.log(getRealType(new Date(0))); // Debería mostrar: 'date'
console.log(getRealType(/a/));         // Debería mostrar: 'regexp'
console.log(getRealType(5));           // Debería mostrar: 'number'
console.log(getRealType({}));          // Debería mostrar: 'object'

// 5. El operador instanceof
console.log("\nEjercicio 5: El operador instanceof");
// Escribe una función llamada 'checkInstances' que tome un valor ('value')
// y devuelva un objeto con tres propiedades booleanas:
// - 'isArray': si es una instancia de Array
// - 'isObject': si es una instancia de Object
// - 'isDate': si es una instancia de Date

const checkInstances = (value) => ({
    isArray: value instanceof Array,
    isObject: value instanceof Object,
    isDate: value instanceof Date,
});

console.log(checkInstances([]));          // Debería mostrar: { isArray: true, isObject: true, isDate: false }
console.log(checkInstances(new Date(0))); // Debería mostrar: { isArray: false, isObject: true, isDate: true }
console.log(checkInstances("texto"));     // Debería mostrar: { isArray: false, isObject: false, isDate: false }

// 6. Crear objetos con un constructor
console.log("\nEjercicio 6: Crear objetos con un constructor");
// Escribe una función llamada 'createDate' que tome tres parámetros,
// 'year', 'month' y 'day', donde 'month' va de 1 a 12 (como lo diría una
// persona), y devuelva el objeto Date correspondiente.

const createDate = (year, month, day) => new Date(year, month - 1, day);

const date = createDate(2026, 3, 15);
console.log(date instanceof Date);                           // Debería mostrar: true
console.log([date.getFullYear(), date.getMonth(), date.getDate()]); // Debería mostrar: [ 2026, 2, 15 ]

// 7. Objetos envoltorio (wrappers)
console.log("\nEjercicio 7: Objetos envoltorio (wrappers)");
// Escribe una función llamada 'compareWrappers' que, sin parámetros,
// devuelva un array con el resultado de estas cinco expresiones, en este
// orden:
// 1. typeof "abc"
// 2. typeof new String("abc")
// 3. new Number(5) == 5
// 4. new Number(5) === 5
// 5. new Boolean(false) ? "truthy" : "falsy"
// Añade un comentario explicando por qué dan esos valores.

const compareWrappers = () => [
    typeof "abc",                            // 'string': es un primitivo
    typeof new String("abc"),                // 'object': new crea un objeto envoltorio, no un primitivo
    new Number(5) == 5,                      // true: == convierte el objeto a primitivo (5 == 5)
    new Number(5) === 5,                     // false: === compara tipos y "object" no es "number"
    new Boolean(false) ? "truthy" : "falsy", // 'truthy': todo objeto es truthy, aunque contenga false
];

console.log(compareWrappers());
// Debería mostrar: [ 'string', 'object', true, false, 'truthy' ]

// 8. Convertir tipos sin 'new'
console.log("\nEjercicio 8: Convertir tipos sin 'new'");
// Escribe una función llamada 'convertValue' que tome un valor ('value') y
// devuelva un objeto con tres propiedades:
// - 'text': el valor convertido a string
// - 'number': el valor convertido a number
// - 'boolean': el valor convertido a boolean

const convertValue = (value) => ({
    text: String(value),
    number: Number(value),
    boolean: Boolean(value),
});

console.log(convertValue("42"));   // Debería mostrar: { text: '42', number: 42, boolean: true }
console.log(convertValue(""));     // Debería mostrar: { text: '', number: 0, boolean: false }
console.log(convertValue(null));   // Debería mostrar: { text: 'null', number: 0, boolean: false }
console.log(convertValue("abc"));  // Debería mostrar: { text: 'abc', number: NaN, boolean: true }

// 9. Métodos y prototipos
console.log("\nEjercicio 9: Métodos y prototipos");
// Escribe una función llamada 'hasMethod' que tome un valor ('value') y el
// nombre de un método ('methodName', en un string) y devuelva true si ese
// valor tiene ese método. Debe funcionar también con primitivos y no fallar
// con null o undefined.

const hasMethod = (value, methodName) =>
    value != null && typeof value[methodName] === "function";

console.log(hasMethod([], "map"));            // Debería mostrar: true
console.log(hasMethod("abc", "toUpperCase")); // Debería mostrar: true
console.log(hasMethod(5, "toFixed"));         // Debería mostrar: true
console.log(hasMethod({}, "map"));            // Debería mostrar: false
console.log(hasMethod(null, "map"));          // Debería mostrar: false

// 10. (Reto) Contar los valores por tipo
console.log("\nEjercicio 10 (reto): Contar los valores por tipo");
// Escribe una función llamada 'countByType' que tome un array de valores
// ('values') y devuelva un objeto que indique cuántos valores hay de cada
// tipo real (el mismo criterio del ejercicio 4).

const countByType = (values) => {
    const counts = {};
    for (const v of values) {
    const type = getRealType(v);
    counts[type] = (counts[type] ?? 0) + 1;
    }
    return counts;
};

console.log(countByType([1, 2, "a", null, [], [], {}]));
// Debería mostrar: { number: 2, string: 1, null: 1, array: 2, object: 1 }