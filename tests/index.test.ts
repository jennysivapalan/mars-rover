import { createMars, Mars } from "../src/index";

describe("test taking input commands to create mars rover", () => {
  it("should create a plateau for mars based on input string", () => {
    const input = ["5 5", "1 2 N"];
    const mars = createMars(input);

    expect(mars.plateau.width).toBe(5);
    expect(mars.plateau.width).toBe(5);
  });

  it("should error if first line is incorrect ", () => {
    expect(() => {
      createMars(["5", "1 2 N"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");

    expect(() => {
      createMars(["5 2 N", "1 2 N"]);
    }).toThrow("Can't create plateau, invalid first line");

    expect(() => {
      createMars(["", "1 2 N"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");

    expect(() => {
      createMars(["ABC ABC", "1 2 N"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");

    expect(() => {
      createMars(["-5 4.3", "1 2 N"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");
  });

  it("should create first rover for mars based on input string", () => {
    const input = ["5 5", "1 2 N"];
    const mars = createMars(input);

    expect(mars.rover.x).toBe(1);
    expect(mars.rover.y).toBe(2);
    expect(mars.rover.facingDirection).toBe("N");
  });

  it("should error if the second line is incorrect ", () => {
    expect(() => {
      createMars(["5 5", "1"]);
    }).toThrow("Can't create rover, invalid line: 1");

    expect(() => {
      createMars(["5 2", "1 2 N 4 "]);
    }).toThrow("Can't create rover, invalid line: 1 2 N 4 ");

    expect(() => {
      createMars(["5 2", ""]);
    }).toThrow("Can't create rover, invalid line:");

    expect(() => {
      createMars(["5 2", " "]);
    }).toThrow("Can't create rover, invalid line: ");

    expect(() => {
      createMars(["5 2", "A 1 N"]);
    }).toThrow(
      "Can't create rover - Error: Invalid rover parameters, try again"
    );

    expect(() => {
      createMars(["5 2", "1 B N"]);
    }).toThrow(
      "Can't create rover - Error: Invalid rover parameters, try again"
    );

    expect(() => {
      createMars(["5 2", "1.1 2 N"]);
    }).toThrow(
      "Can't create rover - Error: Invalid rover parameters, try again"
    );

    expect(() => {
      createMars(["5 2", "1 2 F"]);
    }).toThrow("Can't create rover, invalid line: 1 2 F");
  });
});
