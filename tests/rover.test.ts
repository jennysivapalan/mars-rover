import { createSpace } from "../src/plateau";
import { createRover } from "../src/rover";

describe("test placeRover function", () => {
  it("should return a rover that is in the grid", () => {
    const plateau = createSpace(5, 5);
    const rover = createRover(plateau, 1, 2, "N");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("N");
  });

  it("should return Error if invalid x and y co-ordinates are passed to the rover", () => {
    const plateau = createSpace(5, 5);

    expect(() => {
      createRover(plateau, 9, 2, "E");
    }).toThrow(Error);

    expect(() => {
      createRover(plateau, -5, -8, "S");
    }).toThrow("Invalid rover parameters, try again");

    expect(() => {
      createRover(plateau, 3.2, 2.4, "W");
    }).toThrow("Invalid rover parameters, try again");
  });
});
