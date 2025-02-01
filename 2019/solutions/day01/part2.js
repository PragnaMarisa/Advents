import { fetchInput, getFuel } from "./commonLib.js";

const inputs = fetchInput("inputs/day01/part1.txt");

const calculateFuel = (mass) => {
  const fuel = getFuel(mass);
  if (fuel < 0) return 0;
  return fuel + calculateFuel(fuel);
};

const fuels = inputs.map((module) => calculateFuel(module));
const sumOfFuels = fuels.reduce((sum, fuel) => sum + fuel, 0);

console.log(sumOfFuels);
