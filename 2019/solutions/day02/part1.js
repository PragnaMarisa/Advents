import { fetchInput, runProgram } from "./commonLib.js";

// sprint program
// 1 => add
// 2 => multiply
// 99=> stop

const inputs = fetchInput("inputs/day02/part1.txt");
inputs[1] = 12;
inputs[2] = 2;

const main = () => {
  console.log(runProgram(inputs, 0));
};

main();
