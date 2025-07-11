const memoize = (fn) => {
    let cache;
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
// console.log(memoized());
// console.log(memoized());
// console.log(memoized());
const memoizeRefactor = (fn) => { let cache; let hasBeenCalled = false; return () => hasBeenCalled ? cache : (hasBeenCalled = true, cache = fn()); };
const memoizedRefactor = memoizeRefactor(expensiveFunction);
// console.log(memoizedRefactor());
// console.log(memoizedRefactor());
// console.log(memoizedRefactor());
const cacheFunction = (fn) => {
    const cache = {}; // Objeto para almacenar los resultados según los argumentos
    return (...args) => {
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
const repeatText = (repetitions, text) => (count++, `${text} `.repeat(repetitions).trim());
const memoizedGreet = cacheFunction(repeatText);
console.log(memoizedGreet(1, "pam"));
console.log(memoizedGreet(3, "chun"));
console.log(memoizedGreet(1, "pam"));
console.log(memoizedGreet(3, "chun"));
console.log(count);
