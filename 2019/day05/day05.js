const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split(",").map((ele) => +ele);
};

const add = (a, b) => a + b;
const multilpy = (a, b) => a * b;
const askPrompt = () => prompt();
const displayValue = (index, inputs) => console.log(inputs[index]);

const makeModesOf = (opcode, arr) => {
  return Array(3 - arr.length)
    .fill(0)
    .concat(arr);
};

const getModes = (instruction, opcode) => {
  const modes = String(instruction).split("").slice(0, -2);
  return makeModesOf(opcode, modes.map(Number));
};

const operations = { 1: add, 2: multilpy, 3: askPrompt, 4: displayValue };

const runProgram = (inputs, instructionPointer) => {
  while (instructionPointer < inputs.length) {
    const instruction = inputs[instructionPointer];
    const operandPos1 = inputs[instructionPointer + 1];
    const operandPos2 = inputs[instructionPointer + 2];
    const resultPos = inputs[instructionPointer + 3];

    const opcode = instruction % 100;

    if (opcode < 3) {
      const [o1, o2, r1] = getModes(instruction, opcode).reverse();
      const modesAndvals = [
        [o1, operandPos1],
        [o2, operandPos2],
      ];

      const [op1, op2] = modesAndvals.map(([mode, val]) =>
        mode === 0 ? inputs[val] : val
      );

      console.log(opcode);

      inputs[resultPos] = operations[opcode](op1, op2);
      instructionPointer += 4;
      // console.log([o1, o2, r1], [op1, op2]);
    }

    if (opcode > 2) {
      inputs[resultPos] = operations[opcode](instructionPointer, inputs);
      instructionPointer += 2;
    }

    if (instruction === 99) return inputs[0];
  }

  return inputs;
};

const inputs = fetchInput("./day05.txt");
// const inputs = [101, 3, 3, 4, 0, 99];

const main = () => {
  console.log("Part1: ", runProgram(inputs, 0));
};

main();
