// Question 1

const memoize = <T>(fn: () => T): () => T => {
    let cache: T;
    let hasBeenCalled = false;

    return () => {
        if (!hasBeenCalled) {
            cache = fn();
            hasBeenCalled = true;
        }
        return cache;
    };
};

const expensiveFunction = () => {
    console.log("Una única llamada");
    return 3.1415;
};

const memoized = memoize(expensiveFunction);

console.log(memoized());
console.log(memoized());
console.log(memoized());

// Question 2

const memoizeRefactor = <T>(fn: () => T): () => T => { let cache: T; let hasBeenCalled = false; return () => hasBeenCalled ? cache : (hasBeenCalled = true, cache = fn()); };

const memoizedRefactor = memoizeRefactor(expensiveFunction);

console.log(memoizedRefactor());
console.log(memoizedRefactor());
console.log(memoizedRefactor());


// Question 3

const cacheFunction = <T, A extends (string | number | boolean)[]>(fn: (...args: A) => T): (...args: A) => T => {
    const cache: { [key: string]: T } = {}; // Objeto para almacenar los resultados según los argumentos

    return (...args: A) => {
        const key = JSON.stringify(args); // Convertimos los argumentos en una clave única

        if (key in cache) {
            return cache[key]; // Si ya está en el caché, devolvemos el resultado guardado
        }

        const result = fn(...args); // Calculamos el resultado
        cache[key] = result; // Guardamos el resultado en el caché con la clave generada
        return result;
    };
};

let count = 0;
const repeatText = (repetitions: number, text: string): string =>
    (count++, `${text} `.repeat(repetitions).trim())

const memoizedGreet = cacheFunction(repeatText);

console.log(memoizedGreet(1, "pam"));
console.log(memoizedGreet(3, "chun"));
console.log(memoizedGreet(1, "pam"));
console.log(memoizedGreet(3, "chun"));
console.log(count);

