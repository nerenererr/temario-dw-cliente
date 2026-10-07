// Ejercicios Tema2.3: Funciones en JavaScript

// 1. Función básica con return
console.log("Ejercicio 1: Función básica con return");
// Escribe una función llamada 'calculateArea' que tome dos parámetros,
// 'width' (number) y 'height' (number), y devuelva el área del rectángulo
// (width * height).

const calculateArea = (width, height) => width * height;

console.log(calculateArea(4, 5));  // Debería mostrar: 20
console.log(calculateArea(3, 3));  // Debería mostrar: 9

// 2. Parámetros por defecto
console.log("\nEjercicio 2: Parámetros por defecto");
// Escribe una función llamada 'greetUser' que tome un parámetro 'name'
// con valor por defecto "guest", y devuelva el texto "Hola, <name>".

const greetUser = (name = "guest") => `Hola, ${name}`;


console.log(greetUser("Marta")); // Debería mostrar: 'Hola, Marta'
console.log(greetUser());        // Debería mostrar: 'Hola, guest'

// 3. Paso por valor con primitivos
console.log("\nEjercicio 3: Paso por valor con primitivos");
// Escribe una función llamada 'tryToDouble' que tome un número ('number'),
// lo reasigne a su valor multiplicado por 2 dentro de la función, pero NO
// lo devuelva (sin 'return'). El objetivo es comprobar que la variable
// original fuera de la función no cambia.

const tryToDouble = (number) => number = number * 2;

let value = 10;
tryToDouble(value);
console.log(value); // Debería mostrar: 10 (no ha cambiado)

// 4. Paso por referencia con objetos
console.log("\nEjercicio 4: Paso por referencia con objetos");
// Escribe una función llamada 'markAsPaid' que tome un objeto 'order' y
// modifique su propiedad 'paid' poniéndola a true (sin devolver nada).
// Comprueba que, al tratarse de un objeto, el cambio SÍ afecta al original.



const order = { id: 1, paid: false };
const markAsPaid = (order) => order.paid = true;
markAsPaid(order);
console.log(order); // Debería mostrar: { id: 1, paid: true }

// 5. Función como argumento (callback)
console.log("\nEjercicio 5: Función como argumento (callback)");
// Escribe una función llamada 'applyOperation' que tome dos parámetros,
// un array de números ('numbers') y una función ('operation'), y devuelva
// un nuevo array con el resultado de aplicar 'operation' a cada número.
// Utiliza el método 'map'.

const applyOperation = (numbers, operation) => {
    return numbers.map(operation);
}

console.log(applyOperation([1, 2, 3], (n) => n * 2));  // Debería mostrar: [ 2, 4, 6 ]
console.log(applyOperation([1, 2, 3], (n) => n + 10)); // Debería mostrar: [ 11, 12, 13 ]

// 6. Función que devuelve otra función
console.log("\nEjercicio 6: Función que devuelve otra función");
// Escribe una función llamada 'createMultiplier' que tome un parámetro
// 'factor' (number) y devuelva OTRA función. Esa función devuelta debe
// tomar un número y devolverlo multiplicado por 'factor'.


// const double = createMultiplier(2);
// const triple = createMultiplier(3);
//console.log(double(5)); // Debería mostrar: 10
//console.log(triple(5)); // Debería mostrar: 15 

// 7. Función pura
console.log("\nEjercicio 7: Función pura");
// Escribe una función llamada 'addTax' que tome dos parámetros, 'price'
// (number) y 'taxRate' (number, por ejemplo 0.21 para un 21%), y devuelva
// el precio con el impuesto aplicado, SIN modificar ninguna variable externa
// (debe ser una función pura).



//console.log(addTax(100, 0.21)); // Debería mostrar: 121
//console.log(addTax(50, 0.1));   // Debería mostrar: 55

// 8. Encadenar funciones sobre un array
console.log("\nEjercicio 8: Encadenar funciones sobre un array");
// Escribe una función llamada 'getExpensiveProductNames' que tome un array
// de objetos producto ('products', cada uno con 'name' y 'price') y devuelva
// un array solo con los nombres ('name') de los productos cuyo precio sea
// mayor a 50. Encadena 'filter' y 'map'.

const getExpensiveProductNames = (products) => 
    products.filter(product => product.price > 50)
    .map(product => product.name)


const products = [
    { name: "Teclado", price: 25 },
    { name: "Monitor", price: 150 },
    { name: "Ratón", price: 15 },
    { name: "Silla", price: 80 }
];

//console.log(getExpensiveProductNames(products)); // Debería mostrar: [ 'Monitor', 'Silla' ]

// 9. Función como objeto (asignar a una variable)
console.log("\nEjercicio 9: Función como objeto");
// Escribe una función llamada 'sayGoodbye' que muestre por consola "Adiós".
// Después, asigna esa función (sin ejecutarla) a una nueva constante llamada
// 'farewell', y llama a 'farewell' en vez de a 'sayGoodbye'.

const sayGoodbye = () => {
    console.log("Adiós");
}

const farewell = sayGoodbye;

farewell(); // Debería mostrar: 'Adiós'

// 10. Librería propia
console.log("\nEjercicio 10: Librería propia");
// Simula una pequeña "librería" propia: escribe un objeto llamado 'mathUtils'
// con dos métodos:
// - 'isEven(number)': devuelve true si el número es par
// - 'average(numbers)': devuelve la media de un array de números
// (No hace falta usar 'export'/'import', basta con el objeto en este archivo).

const mathUtils = {
    isEven(number) {
        return number % 2 === 0;
    },

    average(numbers) {
        sum = 0.0;
        for (let number of numbers){
            sum += number;
        }
        return sum / numbers.length;
    }

}

console.log(mathUtils.isEven(4));           // Debería mostrar: true
console.log(mathUtils.isEven(7));           // Debería mostrar: false
console.log(mathUtils.average([2, 4, 6]));  // Debería mostrar: 4