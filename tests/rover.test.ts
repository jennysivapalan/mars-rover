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
    move(rover, "M");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(3);
    expect(rover.facingDirection).toBe("N");
  });

  it("should move a rover multiple forward", () => {
    const plateau = createSpace(10, 10);
    const rover = createRover(plateau, 1, 2, "E");
    move(rover, "M");
    move(rover, "M");
    move(rover, "M");

    expect(rover.x).toBe(4);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("E");
  });

  it("should rotate a rover to the left", () => {
    const plateau = createSpace(5, 5);
    const rover = createRover(plateau, 1, 2, "N");

    move(rover, "L");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("W");

    move(rover, "L");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("S");

    move(rover, "L");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("E");

    move(rover, "L");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("N");
  });

  it("should rotate a rover to the right", () => {
    const plateau = createSpace(5, 5);
    const rover = createRover(plateau, 1, 2, "N");

    move(rover, "R");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("E");

    move(rover, "R");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("S");

    move(rover, "R");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("W");

    move(rover, "R");
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("N");
  });

  it("should rotate a rover and move forward", () => {
    const plateau = createSpace(5, 5);
    const rover = createRover(plateau, 1, 2, "N");

    move(rover, "R");
    move(rover, "M");
    move(rover, "M");
    move(rover, "M");
    move(rover, "R");
    move(rover, "M");
    move(rover, "L");
    expect(rover.x).toBe(4);
    expect(rover.y).toBe(1);
    expect(rover.facingDirection).toBe("E");
  });

  it("should not move outside of the plateau (checking top boundary)", () => {
    const plateau = createSpace(2, 2);
    const rover = createRover(plateau, 1, 2, "N");

    expect(() => {
      move(rover, "M");
    }).toThrow(Error);

    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("N");
  });

  it("should not move outside of the plateau (checking bottom boundary)", () => {
    const plateau = createSpace(2, 2);
    const rover = createRover(plateau, 1, 0, "S");

    expect(() => {
      move(rover, "M");
    }).toThrow(Error);

    expect(rover.x).toBe(1);
    expect(rover.y).toBe(0);
    expect(rover.facingDirection).toBe("S");
  });

  it("should not move outside of the plateau (checking left boundary)", () => {
    const plateau = createSpace(2, 2);
    const rover = createRover(plateau, 0, 2, "W");

    expect(() => {
      move(rover, "M");
    }).toThrow(Error);

    expect(rover.x).toBe(0);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("W");
  });

  it("should not move outside of the plateau (checking right boundary)", () => {
    const plateau = createSpace(2, 2);
    const rover = createRover(plateau, 2, 2, "E");

    expect(() => {
      move(rover, "M");
    }).toThrow(Error);

    expect(rover.x).toBe(2);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("E");
  });

  it("should stop moving forward and taking on instructions if it hits a boundary", () => {
    const plateau = createSpace(3, 2);
    const rover = createRover(plateau, 1, 1, "N");

    move(rover, "M");
    move(rover, "R");
    move(rover, "M");
    expect(rover.x).toBe(2);
    expect(rover.y).toBe(2);
    expect(rover.hasStopped).toBe(false);
    move(rover, "L");

    expect(() => {
      move(rover, "M");
    }).toThrow("Rover has hit the boundary so stopping here");

    expect(rover.hasStopped).toBe(true);

    expect(() => {
      move(rover, "M");
    }).toThrow("Rover has stopped it hit a boundary");

    expect(() => {
      move(rover, "L");
    }).toThrow("Rover has stopped it hit a boundary");

    expect(() => {
      move(rover, "R");
    }).toThrow("Rover has stopped it hit a boundary");
  });
});
