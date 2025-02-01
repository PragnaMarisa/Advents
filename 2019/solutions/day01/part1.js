import { fetchInput, getFuel } from "./commonLib.js";

const inputs = fetchInput("inputs/day01/part1.txt");

const fuels = inputs.map((module) => getFuel(module));
const sumOfFuels = fuels.reduce((sum, fuel) => sum + fuel, 0);

console.log(sumOfFuels);
