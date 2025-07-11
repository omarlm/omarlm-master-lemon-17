const sample = [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]];

const sampleFlatten = sample.flat(Infinity);

console.log(sample === sampleFlatten);
console.log(sampleFlatten);