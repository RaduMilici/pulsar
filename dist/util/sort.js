import { cloneObjectArray } from './clone';
const sort = (array, prop) => {
    return array.sort((a, b) => a[prop] - b[prop]);
};
const immutableObjectSort = (array, prop) => {
    const clone = cloneObjectArray(array);
    return sort(clone, prop);
};
export { sort, immutableObjectSort };
//# sourceMappingURL=sort.js.map