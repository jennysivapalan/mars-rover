import { createSpace } from "../src/plateau";

describe("test createSpace function", () => {
  it("should return a grid of 5 by 5)", () => {
    const plateau = createSpace(5, 5);
    expect(plateau.width).toBe(5);
    expect(plateau.height).toBe(5);
  });

  it("should return Error if invalid parameters are passed)", () => {
    expect(() => {
      createSpace(-5, 5);
    }).toThrow(Error);
    expect(() => {
      createSpace(4, 5.5);
    }).toThrow("Invalid parameters, try again");
  });
});
