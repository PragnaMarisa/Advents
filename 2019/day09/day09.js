const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split(",").map(Number);
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

const getParameters = (arr, inputs, baseAddress) => {
  return arr.map(([mode, val]) => {
    if (mode === 1) return val;
    return mode === 0 ? inputs[val] : inputs[baseAddress + val];
  });
};

const equals = ([v1, v2]) => (v1 === v2 ? 1 : 0);

const lessThan = ([v1, v2]) => (v1 < v2 ? 1 : 0);

const jumpIfTrue = ([val, pos]) => (val !== 0 ? pos : null);
const jumpIfFalse = ([val, pos]) => (val === 0 ? pos : null);

const modifyBase = (val) => val;

const operations = {
  1: add,
  2: multilpy,
  3: askPrompt,
  4: displayValue,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals,
  9: modifyBase,
};

const runProgram = (inputs, instructionPointer) => {
  let baseAddress = 0;
  while (instructionPointer < inputs.length) {
    const instruction = inputs[instructionPointer];

    if (instruction === 99) return null;

    const operandPos1 = inputs[instructionPointer + 1];
    const operandPos2 = inputs[instructionPointer + 2];
    const resultPos = inputs[instructionPointer + 3];

    const opcode = instruction % 100;
    // if (opcode === 1) return 0;
    const [o1, o2, o3] = getModes(instruction, opcode).reverse();
    // console.log([o1, o2, o3]);

    const modesAndvals = [
      [o1, operandPos1],
      [o2, operandPos2],
      [o3, resultPos],
    ];

    // console.log("Inputs:", inputs.slice(instructionPointer));
    // console.log("Opcode:", opcode);
    // console.log("IP:", instructionPointer);
    // console.log(" VALUE OF IP:", inputs[instructionPointer]);
    // // console.log("1000", inputs[1000]);
    // // console.log("1009", inputs[1009]);
    // console.log("64", inputs[64]);

    if (opcode < 3) {
      inputs[o3 === 2 ? baseAddress + resultPos : resultPos] = operations[
        opcode
      ](...getParameters(modesAndvals, inputs, baseAddress));

      instructionPointer += 4;
    }

    if (opcode === 3) {
      const pos = o1 === 2 ? baseAddress + operandPos1 : operandPos1;
      inputs[pos] = operations[opcode]();
      instructionPointer += 2;
    }

    if (opcode === 4) {
      const outputVal = getParameters(
        [[o1, operandPos1]],
        inputs,
        baseAddress
      )[0];
      operations[opcode](outputVal);
      // console.log("mode:", o1);
      // console.log(inputs[instructionPointer], "Output val:", outputVal);
      // console.log("IP AFTER OPCODE 4", instructionPointer);
      // console.log(inputs);

      instructionPointer += 2;
    }

    if (opcode === 5 || opcode === 6) {
      // console.log(getParameters(modesAndvals, inputs, baseAddress));

      const newPos = operations[opcode](
        getParameters(modesAndvals, inputs, baseAddress)
      );
      // console.log(newPos);
      // console.log("x", newPos !== null, newPos, instructionPointer + 3);

      instructionPointer = newPos !== null ? newPos : instructionPointer + 3;
    }

    if (opcode === 7 || opcode === 8) {
      // console.log(operations[opcode](getParameters(modesAndvals, inputs)));

      inputs[o3 === 2 ? baseAddress + resultPos : resultPos] = operations[
        opcode
      ](getParameters(modesAndvals, inputs, baseAddress));
      instructionPointer += 4;
    }

    if (opcode === 9) {
      baseAddress += operations[opcode](
        ...getParameters([[o1, operandPos1]], inputs, baseAddress)
      );
      // console.log("BAddress After:", baseAddress);

      instructionPointer += 2;
    }
    // if (instructionPointer > 199) console.log(inputs[+prompt()]);

    if (!(opcode in operations)) return "not there";
  }

  return inputs;
};

const inputs = fetchInput("./day09.txt");
// const inputs = [
//   109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99,
// ];

// const inputs = [104, 1125899906842624, 99];
// const inputs = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];

const main = () => {
  const inputsExtended = inputs.concat(Array(1000).fill(0));
  // console.log("Input", inputsExtended.length);
  // console.log(runProgram(inputs, 0));
  console.log(runProgram(inputsExtended, 0));
};

main();
