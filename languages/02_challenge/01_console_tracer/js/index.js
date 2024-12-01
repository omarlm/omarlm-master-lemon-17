const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const showMessage = async ([time, message]) => {
    await delay(time);
    console.log(message);
};

const triggers = [
    async () => await showMessage([200, "third"]),
    async () => await showMessage([100, "second"]),
];

const run = async triggers => {
    await Promise.all(triggers.map(t => t()));
    console.log("first");
};

run(triggers);

// Ejercicio de refuerzo

const showData = async ([time, data]) => {
    await delay(time);
    console.log(data);
};

// Array de funciones asíncronas, cada una llama a showData con un retardo y un mensaje específico
const actions = [
    async () => await showData([3000, "alpha"]),   // Muestra el mensaje "alpha" después de 300 ms
    async () => await showData([1000, "beta"]),    // Muestra el mensaje "beta" después de 100 ms
    async () => await showData([2000, "gamma"]),   // Muestra el mensaje "gamma" después de 200 ms
];

const runData = async actions => {
    await Promise.all(actions.map(a => a()));
    console.log("delta");
};

runData(actions);
