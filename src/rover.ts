import { Plateau } from "../src/plateau";
import {
  FacingDirection,
  Rover,
  Move,
  ROTATE_LEFT,
  ROTATE_RIGHT,
  Rotation,
} from "../src/rover.types";

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
    return { x: x, y: y, facingDirection: facingDirection, plateau: plateau };
  else throw new Error("Invalid rover parameters, try again");
}

export function move(rover: Rover, move: Move) {
  const BOUNDARY_ERROR_MSG = "Rover has hit the boundary so stopping here";
  if (move === "M") {
    const facingDirection = rover.facingDirection;
    switch (facingDirection) {
      case "N": {
        const newY = rover.y + 1;
        if (newY > rover.plateau.width) throw new Error(BOUNDARY_ERROR_MSG);
        else rover.y = newY;
        break;
      }
      case "S": {
        const newY = rover.y - 1;
        if (newY < 0) throw new Error(BOUNDARY_ERROR_MSG);
        else rover.y = newY;
        break;
      }
      case "E":
        rover.x = rover.x + 1;
        break;
      case "W":
        rover.x = rover.x - 1;
        break;
    }
    return rover;
  }
  if (move === "L") {
    rotate(ROTATE_LEFT, rover);
  } else if (move === "R") {
    rotate(ROTATE_RIGHT, rover);
  }
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
