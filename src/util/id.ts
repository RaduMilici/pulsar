import id from '../interfaces/id';

const contains = (array: id[], element: id): boolean => {
  return findIndex(array, element) !== -1;
};

const findIndex = (array: id[], find: id): number => {
  return array.findIndex((element: id) => element.id === find.id);
};

export { contains, findIndex };
