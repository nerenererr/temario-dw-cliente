// Ejercicios Tema2.5: Arrays en JavaScript

// 1. Acceder a los elementos
console.log("Ejercicio 1: Acceder a los elementos");
// Escribe una función llamada 'getEdges' que tome un array ('items') y
// devuelva un nuevo array con su primer y su último elemento, en ese orden.
// Para el primero usa el índice 0 y para el último el método 'at' con un
// índice negativo.


const getEdges = (items) => [items[0], items.at(-1)];

console.log(getEdges([10, 20, 30, 40])); // Debería mostrar: [ 10, 40 ]
console.log(getEdges(["a"]));            // Debería mostrar: [ 'a', 'a' ]

// 2. Añadir y quitar (push, shift)
console.log("\nEjercicio 2: Añadir y quitar (push, shift)");
// Escribe una función llamada 'rotateLeft' que tome un array ('items') y
// mueva su primer elemento al final (usando 'shift' y 'push'). La función
// debe MODIFICAR el array recibido y devolverlo.

const rotateLeft = (items) => (items.push(items.shift()), items);

const queue = [1, 2, 3, 4];
console.log(rotateLeft(queue)); // Debería mostrar: [ 2, 3, 4, 1 ]
console.log(queue);             // Debería mostrar: [ 2, 3, 4, 1 ] (el original SÍ cambia)

// 3. Insertar con splice
console.log("\nEjercicio 3: Insertar con splice");
// Escribe una función llamada 'insertAfter' que tome tres parámetros, un
// array ('items'), un valor a buscar ('target') y un valor nuevo ('newItem'),
// e inserte 'newItem' justo DESPUÉS de 'target' (usando 'indexOf' y 'splice').
// Si 'target' no está en el array, no debe modificarse. Devuelve el array.

const insertAfter = (items, target, newItem) => {
    const index = items.indexOf(target);
    if (index !== -1) items.splice(index + 1, 0, newItem);
    return items;
}

console.log(insertAfter(["a", "b", "d"], "b", "c")); // Debería mostrar: [ 'a', 'b', 'c', 'd' ]
console.log(insertAfter(["a", "b"], "z", "c"));      // Debería mostrar: [ 'a', 'b' ]

// 4. Extraer con slice
console.log("\nEjercicio 4: Extraer con slice");
// Escribe una función llamada 'getPage' que tome tres parámetros, un array
// ('items'), el número de página ('page', empieza en 1) y el tamaño de página
// ('pageSize'), y devuelva un nuevo array con los elementos de esa página
// (usando 'slice'). El array original no debe modificarse.

const getPage = (items, page, pageSize) => {items.slice((page - 1) * pageSize, page * pageSize);}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(getPage(numbers, 2, 3)); // Debería mostrar: [ 4, 5, 6 ]
console.log(getPage(numbers, 4, 3)); // Debería mostrar: [ 10 ]
console.log(getPage(numbers, 5, 3)); // Debería mostrar: []

// 5. Buscar con find
console.log("\nEjercicio 5: Buscar con find");
// Escribe una función llamada 'findFirstAdult' que tome un array de objetos
// persona ('people', cada uno con 'name' y 'age') y devuelva la PRIMERA
// persona con 18 años o más. Si no hay ninguna, debe devolver null
// (recuerda que 'find' devuelve undefined cuando no encuentra nada).

const findFirstAdult = (people) => people.find((person) => person.age >= 18) ?? null;

const people = [
    { name: "Ana", age: 15 },
    { name: "Luis", age: 19 },
    { name: "Eva", age: 30 }
];

console.log(findFirstAdult(people));                        // Debería mostrar: { name: 'Luis', age: 19 }
console.log(findFirstAdult([{ name: "Leo", age: 10 }]));    // Debería mostrar: null

// 6. Ordenar números sin modificar el original
console.log("\nEjercicio 6: Ordenar números sin modificar el original");
// Escribe una función llamada 'sortNumbers' que tome un array de números
// ('numbers') y un booleano ('descending'), y devuelva un NUEVO array
// ordenado numéricamente (de menor a mayor, o de mayor a menor si
// 'descending' es true). El array original no debe modificarse
// (usa 'toSorted' o copia el array antes con spread).

const sortNumbers = (numbers, descending) 

const original = [40, 100, 1, 5, 25, 10];
console.log(sortNumbers(original, false)); // Debería mostrar: [ 1, 5, 10, 25, 40, 100 ]
console.log(sortNumbers(original, true));  // Debería mostrar: [ 100, 40, 25, 10, 5, 1 ]
console.log(original);                     // Debería mostrar: [ 40, 100, 1, 5, 25, 10 ]

// 7. Encadenar filter y map
console.log("\nEjercicio 7: Encadenar filter y map");
// Escribe una función llamada 'getPassedNames' que tome un array de objetos
// alumno ('students', cada uno con 'name' y 'grade') y devuelva un array
// con los nombres de los alumnos con nota mayor o igual a 5.
// Encadena 'filter' y 'map'.

// Tu código aquí

const students = [
    { name: "Ana", grade: 4 },
    { name: "Luis", grade: 8 },
    { name: "Eva", grade: 9 }
];

console.log(getPassedNames(students)); // Debería mostrar: [ 'Luis', 'Eva' ]

// 8. Acumular con reduce
console.log("\nEjercicio 8: Acumular con reduce");
// Escribe una función llamada 'getCartTotal' que tome un array de objetos
// producto ('cart', cada uno con 'price' y 'quantity') y devuelva el importe
// total (suma de price * quantity de cada producto).
// Utiliza 'reduce' con valor inicial 0.

// Tu código aquí

const cart = [
    { name: "Teclado", price: 25, quantity: 2 },
    { name: "Ratón", price: 15, quantity: 1 }
];

console.log(getCartTotal(cart)); // Debería mostrar: 65
console.log(getCartTotal([]));   // Debería mostrar: 0

// 9. Comprobar condiciones con some y every
console.log("\nEjercicio 9: Comprobar condiciones con some y every");
// Escribe una función llamada 'checkGrades' que tome un array de notas
// ('grades') y devuelva un objeto con dos propiedades booleanas:
// - 'hasFailed': true si ALGUNA nota es menor que 5 (usa 'some')
// - 'allPassed': true si TODAS las notas son 5 o más (usa 'every')

// Tu código aquí

console.log(checkGrades([7, 4, 9])); // Debería mostrar: { hasFailed: true, allPassed: false }
console.log(checkGrades([6, 8]));    // Debería mostrar: { hasFailed: false, allPassed: true }

// 10. (Reto) Aplanar, quitar duplicados y ordenar
console.log("\nEjercicio 10 (reto): Aplanar, quitar duplicados y ordenar");
// Escribe una función llamada 'flattenUnique' que tome un array de arrays
// de números ('nested', con posibles niveles de anidamiento) y devuelva un
// array plano, sin números repetidos y ordenado de menor a mayor.
// Pistas: 'flat(Infinity)', 'filter' con 'indexOf' para quedarte solo con la
// primera aparición de cada número, y 'sort' con función de comparación.

// Tu código aquí

console.log(flattenUnique([[3, 1], [2, 3], [[1], [5]]])); // Debería mostrar: [ 1, 2, 3, 5 ]
console.log(flattenUnique([]));                           // Debería mostrar: []