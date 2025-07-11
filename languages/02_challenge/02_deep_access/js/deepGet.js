export const deepGet = (current, ...keys) => {
    try {
        for (let key of keys) {
            if (
                current === undefined ||
                current === null ||
                typeof current !== 'object' ||
                !(key in current)
            ) {
                return undefined;
            }
            current = current[key];
        }
        return current;
    } catch (error) {
        console.error("Error in deepGet:", error.message);
        return undefined;
    }
}
