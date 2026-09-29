// Ejercicios Tema 2.2 - Estructuras de control y repetición en JavaScript

// 1. if - else if - else
console.log("Ejercicio 1: if - else if - else");
// Escribe una función llamada 'getTicketPrice' que tome una edad ('age')
// y devuelva el precio de la entrada al museo:
// - 0 si tiene 4 años o menos
// - 5 si tiene entre 5 y 17 años
// - 10 si tiene entre 18 y 64 años
// - 6 si tiene 65 años o más

// Tu código aquí

function getTicketPrice(age) {
    if (age <= 4) {
        return `El precio es de 0€`;
    } else if (age >= 5 && age <= 17) {
        return `El precio es de 5€`;
    } else if (age >= 18 && age <= 64) {
        return `El precio es de 10€`;
    } else {
        return `El precio es de 6€`;
    }
}

console.log(getTicketPrice(3));  // Debería mostrar: 0
console.log(getTicketPrice(10)); // Debería mostrar: 5
console.log(getTicketPrice(30)); // Debería mostrar: 10
console.log(getTicketPrice(70)); // Debería mostrar: 6

// 2. switch
console.log("\nEjercicio 2: switch");
// Escribe una función llamada 'getDaysInMonth' que tome dos parámetros,
// 'month' (number del 1 al 12) e 'isLeapYear' (boolean), y devuelva los días
// que tiene ese mes:
// - 31 para los meses 1, 3, 5, 7, 8, 10 y 12
// - 30 para los meses 4, 6, 9 y 11
// - 29 para el mes 2 si es año bisiesto, 28 si no lo es
// - 'Mes inválido' para cualquier otro número
// Utiliza un 'switch' y agrupa los 'case' que comparten resultado.

// Tu código aquí
function getDaysInMonth(month, isLeapYear) {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:    
            return `31`;
        case 4:
        case 6:
        case 9:
        case 11:
            return `30`;
        case 2:
            if (isLeapYear === true) {
                return `29`;
            } else {
                return `28`;
            }
        default:
            return `Mes inválido`;
    }
}

console.log(getDaysInMonth(1, false));  // Debería mostrar: 31
console.log(getDaysInMonth(4, false));  // Debería mostrar: 30
console.log(getDaysInMonth(2, true));   // Debería mostrar: 29
console.log(getDaysInMonth(2, false));  // Debería mostrar: 28
console.log(getDaysInMonth(13, false)); // Debería mostrar: 'Mes inválido'

// 3. for
console.log("\nEjercicio 3: for");
// Escribe una función llamada 'sumUpTo' que tome un número entero positivo
// ('n') y devuelva la suma de todos los números desde 1 hasta 'n' (incluido).
// Utiliza un bucle 'for' y una variable 'let' para acumular el resultado.

// Tu código aquí
function sumUpTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(sumUpTo(5));  // Debería mostrar: 15
console.log(sumUpTo(10)); // Debería mostrar: 55

// 4. for con arrays
console.log("\nEjercicio 4: for con arrays");
// Escribe una función llamada 'findMax' que tome un array de números
// ('numbers') y devuelva el mayor de ellos. Recorre el array con un 'for'
// clásico (con índice) y NO uses Math.max.

// Tu código aquí
function findMax(numbers) {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

console.log(findMax([3, 9, 2, 7]));    // Debería mostrar: 9
console.log(findMax([-5, -2, -9]));    // Debería mostrar: -2

// 5. for...of
console.log("\nEjercicio 5: for...of");
// Escribe una función llamada 'countVowels' que tome un texto ('text') y
// devuelva cuántas vocales (a, e, i, o, u) contiene, sin distinguir entre
// mayúsculas y minúsculas. Recorre el texto con un 'for...of'.
// Pista: puedes usar 'text.toLowerCase()' y comprobar si "aeiou" incluye la letra
// con el método 'includes'.

// Tu código aquí
function countVowels(text) {
    const lowerText = text.toLowerCase();
    const vowels = "aeiou";
    let count = 0;

    for (const char of lowerText) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

console.log(countVowels("Hola mundo"));   // Debería mostrar: 4
console.log(countVowels("JavaScript"));   // Debería mostrar: 3
console.log(countVowels("PROGRAMACION")); // Debería mostrar: 5

// 6. for...in
console.log("\nEjercicio 6: for...in");
// Escribe una función llamada 'getTotalStock' que tome un objeto 'inventory'
// donde cada clave es el nombre de un producto y cada valor es su cantidad
// en stock, y devuelva la suma de todas las cantidades.
// Recorre el objeto con un 'for...in'.

// Tu código aquí
function getTotalStock(inventory) {
    let total = 0;
    for (const product in inventory) {
        total += inventory[product]; 
    }
    return total;
}

console.log(getTotalStock({ manzanas: 10, peras: 5, uvas: 8 })); // Debería mostrar: 23
console.log(getTotalStock({}));                                  // Debería mostrar: 0

// 7. while
console.log("\nEjercicio 7: while");
// Escribe una función llamada 'countDigits' que tome un número entero
// positivo o cero ('number') y devuelva cuántas cifras tiene.
// Utiliza un bucle 'while' dividiendo el número entre 10 (con Math.floor)
// hasta que llegue a 0. Ojo: el número 0 tiene 1 cifra.

// Tu código aquí
function countDigits(number) {
    if (number === 0) {
        return 1;
    }
    let count = 0;
    while (number > 0) {
        number = Math.floor(number/10); 
        count++;    
        
    }
    return count;
}

console.log(countDigits(12345)); // Debería mostrar: 5
console.log(countDigits(7));     // Debería mostrar: 1
console.log(countDigits(0));     // Debería mostrar: 1

// 8. break
console.log("\nEjercicio 8: break");
// Escribe una función llamada 'findFirstNegativeIndex' que tome un array de
// números ('numbers') y devuelva la posición (índice) del primer número
// negativo, o -1 si no hay ninguno.
// Utiliza un bucle y la sentencia 'break' para dejar de buscar en cuanto lo
// encuentres (guarda el resultado en una variable 'let').

// Tu código aquí
function findFirstNegativeIndex(numbers) {
    let negative = -1;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < 0) {
            negative = i;
            break;
        }
    }
    return negative;
}

console.log(findFirstNegativeIndex([4, 7, -2, 5, -9])); // Debería mostrar: 2
console.log(findFirstNegativeIndex([1, 2, 3]));         // Debería mostrar: -1

// 9. continue
console.log("\nEjercicio 9: continue");
// Escribe una función llamada 'sumOddNumbers' que tome un array de números
// enteros ('numbers') y devuelva la suma de los que son impares.
// Utiliza un bucle 'for...of' y la sentencia 'continue' para saltarte los
// números pares.

// Tu código aquí

console.log(sumOddNumbers([1, 2, 3, 4, 5])); // Debería mostrar: 9
console.log(sumOddNumbers([2, 4, 6]));       // Debería mostrar: 0

// 10. forEach
console.log("\nEjercicio 10: forEach");
// Escribe una función llamada 'doubleAll' que tome un array de números
// ('numbers') y devuelva un NUEVO array con cada número multiplicado por 2.
// Utiliza el método 'forEach' y 'push' sobre un array 'result' declarado
// con 'const'. El array original no debe modificarse.

// Tu código aquí

console.log(doubleAll([1, 2, 3])); // Debería mostrar: [ 2, 4, 6 ]
console.log(doubleAll([]));        // Debería mostrar: []