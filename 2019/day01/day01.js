const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split("\n").map((ele) => +ele);
};

export const getFuel = (mass) => Math.floor(mass / 3) - 2;

const inputs = fetchInput("./day01.txt");

const calculateFuel = (mass) => {
  const fuel = getFuel(mass);
  if (fuel < 0) return 0;
  return fuel + calculateFuel(fuel);
};

const fuels = (functionCall) => inputs.map((module) => functionCall(module));
const sumOfFuels = (fuels) => fuels.reduce((sum, fuel) => sum + fuel, 0);

const main = () => {
  const part1 = fuels(getFuel);
  const part2 = fuels(calculateFuel);

  console.log("Part1: ", sumOfFuels(part1));
  console.log("Part2: ", sumOfFuels(part2));
};

main();
