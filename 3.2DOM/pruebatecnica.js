// ej 2

const factorial = (a) => {
    if (a > 0) {
        let result = 1;
        for (let i = 1; i <= a; i++) {
            result *= i;
        }
        return result;
    } else {
        return 'Not valid'
    };
}

// ej 3

const moda = (array, numElementos) => {
    let count = 1;
    let maxCount = 1;
    
    for (let i = 1; i < numElementos; i++) {
        if (array[i] === array[i - 1]){
            count += 1;
        } else {
            if ()
        }
    }

}