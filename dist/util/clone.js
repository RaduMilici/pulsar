const cloneObject = (object) => (Object.assign({}, object));
const cloneObjectArray = (array) => array.map(cloneObject);
export { cloneObject, cloneObjectArray };
//# sourceMappingURL=clone.js.map