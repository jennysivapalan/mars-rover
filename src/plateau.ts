type Plateau = { width: number; height: number };

export function createSpace(width: number, height: number) {
  if (
    width >= 0 &&
    height >= 0 &&
    Number.isInteger(width) &&
    Number.isInteger(height)
  )
    return { width: width, height: height };
  else throw new Error("Invalid parameters, try again");
}
