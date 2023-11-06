import { Plateau } from "../src/plateau";

type FacingDirection = "N" | "E" | "S" | "W";
export type Rover = { x: number; y: number; facingDirection: FacingDirection };

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
