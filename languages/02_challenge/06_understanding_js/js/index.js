// Question 1

const x = NaN;

console.log(x === x);

// Question 2

const isNaNValue = v => Number.isNaN(v);

console.log(isNaNValue(NaN)); // true

// Question 3
console.log(!isNaNValue(x) && x !== x);
/*
No, no existe ninguna forma de que el código dé true, porque estamos preguntando si al mismo tiempo el número es válido y si no es igual a sí mismo. Los únicos valores que no son iguales a sí mismos en JavaScript son los NaN.
*/

// Question 4

const y = Infinity;

console.log(y + 1 === y - 1);

/*
El único valor capaz de devolver true sería Infinity o -Infinity, ya que sumar o restar algo a infinito no lo cambia.
*/

// Question 5

const z = {
    value: 2,
    valueOf: function () {
        this.value--;
        return this.value + 1;
    }
}


console.log(z > z);