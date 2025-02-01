import { fetchInput, runProgram } from "./commonLib.js";

const inputs = fetchInput("inputs/day02/part1.txt");

const findPair = (inputs, result) => {
  for (let pair1 = 0; pair1 < 100; pair1++) {
    inputs[1] = pair1;
    for (let pair2 = 0; pair2 < 100; pair2++) {
      inputs[2] = pair2;

      if (runProgram([...inputs], 0) === result) return [pair1, pair2];
    }
  }

  return [0, 0];
};

const main = () => {
  const result = 19690720;
  console.log(findPair(inputs, result));
};

main();
