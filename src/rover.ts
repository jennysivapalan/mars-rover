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
    return { x: x, y: y, facingDirection: facingDirection };
  else throw new Error("Invalid rover parameters, try again");
}

export function move(rover: Rover, move: Move) {
  if (move === "M") {
    rover.y = rover.y + 1;
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
