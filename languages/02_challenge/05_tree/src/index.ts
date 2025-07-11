interface Tree<T> {
    value: T;
    children?: Tree<T>[];
}

const categoryTree: Tree<string> = {
    value: "Tienda",
    children: [
        { value: "Electrónica", children: [{ value: "Teléfonos" }, { value: "Laptops" }] },
        { value: "Hogar", children: [{ value: "Muebles" }, { value: "Decoración" }] },
    ],
};

const printTree = <T>(node: Tree<T>, depth: number = 0): void => {
    console.log(`${"  ".repeat(depth)}- ${node.value}`);
    node.children?.forEach((child) => printTree(child, depth + 1));
}

printTree(categoryTree);
