import { head, tail, init, last } from './01_array/array.js';
import { spreadConcat, restConcat } from './02_concat/concat.js';
import { clone, merge } from './03_clone/clone.js';
import { isBookRead } from './04_books/books.js';
import { SlotMachine } from './05_slot_machine/slot.js';

const numbers = [10, 20, 30, 40];
const names = ["James", "Emma", "Oliver", "Sophia"];

const person = { name: "John", surname: "Doe", age: 30, };
const person1 = { name: "Emma", surname: "Doe", married: true, city: "Santa Cruz de Tenerife" };


const cloneObject = clone(person);
const mergeObject = merge(person, person1);

const books = [
    { title: "Harry Potter y la piedra filosofal", isRead: true },
    { title: "Canción de hielo y fuego", isRead: false },
    { title: "Devastación", isRead: true },
];

console.log(head(numbers));
console.log(tail(numbers));
console.log(init(numbers));
console.log(last(numbers));

console.log(spreadConcat(numbers, names));
console.log(restConcat(numbers, names));

console.log(person === cloneObject); // false, esto indica que el objeto lo está clonando correctamente ya que la referencia es diferente.
console.log(mergeObject);

console.log(isBookRead(books, "Devastación")); // true
console.log(isBookRead(books, "Canción de hielo y fuego")); // false
console.log(isBookRead(books, "Los Pilares de la Tierra")); // false

const machine1 = new SlotMachine();
machine1.play();
machine1.play();
machine1.play();

