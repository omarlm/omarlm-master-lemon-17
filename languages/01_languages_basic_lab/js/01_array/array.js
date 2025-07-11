export const head = (array) => {
    const [first] = array;
    return first;
};

export const tail = (array) => {
    const [, ...rest] = array;
    return rest;
};

export const init = (array) => {
    return array.slice(0, -1);
};

export const last = (array) => {
    return array.at(-1);
};