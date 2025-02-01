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

export { runProgram, operations, multilpy, add };
