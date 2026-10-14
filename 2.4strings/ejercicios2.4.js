// Ejercicios Tema2.4: Strings en JavaScript

// 1. Longitud de un string
console.log("Ejercicio 1: Longitud de un string");
// Escribe una función llamada 'getTextLength' que tome un string ('text')
// y devuelva su número de caracteres (propiedad 'length'). Ojo: los
// espacios también cuentan.

const getTextLength = (text) =>
    text.length;

console.log(getTextLength("Desarrollo de Aplicaciones Web")); // Debería mostrar: 30

// 2. Comillas dentro de comillas
console.log("\nEjercicio 2: Comillas dentro de comillas");
// Escribe una función llamada 'getQuotedPhrase' que, usando comillas dobles
// para delimitar el string, devuelva este texto exacto (las comillas de
// "Hola" forman parte del texto): Dijo "Hola" y se fue
// Pista: necesitas la barra invertida (\) delante de cada comilla doble interna.

function getQuotedPhrase() {
    return "Dijo \"Hola\" y se fue"
}

console.log(getQuotedPhrase()); // Debería mostrar: 'Dijo "Hola" y se fue'

// 3. Saltos de línea y tabuladores
console.log("\nEjercicio 3: Saltos de línea y tabuladores");
// Escribe una función llamada 'formatCourseInfo' que tome dos parámetros,
// 'module' y 'topic' (strings), y devuelva un texto de dos líneas, con un
// tabulador después de los dos puntos, con este formato exacto:
// "Módulo:\t<module>\nTema:\t<topic>"
// Usa caracteres de escape, no pulses la tecla Enter dentro del string.

const formatCourseInfo = (module, topic) => `Módulo:\t ${module} \nTema:\t ${topic}`

console.log(formatCourseInfo("DAW", "Strings"));
// Debería mostrar:
// Módulo:    DAW
// Tema:      Strings

// 4. Unir strings con concat()
console.log("\nEjercicio 4: Unir strings con concat()");
// Escribe una función llamada 'joinWords' que tome dos parámetros,
// 'firstWord' y 'secondWord' (strings), y devuelva, usando el método
// 'concat()' (sin el operador +), el texto "<firstWord> <secondWord>!".

const joinWords = (firstWord, secondWord) => firstWord.concat(" ", secondWord)

console.log(joinWords("Hello", "World")); // Debería mostrar: 'Hello World!'

// 5. Primitivos contra objetos String
console.log("\nEjercicio 5: Primitivos contra objetos String");
// Escribe una función llamada 'compareStringTypes' que, internamente,
// declare tres constantes:
// const a = "John";
// const b = new String("John");
// const c = new String("John");
// y devuelva un array con estas cuatro comparaciones, en este orden:
// [a == b, a === b, b == c, b === c]
// Añade un comentario explicando por qué dan esos valores.

function compareStringTypes() {
    const a = "John";
    const b = new String("John");
    const c = new String("John");
    return [a == b, a === b, b == c, b === c]
}

console.log(compareStringTypes()); // Debería mostrar: [ true, false, false, false ]

// 6. Interpolación de variables
console.log("\nEjercicio 6: Interpolación de variables");
// Escribe una función llamada 'introducePerson' que tome tres parámetros,
// 'firstName', 'lastName' (strings) y 'age' (number), y devuelva, usando
// una plantilla (backticks) con '${}', el texto:
// "Me llamo <firstName> <lastName> y tengo <age> años."

const introducePerson = (firstName, lastName, age) => `Me llamo ${firstName} ${lastName} y tengo ${age} años.` 

console.log(introducePerson("Lucía", "Martín", 19));
// Debería mostrar: 'Me llamo Lucía Martín y tengo 19 años.'

// 7. Expresiones dentro de la plantilla
console.log("\nEjercicio 7: Expresiones dentro de la plantilla");
// Escribe una función llamada 'formatTotalWithTax' que tome dos parámetros,
// 'price' (number) y 'vatRate' (number, por ejemplo 0.21 para un 21%), y
// calcule el total con IVA DENTRO de la propia plantilla, devolviendo un
// texto con el formato "Total: 96.80 €". El total debe llevar siempre dos
// decimales (usa toFixed).

const formatTotalWithTax = (price, vatRate) => `Total: ${(price * (1 + vatRate)).toFixed(2)} €` 

console.log(formatTotalWithTax(80, 0.21)); // Debería mostrar: 'Total: 96.80 €'

// 8. Strings de varias líneas
console.log("\nEjercicio 8: Strings de varias líneas");
// Se te da 'poem', un string de tres líneas escrito con backticks (usando
// Enter dentro de la plantilla, sin \n). Escribe una función llamada
// 'countLines' que tome un texto ('text') y devuelva cuántas líneas tiene.

const poem = `Primera línea
Segunda línea
Tercera línea`;



console.log(countLines(poem)); // Debería mostrar: 3

// 9. Generar HTML
console.log("\nEjercicio 9: Generar HTML");
// Escribe una función llamada 'buildHtmlList' que tome un array de strings
// ('subjects') y devuelva una lista HTML con un <li> por cada elemento,
// todo seguido y sin espacios ni saltos de línea.
// Usa plantillas y un bucle for...of.

// Tu código aquí

console.log(buildHtmlList(["HTML", "CSS", "JavaScript"]));
// Debería mostrar: '<ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>'

// 10. Los strings son inmutables
console.log("\nEjercicio 10: Los strings son inmutables");
// Escribe una función llamada 'getUppercase' que tome un string ('text') y
// devuelva ese texto en mayúsculas usando 'toUpperCase()'.
// Importante: toUpperCase() NO modifica el string original, devuelve uno
// nuevo; por eso hay que capturar el valor devuelto (con 'return').

// Tu código aquí

console.log(getUppercase("daw")); // Debería mostrar: 'DAW'

// 11. Acceder a un carácter
console.log("\nEjercicio 11: Acceder a un carácter");
// Escribe una función llamada 'getLetters' que tome un string ('word') y
// devuelva un array con tres letras: la primera (con charAt), la última
// (con at y un índice negativo) y la tercera (con corchetes).

// Tu código aquí

console.log(getLetters("JavaScript")); // Debería mostrar: [ 'J', 't', 'v' ]

// 12. Extraer con slice()
console.log("\nEjercicio 12: Extraer con slice()");
// Escribe una función llamada 'extractParts' que tome un string ('course')
// y devuelva un array con dos cosas: la palabra "Aplicaciones" (cuenta las
// posiciones, empiezan en 0) y la palabra "Web" (usando un índice negativo).

// Tu código aquí

console.log(extractParts("Desarrollo de Aplicaciones Web"));
// Debería mostrar: [ 'Aplicaciones', 'Web' ]

// 13. slice() contra substring()
console.log("\nEjercicio 13: slice() contra substring()");
// Escribe una función llamada 'compareSliceSubstring' que tome un string
// ('text') y devuelva un array con el resultado de 'text.slice(-4)' y
// 'text.substring(-4)', en ese orden.
// Antes de ejecutar, intenta adivinar los valores. Comenta por qué no dan
// lo mismo.

// Tu código aquí

console.log(compareSliceSubstring("Apple, Banana, Kiwi"));
// Debería mostrar: [ 'Kiwi', 'Apple, Banana, Kiwi' ]

// 14. Limpiar un email
console.log("\nEjercicio 14: Limpiar un email");
// Escribe una función llamada 'cleanEmail' que tome un string ('rawEmail')
// que llega con espacios sobrantes y mayúsculas, y devuelva el email sin
// espacios al principio ni al final y todo en minúsculas.

// Tu código aquí

console.log(cleanEmail("  Student.Name@Mail.COM  "));
// Debería mostrar: 'student.name@mail.com'

// 15. Rellenar con padStart()
console.log("\nEjercicio 15: Rellenar con padStart()");
// Escribe una función llamada 'formatId' que tome un número ('number') y
// devuelva el texto "ID-" seguido del número con ceros a la izquierda hasta
// tener 4 cifras. Recuerda que padStart es un método de string, no de
// número.

// Tu código aquí

console.log(formatId(7));    // Debería mostrar: 'ID-0007'
console.log(formatId(42));   // Debería mostrar: 'ID-0042'
console.log(formatId(1234)); // Debería mostrar: 'ID-1234'

// 16. Un título con marco
console.log("\nEjercicio 16: Un título con marco");
// Escribe una función llamada 'boxTitle' que tome un string ('title') y
// devuelva un texto de tres líneas con el título entre barras y una línea
// de signos "=" arriba y abajo. La línea de "=" debe medir lo mismo que la
// línea del título. Para "JS" sería:
// ======
// | JS |
// ======

// Tu código aquí

console.log(boxTitle("Strings"));
// Debería mostrar:
// ===========
// | Strings |
// ===========

// 17. replace() contra replaceAll()
console.log("\nEjercicio 17: replace() contra replaceAll()");
// Escribe una función llamada 'replaceCat' que tome un string ('text') y
// devuelva un array con tres versiones en las que "cat" se cambia por
// "gato":
// 1. con replace() normal
// 2. con replaceAll()
// 3. con replace() y una expresión regular que cambie todas las
//    coincidencias sin distinguir mayúsculas de minúsculas

// Tu código aquí

console.log(replaceCat("cat dog cat bird CAT"));
// Debería mostrar: [ 'gato dog cat bird CAT', 'gato dog gato bird CAT', 'gato dog gato bird gato' ]

// 18. Contar palabras e invertir su orden
console.log("\nEjercicio 18: Contar palabras e invertir su orden");
// Escribe una función llamada 'analyzeSentence' que tome un string
// ('sentence') y devuelva un objeto con dos propiedades: 'wordCount'
// (cuántas palabras tiene, con split) y 'reversed' (la misma frase con las
// palabras en orden inverso, con reverse() y join()).

// Tu código aquí

console.log(analyzeSentence("The quick brown fox jumps over the lazy dog"));
// Debería mostrar: { wordCount: 9, reversed: 'dog lazy the over jumps fox brown quick The' }

// 19. De CSV a array
console.log("\nEjercicio 19: De CSV a array");
// Escribe una función llamada 'csvToArray' que tome una línea de texto
// ('csvLine') separada por comas y la convierta en un array de strings.

// Tu código aquí

console.log(csvToArray("HTML,CSS,JS,SQL"));
// Debería mostrar: [ 'HTML', 'CSS', 'JS', 'SQL' ]

// 20. Palíndromos
console.log("\nEjercicio 20: Palíndromos");
// Escribe una función llamada 'isPalindrome' que tome un string ('text') y
// devuelva true si el texto se lee igual del derecho que del revés,
// ignorando espacios y mayúsculas/minúsculas. No hace falta tratar tildes
// ni signos de puntuación.

// Tu código aquí

console.log(isPalindrome("Anita lava la tina")); // Debería mostrar: true
console.log(isPalindrome("Atar a la rata"));      // Debería mostrar: true
console.log(isPalindrome("Hello"));               // Debería mostrar: false

// 21. (Reto) Poner cada palabra en mayúscula inicial
console.log("\nEjercicio 21 (reto): Poner cada palabra en mayúscula inicial");
// Escribe una función llamada 'capitalizeWords' que tome un string ('text')
// y devuelva el texto con la primera letra de cada palabra en mayúscula y
// el resto en minúscula.
// Por ejemplo: "the qUICK brown fox" -> "The Quick Brown Fox"
// Pista: split, map, charAt/slice y join.

// Tu código aquí

console.log(capitalizeWords("the qUICK brown fox"));
// Debería mostrar: 'The Quick Brown Fox'