// map -> devuelve un nuevo array siempre con el tamaño del original 
// habiendo actualizado los elementos

const numeros = [1, 2, 3, 4];

const dobles = numeros.map((n) => n * 2);
console.log(dobles);


const nombreFunction = (param1, param2) => {
    return resultado;
}

const sumar = (a, b) => {
    return a + b;
}

const sum = (a, b) => a + b;



// filter -> devuelve un nuevo array solo con los elementos que son true de la funcion

const numeros2 = [1, 2, 3, 4, 5, 6];
const pares = numeros2.filter((n) => n % 2 === 0);
console.log(pares);

const alumnas = [
    {nombre: "Carmen", nota: 7},
    {nombre: "Manuela", nota: 3},
    {nombre: "Paz", nota: 10},
];

const aprobadas = alumnas.filter((alumna) => alumna.nota >= 5);
console.log(aprobadas);

const aprobadasNombre = alumnas  // encadenar filtros
    .filter((alumna) => alumna.nota >= 5)
    .map((alumna) => alumna.nombre);
console.log(aprobadasNombre);



// metodos

Math.floor(4.7); //redondea arriba
Math.ceil(4.2); //redondea hacia abajo
Math.round(4.9); // redondea
Math.trunc(4.9); // trunca

Math.max(3, 7, 2);
Math.min(3, 7, 2);
Math.abs(-8);
Math.pow(2, 3);
Math.sqrt(16);
Math.random();