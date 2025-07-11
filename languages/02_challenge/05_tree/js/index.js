const categoryTree = {
    value: "Tienda",
    children: [
        { value: "Electrónica", children: [{ value: "Teléfonos" }, { value: "Laptops" }] },
        { value: "Hogar", children: [{ value: "Muebles" }, { value: "Decoración" }] },
    ],
};
const printTree = (node, depth = 0) => {
    var _a;
    console.log(`${"  ".repeat(depth)}- ${node.value}`);
    (_a = node.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => printTree(child, depth + 1));
};
printTree(categoryTree);
