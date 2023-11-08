import { createMars, Mars } from "../src/index";

describe("test taking input commands to create mars rover", () => {
  it("should create a plateau for mars based on input string", () => {
    const input = ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];
    const mars = createMars(input);

    expect(mars.plateau.width).toBe(5);
    expect(mars.plateau.width).toBe(5);
  });

  it("should error if first line is incorrect ", () => {
    expect(() => {
      createMars(["5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");

    expect(() => {
      createMars(["5 2 N", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"]);
    }).toThrow("Can't create plateau, invalid first line");
  });
});
