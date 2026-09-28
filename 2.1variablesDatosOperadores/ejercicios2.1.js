// Ejercicios Tema 2.1 - Variables, Datos y Operadores en JavaScript

// 1. Declaración de variables y concatenación
console.log("Ejercicio 1: Declaración de variables y concatenación");
/* Escribe una función llamada 'introduceStudent' que tome dos parámetros,
'name' (string) y 'age' (number), y devuelva el texto:
"Me llamo <name> y tengo <age> años."
 Utiliza una plantilla literal (backticks) para construir el texto. */

let introduceStudent = (name, age) => {
    return `Me llamo ${name} y tengo ${age}`;
}

console.log(introduceStudent("Marta", 19)); // Debería mostrar: 'Me llamo Marta y tengo 19 años.'
console.log(introduceStudent("Iván", 22));  // Debería mostrar: 'Me llamo Iván y tengo 22 años.'

// 2. const vs let
console.log("\nEjercicio 2: const vs let");
/* Escribe una función llamada 'applyDiscount' que tome dos parámetros,
'price' (number) y 'percentage' (number), y devuelva el precio final
tras aplicar el descuento. Declara dentro de la función una constante
para el precio original ('originalPrice') y una variable 'let' ('finalPrice')
para ir calculando el resultado.
Fórmula: finalPrice = price - (price * percentage / 100) */

function applyDiscount(price, percentage) {
    const originalPrice = price;
    let finalPrice = originalPrice - (originalPrice * percentage / 100);
    return finalPrice;
}

console.log(applyDiscount(100, 20)); // Debería mostrar: 80
console.log(applyDiscount(50, 10));  // Debería mostrar: 45

// 3. Operadores aritméticos y módulo
console.log("\nEjercicio 3: Operadores aritméticos y módulo");
/* Escribe una función llamada 'shareCandies' que tome dos parámetros,
'candies' (number) y 'kids' (number), y devuelva un objeto con dos
propiedades: 'perKid' (caramelos que le tocan a cada niño/a, división entera
usando Math.floor) y 'leftover' (caramelos que sobran, con el operador %). */

function shareCandies(candies, kids) {
    return {
        perKid: Math.floor(candies / kids), // no let porque no creo variables
        leftOver: candies % kids
    };
}

console.log(shareCandies(17, 5)); // Debería mostrar: { perKid: 3, leftover: 2 }
console.log(shareCandies(20, 4)); // Debería mostrar: { perKid: 5, leftover: 0 }

// 4. Operadores de asignación
console.log("\nEjercicio 4: Operadores de asignación");
/* Escribe una función llamada 'calculateCart' que tome un array de precios
('prices', numbers) y devuelva el total sumando todos los precios.
Utiliza una variable 'let total' inicializada a 0 y el operador '+=' dentro
de un bucle para ir acumulando el resultado.  */

function calculateCart(prices) {
    let total = 0;
    prices.forEach(price => {
        total += price   // asi se suman los elementos de un array memoriza!!!
    });
    return total;
}

console.log(calculateCart([10, 20, 5]));    // Debería mostrar: 35
console.log(calculateCart([2.5, 3.5, 4]));  // Debería mostrar: 10

// 5. Precedencia de operadores
console.log("\nEjercicio 5: Precedencia de operadores");
/* Escribe una función llamada 'calculateWeightedAverage' que tome tres
parámetros, 'examGrade', 'practiceGrade' y 'attitudeGrade', y devuelva la
media ponderada aplicando estos pesos: examen 60%, práctica 30%, actitud 10%.
Usa paréntesis para dejar clara la precedencia de las operaciones. */


let calculateWeightedAverage = (examGrade, practiceGrade, attitudeGrade) => 
    (examGrade * 0.6) + (practiceGrade * 0.3) + (attitudeGrade * 0.1);

console.log(calculateWeightedAverage(8, 6, 10)); // Debería mostrar: 7.6
console.log(calculateWeightedAverage(5, 5, 5));  // Debería mostrar: 5

// 6. Ámbito de las variables (scope)
console.log("\nEjercicio 6: Ámbito de las variables");
/* Escribe una función llamada 'countPassingGrades' que tome un array de notas
('grades', numbers) y devuelva cuántas notas son mayores o iguales a 5.
Declara el contador ('counter') con 'let' FUERA del bucle (ámbito de
función) y una variable auxiliar ('grade') con 'const' DENTRO del bucle
(ámbito de bloque) para comprobar cada nota. */

function countPassingGrades (grades) {
    let counter = 0;
    grades.forEach(grade => {
        if (grade >= 5) {
            counter++;
        }
    });
    return counter;
}

console.log(countPassingGrades([4, 6, 8, 3, 5])); // Debería mostrar: 3
console.log(countPassingGrades([9, 9, 2]));       // Debería mostrar: 2

// 7. typeof y tipos primitivos
console.log("\nEjercicio 7: typeof y tipos primitivos");
/* Escribe una función llamada 'describeType' que tome un valor de cualquier
// tipo como parámetro ('value') y devuelva un string indicando su tipo con
// el operador 'typeof', con el formato: "Esto es de tipo: <tipo>" */

function describeType(value) {
    return `Esto es de tipo: ${typeof value}`;
}
    
console.log(describeType(42));       // Debería mostrar: 'Esto es de tipo: number'
console.log(describeType("hola"));   // Debería mostrar: 'Esto es de tipo: string'
console.log(describeType(true));     // Debería mostrar: 'Esto es de tipo: boolean'

// 8. null vs undefined
console.log("\nEjercicio 8: null vs undefined");
/* Escribe una función llamada 'checkUser' que tome un parámetro 'user'
y devuelva:
- 'Sin declarar' si el valor es undefined
- 'Sin usuario' si el valor es null
- 'Usuario: <user>' en cualquier otro caso */

function checkUser(user) {
    if (user === undefined) {
        return `Sin declarar`;
    } else if ( user === null) {
        return `Sin usuario`;
    } else {
        return `Usuario: ${user}`;
    }
}

console.log(checkUser(undefined));  // Debería mostrar: 'Sin declarar'
console.log(checkUser(null));       // Debería mostrar: 'Sin usuario'
console.log(checkUser("Laura"));    // Debería mostrar: 'Usuario: Laura'

// 9. Objetos
console.log("\nEjercicio 9: Objetos");
/* Escribe una función llamada 'createProduct' que tome tres parámetros,
'name' (string), 'price' (number) y 'stock' (number), y devuelva un
objeto con esas tres propiedades más una cuarta propiedad 'available'
(boolean) que sea true si stock es mayor que 0, y false en caso contrario. */

function createProduct(name, price, stock) {
    available: true;
    if (stock > 0) {
        available = true;
    } else
        available = false;
    return `${name}, ${price}, ${stock}, ${available}`;
}

console.log(createProduct("Teclado", 25, 3)); // Debería mostrar: { name: 'Teclado', price: 25, stock: 3, available: true }
console.log(createProduct("Ratón", 15, 0));   // Debería mostrar: { name: 'Ratón', price: 15, stock: 0, available: false }