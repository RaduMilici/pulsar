import id from '../interfaces/id';

const contains = (array: id[], element: id): boolean => {
  return findIndex(array, element) !== -1;
};

const findIndex = (array: id[], find: id): number => {
  return array.findIndex((element: id) => element.id === find.id);
};

const removeFromArray = (array: id[], find: id): boolean => {
  const index: number = findIndex(array, find);
  return removeFromArrayAtIndex(array, index);
};

const removeFromArrayAtIndex = (array: id[], index: number): boolean => {
  if (index >= 0 && index < array.length) {
    array.splice(index, 1);
    return true;
  }

  return false;
};

export { contains, findIndex, removeFromArray, removeFromArrayAtIndex };
