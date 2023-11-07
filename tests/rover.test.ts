import { createSpace } from "../src/plateau";
import { createRover, move } from "../src/rover";

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

describe("test moveRover function", () => {
  it("should move a rover one position up", () => {
    const plateau = createSpace(5, 5);
    const rover = createRover(plateau, 1, 2, "N");
    const movedRover = move(rover, "M");
    expect(movedRover.x).toBe(1);
    expect(movedRover.y).toBe(3);
    expect(movedRover.facingDirection).toBe("N");
  });

  it("should move a rover multiple forward", () => {
    const plateau = createSpace(10, 10);
    const rover = createRover(plateau, 1, 2, "E");
    const movedRover1 = move(rover, "M");
    const movedRover2 = move(movedRover1, "M");
    const movedRover3 = move(movedRover2, "M");

    expect(movedRover3.x).toBe(4);
    expect(movedRover3.y).toBe(2);
    expect(movedRover3.facingDirection).toBe("E");
  });

  it("should rotate a rover to the left", () => {
    const plateau = createSpace(5, 5);
    const rover = createRover(plateau, 1, 2, "N");

    const movedRover1 = move(rover, "L");
    expect(movedRover1.x).toBe(1);
    expect(movedRover1.y).toBe(2);
    expect(movedRover1.facingDirection).toBe("W");

    const movedRover2 = move(rover, "L");
    expect(movedRover2.x).toBe(1);
    expect(movedRover2.y).toBe(2);
    expect(movedRover2.facingDirection).toBe("S");

    const movedRover3 = move(rover, "L");
    expect(movedRover3.x).toBe(1);
    expect(movedRover3.y).toBe(2);
    expect(movedRover3.facingDirection).toBe("E");

    const movedRover4 = move(rover, "L");
    expect(movedRover4.x).toBe(1);
    expect(movedRover4.y).toBe(2);
    expect(movedRover4.facingDirection).toBe("N");
  });

  it("should rotate a rover to the right", () => {
    const plateau = createSpace(5, 5);
    const rover = createRover(plateau, 1, 2, "N");

    const movedRover1 = move(rover, "R");
    expect(movedRover1.x).toBe(1);
    expect(movedRover1.y).toBe(2);
    expect(movedRover1.facingDirection).toBe("E");

    const movedRover2 = move(rover, "R");
    expect(movedRover2.x).toBe(1);
    expect(movedRover2.y).toBe(2);
    expect(movedRover2.facingDirection).toBe("S");

    const movedRover3 = move(rover, "R");
    expect(movedRover3.x).toBe(1);
    expect(movedRover3.y).toBe(2);
    expect(movedRover3.facingDirection).toBe("W");

    const movedRover4 = move(rover, "R");
    expect(movedRover4.x).toBe(1);
    expect(movedRover4.y).toBe(2);
    expect(movedRover4.facingDirection).toBe("N");
  });


 


});
