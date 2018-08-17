const contains = (array, element) => {
    return findIndex(array, element) !== -1;
};
const findIndex = (array, find) => {
    return array.findIndex((element) => element.id === find.id);
};
const removeFromArray = (array, find) => {
    const index = findIndex(array, find);
    return removeFromArrayAtIndex(array, index);
};
const removeFromArrayAtIndex = (array, index) => {
    if (index >= 0 && index < array.length) {
        array.splice(index, 1);
        return true;
    }
    return false;
};
export { contains, findIndex, removeFromArray, removeFromArrayAtIndex };
//# sourceMappingURL=id.js.map