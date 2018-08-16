import { sort, immutableObjectSort } from "../../src/util";
import { v00, v01, v22 } from "../common/fixtures/Vectors";
import { Vector } from "../../src/common";

describe("util / sort", () => {
  it("should sort an array of objects by a property", () => {
    const unsorted: Vector[] = [v22, v00, v01];
    const correct: Vector[] = [v00, v01, v22];
    const sorted: Vector[] = sort(unsorted, 'y');

    expect(sorted).toEqual(correct);
    expect(sorted).toBe(unsorted);
  });

  it("should sort and clone an array of objects by a property ", () => {
    const unsorted: Vector[] = [v22, v00, v01];
    const correct: Vector[] = [v00, v01, v22];
    const sorted: Vector[] = immutableObjectSort(unsorted, 'y');

    expect(sorted).toEqual(correct);
    expect(sorted).not.toBe(unsorted);
  });
});