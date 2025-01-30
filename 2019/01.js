// --- Day 1: The Tyranny of the Rocket Equation ---
// Santa has become stranded at the edge of the Solar System while delivering presents to other planets! To accurately calculate his position in space, safely align his warp drive, and return to Earth in time to save Christmas, he needs you to bring him measurements from fifty stars.

// Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

// The Elves quickly load you into a spacecraft and prepare to launch.

// At the first Go / No Go poll, every Elf is Go until the Fuel Counter-Upper. They haven't determined the amount of fuel required yet.

// Fuel required to launch a given module is based on its mass. Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

// For example:

// For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
// For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
// For a mass of 1969, the fuel required is 654.
// For a mass of 100756, the fuel required is 33583.
// The Fuel Counter-Upper needs to know the total fuel requirement. To find it, individually calculate the fuel needed for the mass of each module (your puzzle input), then add together all the fuel values.

// What is the sum of the fuel requirements for all of the modules on your spacecraft?

const getFuel = (mass) => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel;
};

const calculateFuel = (mass) => {
  let sum = getFuel(mass);

  while (mass > 0) {
    mass = getFuel(mass);
    sum += getFuel(mass) > 0 ? getFuel(mass) : 0;
  }

  return sum;
};

const inputs = [
  109506, 140405, 139135, 110950, 84296, 123991, 59438, 85647, 81214, 100517,
  100910, 57704, 83368, 50777, 85523, 95788, 127699, 138908, 95502, 81703,
  67317, 108468, 58394, 72202, 121580, 86908, 72705, 86578, 83714, 114900,
  142915, 51332, 69054, 97039, 143539, 61143, 113534, 98335, 58533, 83893,
  127138, 50844, 88397, 133591, 83563, 52435, 96342, 109491, 81148, 127397,
  86200, 92418, 144842, 120142, 97531, 54449, 91004, 129115, 142487, 68513,
  140405, 80111, 139359, 57486, 116973, 135102, 59737, 144040, 95483, 134470,
  60473, 113142, 78189, 53845, 124139, 78055, 63791, 99879, 58630, 111233,
  80544, 76932, 79644, 116247, 54646, 85217, 110795, 142095, 74492, 93318,
  122300, 82755, 147407, 98697, 98105, 132055, 67856, 109731, 75747, 135700,
];

// const fuels = inputs.map((module) => getFuel(module));
// const sumOfFuels = fuels.reduce((sum, fuel) => sum + fuel, 0);

// Answer: 3216744

const fuels = inputs.map((module) => calculateFuel(module));
const sumOfFuels = fuels.reduce((sum, fuel) => sum + fuel, 0);

console.log(sumOfFuels);
