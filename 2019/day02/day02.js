const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split(",").map((ele) => +ele);
};

const add = (a, b) => a + b;
const multilpy = (a, b) => a * b;

const operations = { 1: add, 2: multilpy };

const runProgram = (inputs, instructionPointer) => {
  while (instructionPointer < inputs.length) {
    const instruction = inputs[instructionPointer];
    const operandPos1 = inputs[instructionPointer + 1];
    const operandPos2 = inputs[instructionPointer + 2];
    const resultPos = inputs[instructionPointer + 3];

    if (instruction in operations) {
      inputs[resultPos] = operations[instruction](
        inputs[operandPos1],
        inputs[operandPos2]
      );

      instructionPointer += 4;
    }

    if (instruction === 99) return inputs[0];
  }

  return inputs[0];
};

const inputs = fetchInput("./day02.txt");

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
  const copy = [...inputs];
  copy[1] = 12;
  copy[2] = 2;
  console.log("Part1: ", runProgram(copy, 0));

  const result = 19690720;
  console.log("Part2: ", findPair(inputs, result));
};

main();
