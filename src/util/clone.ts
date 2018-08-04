const cloneObject = (object: any) => ({ ...object });

const cloneObjectArray = (array: any) => array.map(cloneObject);

export { cloneObject, cloneObjectArray };
