# 👽 🛸 Mars Rover expedition! 🚀 🤖

## Getting started

To build project run:

`npm install`

To test the project (will run in watch mode):

`npm test`

## Project details

We're going on an expedition to Mars!
Not really but we're sending up some rovers 🤖 that will take our place.

This project will take a set of input strings (in `start` function of `mars.ts`)

- creates a Plateau for mars (square or rectangular) in grid formation (`x` as horizontal, `y` as vertical)
- places and moves Rovers around the Plateau

The format of the input strings is:

```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

#### Some guidelines on the input

The input string must be in the correct format otherwise the program will throw an error.

- The first line is the Plateau size. The Plateau above has maximum (x, y) co-ordinates of (`5 5`). Assume that the lower-left coordinate is (0, 0).
- The subsequent lines are in the format of Rover and their movement. Each Rover receives two lines of input.
  - The first line represents the Rovers position and facing direction on the Plateau. The first two integers represent the X and Y coordinates and a letter represents where the Rover is facing (its orientation).
    `1 2 N`.
  - The second line is a string of letters (`LMLMLMLMM`) represent the instructions to move the Rover around the Plateau.

### Movement Rules

Rovers move sequentially, the first Rover needs to finish moving first before the next one can move.

- A Rover cannot be placed in the position of or moved into the position of a Rover otherwise the program will throw an error
- A Rover cannot leave the plateau (they are very expensive so we don't want to lose them!) so will stop moving if it tries to exit.

The output from the program will be

```
1 3 N
5 1 E
```

Which is the order of the Rovers ending locations.

Have fun! 👽 🛸 🚀 🤖

### Future considerations

- The Plateau supports just square and rectangle grids. To change it to other surface types such as circular or sphere(!) The Plateu would need to be refactored/extended. I'd consider creating an interface that would need to define it's shape and boundary rules that each shape of Plateau would need to implement.

- The Rover can just move around and not bump into other Rovers. Future considerations it would need to move around rocks or other obstacles. We could also send it up with some arms to collect Mars samples so would need to extend it's variables to be able to do this.

- Finally we may need to recharge the Rover so could introduce some charging points on Mars for the Rovers to get some juice.
