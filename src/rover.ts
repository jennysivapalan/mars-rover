import { Plateau } from "../src/plateau";
import {
  FacingDirection,
  Rover,
  Move,
  ROTATE_LEFT,
  ROTATE_RIGHT,
  Rotation,
  GridMove,
} from "../src/rover.types";

const BOUNDARY_ERROR_MSG = "Rover has hit the boundary so stopping here";
const ROVER_IN_LOCATION_ERROR_MSG =
  "A rover is already place here so this rover cannot be placed here";

export function createRover(
  plateau: Plateau,
  x: number,
  y: number,
  facingDirection: FacingDirection
) {
  if (
    x >= 0 &&
    y >= 0 &&
    x <= plateau.width &&
    y <= plateau.height &&
    Number.isInteger(x) &&
    Number.isInteger(y)
  ) {
    if (isARoverInThisPosition(plateau, x, y))
      throw new Error(ROVER_IN_LOCATION_ERROR_MSG);

    return {
      x: x,
      y: y,
      facingDirection: facingDirection,
      plateau: plateau,
      hasStopped: false,
    };
  } else throw new Error("Invalid rover parameters, try again");
}

export function move(rover: Rover, move: Move) {
  if (rover.hasStopped)
    throw new Error("Rover has stopped and cannot move any further");

  if (move === "M") {
    const facingDirection = rover.facingDirection;
    switch (facingDirection) {
      case "N":
        moveUpOrDown(1, rover);
        break;
      case "S":
        moveUpOrDown(-1, rover);
        break;
      case "E":
        moveLeftOrRight(1, rover);
        break;
      case "W":
        moveLeftOrRight(-1, rover);
        break;
    }
  } else if (move === "L") {
    rotate(ROTATE_LEFT, rover);
  } else if (move === "R") {
    rotate(ROTATE_RIGHT, rover);
  }
  return rover;
}

function moveUpOrDown(gridMove: GridMove, rover: Rover) {
  const newY = rover.y + gridMove;
  if (newY < 0 || newY > rover.plateau.height) {
    rover.hasStopped = true;
    throw new Error(BOUNDARY_ERROR_MSG);
  } else if (isARoverInThisPosition(rover.plateau, rover.x, newY)) {
    rover.hasStopped = true;
    throw new Error(ROVER_IN_LOCATION_ERROR_MSG);
  } else rover.y = newY;
  return rover;
}

function moveLeftOrRight(gridMove: GridMove, rover: Rover) {
  const newX = rover.x + gridMove;
  if (newX < 0 || newX > rover.plateau.width) {
    rover.hasStopped = true;
    throw new Error(BOUNDARY_ERROR_MSG);
  } else if (isARoverInThisPosition(rover.plateau, newX, rover.y)) {
    rover.hasStopped = true;
    throw new Error(ROVER_IN_LOCATION_ERROR_MSG);
  } else rover.x = newX;
  return rover;
}

function rotate(rotationMap: Rotation[], rover: Rover) {
  const newPosition = rotationMap.find(
    (position) => position.start === rover.facingDirection
  );
  newPosition
    ? (rover.facingDirection = newPosition.end)
    : rover.facingDirection;
  return rover;
}

function isARoverInThisPosition(plateau: Plateau, x: number, y: number) {
  return plateau.rovers.find((rover) => rover.x === x && rover.y === y);
}
