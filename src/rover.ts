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
  )
    return {
      x: x,
      y: y,
      facingDirection: facingDirection,
      plateau: plateau,
      hasStopped: false,
    };
  else throw new Error("Invalid rover parameters, try again");
}

export function move(rover: Rover, move: Move) {
  const BOUNDARY_ERROR_MSG = "Rover has hit the boundary so stopping here";

  if (rover.hasStopped) throw new Error("Rover has stopped it hit a boundary");

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
  } else rover.y = newY;
  return rover;
}

function moveLeftOrRight(gridMove: GridMove, rover: Rover) {
  const newX = rover.x + gridMove;
  if (newX < 0 || newX > rover.plateau.width) {
    rover.hasStopped = true;
    throw new Error(BOUNDARY_ERROR_MSG);
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
