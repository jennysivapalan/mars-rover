import { createSpace, addRover } from "../../src/plateau/plateau";
import { createRover, move } from "../../src/rover/rover";

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
    expect(plateau.rovers).toEqual([]);

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
    }).toThrow("Rover has stopped and cannot move any further");

    expect(() => {
      move(rover, "L");
    }).toThrow("Rover has stopped and cannot move any further");

    expect(() => {
      move(rover, "R");
    }).toThrow("Rover has stopped and cannot move any further");
  });
});

describe("test multiple rovers on a plateau (placement)", () => {
  it("should allow for more than one rover to be on a plateau", () => {
    const plateau = createSpace(5, 5);
    expect(plateau.rovers.length).toBe(0);

    const rover = createRover(plateau, 1, 2, "N");
    addRover(plateau, rover);

    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("N");

    const rover2 = createRover(plateau, 3, 2, "W");
    expect(rover2.x).toBe(3);
    expect(rover2.y).toBe(2);
    expect(rover2.facingDirection).toBe("W");

    addRover(plateau, rover2);
    expect(plateau.rovers.length).toBe(2);
  });

  it("should allow not allow a rover to be place on plateau where another rover is", () => {
    const plateau = createSpace(5, 5);
    expect(plateau.rovers.length).toBe(0);

    const rover = createRover(plateau, 1, 2, "N");
    addRover(plateau, rover);

    expect(rover.x).toBe(1);
    expect(rover.y).toBe(2);
    expect(rover.facingDirection).toBe("N");
    expect(plateau.rovers.length).toBe(1);

    expect(plateau.rovers[0].x).toBe(1);

    expect(() => {
      createRover(plateau, 1, 2, "W");
    }).toThrow(
      "A rover is already place here so this rover cannot be placed here"
    );
    expect(plateau.rovers.length).toBe(1);
  });
});

describe("test multiple rovers on a plateau (movement)", () => {
  it("should allow multiple rovers to move around", () => {
    const plateau = createSpace(5, 5);
    const rover = createRover(plateau, 1, 2, "N");
    addRover(plateau, rover);
    const rover2 = createRover(plateau, 3, 3, "E");
    addRover(plateau, rover2);

    move(rover, "L");
    move(rover, "M");
    move(rover, "L");
    move(rover, "M");
    move(rover, "L");
    move(rover, "M");
    move(rover, "L");
    move(rover, "M");
    move(rover, "M");

    move(rover2, "M");
    move(rover2, "M");
    move(rover2, "R");
    move(rover2, "M");
    move(rover2, "M");
    move(rover2, "R");
    move(rover2, "M");
    move(rover2, "R");
    move(rover2, "R");
    move(rover2, "M");

    expect(rover.x).toBe(1);
    expect(rover.y).toBe(3);
    expect(rover.facingDirection).toBe("N");

    expect(rover2.x).toBe(5);
    expect(rover2.y).toBe(1);
    expect(rover2.facingDirection).toBe("E");
  });

  it("should stop a rover moving if another rover is occupying the space", () => {
    const plateau = createSpace(2, 2);
    const rover = createRover(plateau, 1, 2, "E");
    addRover(plateau, rover);
    const rover2 = createRover(plateau, 2, 1, "N");
    addRover(plateau, rover2);

    move(rover, "M");
    expect(rover.x).toBe(2);
    expect(rover.y).toBe(2);

    expect(() => {
      move(rover2, "M");
    }).toThrow(
      "A rover is already place here so this rover cannot be placed here"
    );
    expect(rover2.x).toBe(2);
    expect(rover2.y).toBe(1);
  });
});
