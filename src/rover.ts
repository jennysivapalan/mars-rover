import { Plateau } from "../src/plateau";

const FacingDirectionString = ["N", "E", "S", "W"] as const;
type FacingDirection = (typeof FacingDirectionString)[number];
export type Rover = { x: number; y: number; facingDirection: FacingDirection };

type Rotation = {
  start: FacingDirection;
  end: FacingDirection;
};
const ROTATE_LEFT: Rotation[] = [
  { start: "N", end: "W" },
  { start: "W", end: "S" },
  { start: "S", end: "E" },
  { start: "E", end: "N" },
];

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

export function move(rover: Rover, moves: string) {
  if (moves === "M") {
    rover.y = rover.y + 1;
  }
  if (moves === "L") {
    const newPosition = ROTATE_LEFT.find(
      (position) => position.start === rover.facingDirection
    );
    newPosition
      ? (rover.facingDirection = newPosition.end)
      : rover.facingDirection;
  }
  return rover;
}
