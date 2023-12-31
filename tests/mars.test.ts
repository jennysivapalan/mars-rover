import { start } from "../src/mars";

describe("test creating plateau with one rover moving around", () => {
  it("should create a plateau for mars based on input string", () => {
    const input = ["5 5", "1 2 N", "M"];
    const mars = start(input);

    expect(mars.plateau.width).toBe(5);
    expect(mars.plateau.width).toBe(5);
  });

  it("should error if first line is incorrect ", () => {
    expect(() => {
      start(["5", "1 2 N"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");

    expect(() => {
      start(["5 2 N", "1 2 N"]);
    }).toThrow("Can't create plateau, invalid first line");

    expect(() => {
      start(["", "1 2 N"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");

    expect(() => {
      start(["ABC ABC", "1 2 N"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");

    expect(() => {
      start(["-5 4.3", "1 2 N"]);
    }).toThrow("Can't create plateau - Error: Invalid parameters, try again");
  });

  it("should create first rover for mars based on input string", () => {
    const input = ["5 5", "1 2 N", "M"];
    const mars = start(input);
    expect(mars.plateau.rovers.length).toBe(1);
    const rover = mars.plateau.rovers[0];
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(3); //as M moves the rover up one
    expect(rover.facingDirection).toBe("N");
  });

  it("should error if the second line is incorrect ", () => {
    expect(() => {
      start(["5 5", "1"]);
    }).toThrow("Can't create rover, invalid line: 1");

    expect(() => {
      start(["5 2", "1 2 N 4 "]);
    }).toThrow("Can't create rover, invalid line: 1 2 N 4 ");

    expect(() => {
      start(["5 2", ""]);
    }).toThrow("Can't create rover, invalid line:");

    expect(() => {
      start(["5 2", " "]);
    }).toThrow("Can't create rover, invalid line: ");

    expect(() => {
      start(["5 2", "A 1 N"]);
    }).toThrow(
      "Can't create rover - Error: Invalid rover parameters, try again"
    );

    expect(() => {
      start(["5 2", "1 B N"]);
    }).toThrow(
      "Can't create rover - Error: Invalid rover parameters, try again"
    );

    expect(() => {
      start(["5 2", "1.1 2 N"]);
    }).toThrow(
      "Can't create rover - Error: Invalid rover parameters, try again"
    );

    expect(() => {
      start(["5 2", "1 2 F"]);
    }).toThrow("Can't create rover, invalid line: 1 2 F");
  });

  it("should move first rover for mars based on single input string for line 3", () => {
    const input = ["5 5", "1 2 N", "M"];
    const mars = start(input);
    const rover = mars.plateau.rovers[0];
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(3);
    expect(rover.facingDirection).toBe("N");
  });

  it("should move first rover for mars based on a couple of commands for line 3 string", () => {
    const input = ["5 5", "3 3 N", "MLMMRR"];
    const mars = start(input);
    const rover = mars.plateau.rovers[0];

    expect(rover.x).toBe(1);
    expect(rover.y).toBe(4);
    expect(rover.facingDirection).toBe("E");
  });

  it("should keep rover as is if third line is empty", () => {
    expect(() => {
      start(["5 5", "3 3 N", ""]);
    }).toThrow("Invalid move supplied");
  });
  it("should throw error if third line is empty with space", () => {
    expect(() => {
      start(["5 5", "3 3 N", " "]);
    }).toThrow("Invalid move supplied");
  });

  it("should throw error if third line contains an invalid moves", () => {
    const input = ["5 5", "3 3 N", "A"];
    expect(() => {
      start(["5 5", "3 3 N", "A"]);
    }).toThrow("Invalid move supplied");
  });
});

describe("test multiple rovers on mars", () => {
  it("should parse input for more than one rover for input string", () => {
    const input = ["5 5", "3 3 N", "M", "1 1 S", "L"];
    const mars = start(input);
    const rovers = mars.plateau.rovers;
    expect(rovers.length).toBe(2);

    expect(rovers[0].x).toBe(3);
    expect(rovers[0].y).toBe(4);
    expect(rovers[0].facingDirection).toBe("N");

    expect(rovers[1].x).toBe(1);
    expect(rovers[1].y).toBe(1);
    expect(rovers[1].facingDirection).toBe("E");
  });
  it("should stop if a line item is wrong", () => {
    const input = ["5 5", "3 3 N", "M", "1 1 G", "L"];

    expect(() => {
      start(input);
    }).toThrow("Can't create rover, invalid line: 1 1 G");
  });

  it("should stop program if rovers collide", () => {
    const input = ["2 2", "1 1 E", "M", "2 2 S", "M"];
    expect(() => {
      start(input);
    }).toThrow(
      "A rover is already place here so this rover cannot be placed here"
    );
  });
});
