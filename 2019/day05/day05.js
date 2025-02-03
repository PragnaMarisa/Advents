const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split(",").map((ele) => +ele);
};

const add = (a, b) => a + b;
const multilpy = (a, b) => a * b;
const askPrompt = () => +prompt();
const displayValue = (val) => console.log("display: ", val);

const makeModesOf = (opcode, arr) => {
  return Array(3 - arr.length)
    .fill(0)
    .concat(arr);
};

const getModes = (instruction, opcode) => {
  const modes = String(instruction)
    .slice(0, -2)
    .padStart(3, "0")
    .split("")
    .map(Number);
  return makeModesOf(opcode, modes);
};

const getParameters = (arr, inputs) => {
  return arr.map(([mode, val]) => (mode === 0 ? inputs[val] : val));
};

const equals = ([v1, v2]) => (v1 === v2 ? 1 : 0);

const lessThan = ([v1, v2]) => (v1 < v2 ? 1 : 0);

const jumpIfTrue = ([val, pos]) => (val !== 0 ? pos : null);
const jumpIfFalse = ([val, pos]) => (val === 0 ? pos : null);

const operations = {
  1: add,
  2: multilpy,
  3: askPrompt,
  4: displayValue,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals,
};

const runProgram = (inputs, instructionPointer) => {
  while (instructionPointer < inputs.length) {
    const instruction = inputs[instructionPointer];

    if (instruction === 99) return inputs[0];

    const operandPos1 = inputs[instructionPointer + 1];
    const operandPos2 = inputs[instructionPointer + 2];
    const resultPos = inputs[instructionPointer + 3];

    const opcode = instruction % 100;
    const [o1, o2] = getModes(instruction, opcode).reverse();

    const modesAndvals = [
      [o1, operandPos1],
      [o2, operandPos2],
    ];

    if (opcode < 3) {
      inputs[resultPos] = operations[opcode](
        ...getParameters(modesAndvals, inputs)
      );

      instructionPointer += 4;
    }

    if (opcode === 3) {
      inputs[operandPos1] = operations[opcode]();
      instructionPointer += 2;
    }

    if (opcode === 4) {
      operations[opcode](...getParameters([[o1, operandPos1]], inputs));
      instructionPointer += 2;
    }

    if (opcode === 5 || opcode === 6) {
      const newPos = operations[opcode](getParameters(modesAndvals, inputs));
      instructionPointer = newPos !== null ? newPos : instructionPointer + 3;
    }

    if (opcode === 7 || opcode === 8) {
      inputs[resultPos] = operations[opcode](
        getParameters(modesAndvals, inputs)
      );
      instructionPointer += 4;
    }
  }

  return inputs;
};

// const inputs = fetchInput("./day05.txt");

// const inputs = [
//   3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0,
//   36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46,
//   1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99,
// ];

const main = () => {
  runProgram(inputs, 0);
};

// main();

export { runProgram };
