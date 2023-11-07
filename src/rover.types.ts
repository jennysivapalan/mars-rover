const FacingDirectionString = ["N", "E", "S", "W"] as const;
export type FacingDirection = (typeof FacingDirectionString)[number];
export type Rover = { x: number; y: number; facingDirection: FacingDirection };

export type Rotation = {
  start: FacingDirection;
  end: FacingDirection;
};
export const ROTATE_LEFT: Rotation[] = [
  { start: "N", end: "W" },
  { start: "W", end: "S" },
  { start: "S", end: "E" },
  { start: "E", end: "N" },
];

export const ROTATE_RIGHT: Rotation[] = [
  { start: "N", end: "E" },
  { start: "E", end: "S" },
  { start: "S", end: "W" },
  { start: "W", end: "N" },
];

export type Move = "M" | "L" | "R";