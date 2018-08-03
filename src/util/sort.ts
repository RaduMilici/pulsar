import { cloneObjectArray } from './clone';

const sort = (array: any[], prop: string) => {
  return array.sort((a: any, b: any) => a[prop] - b[prop]);
};

const immutableObjectSort = (array: any[], prop: string) => {
  const clone: any[] = cloneObjectArray(array);
  return sort(clone, prop);
};

export { sort, immutableObjectSort };
