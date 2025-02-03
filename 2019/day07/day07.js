const add = (a, b) => a + b;
const multilpy = (a, b) => a * b;

const askPrompt = (prompts) => () => prompts.shift();

const displayValue = (val) => {
  console.log("display: ", val);
  return val;
};

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

const runProgram = (values) => {
  let instructionPointer = values.instructionPointer;
  console.log("Vallues: ", values);

  let prompts = values.val;
  let inputs = values.inputs;
  let val = -1;
  while (instructionPointer < inputs.length) {
    const instruction = inputs[instructionPointer];

    if (instruction === 99) return val;

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
      inputs[operandPos1] = operations[opcode](prompts)();
      instructionPointer += 2;
    }

    if (opcode === 4) {
      val = operations[opcode](...getParameters([[o1, operandPos1]], inputs));
      if (val !== -1 && prompts.length === 0)
        return { instructionPointer, inputs, val };
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

  return val;
};

const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split(",").map(Number);
};

const sequence = [5, 6, 7, 8, 9];

const getPermutations = (number) => {
  if (number.length === 1) return [number];
  const permutations = [];
  for (let i = 0; i < number.length; i++) {
    const currentDigit = number[i];
    const remainingDigits = number.slice(0, i).concat(number.slice(i + 1));
    const remainingPerms = getPermutations(remainingDigits);

    for (const perm of remainingPerms) {
      permutations.push([currentDigit, ...perm]);
    }
  }

  return permutations;
};

const inputs = fetchInput("./day07.txt");

const main = () => {
  const possibleSequences = getPermutations(sequence);
  let trusters = -Infinity;

  for (const arr of possibleSequences) {
    const values = {
      A: { instructionPointer: 0, inputs: [...inputs], val: 0 },
      B: { instructionPointer: 0, inputs: [...inputs], val: 0 },
      C: { instructionPointer: 0, inputs: [...inputs], val: 0 },
      D: { instructionPointer: 0, inputs: [...inputs], val: 0 },
      E: { instructionPointer: 0, inputs: [...inputs], val: 0 },
    };

    const amplifiers = ["A", "B", "C", "D", "E"];
    let ampIndex = 0;

    values["A"] = runProgram({ ...values.A, val: [arr[0], 0] });
    values["B"] = runProgram({ ...values.B, val: [arr[1], values.A.val] });
    values["C"] = runProgram({ ...values.C, val: [arr[2], values.B.val] });
    values["D"] = runProgram({ ...values.D, val: [arr[3], values.C.val] });
    values["E"] = runProgram({ ...values.E, val: [arr[4], values.D.val] });

    while (values[amplifiers[ampIndex]].inputs !== undefined) {
      const amplifier = amplifiers[ampIndex];
      const prevamplifier = amplifiers[ampIndex ? ampIndex - 1 : 4];

      let result = runProgram({
        ...values[amplifier],
        val: [values[prevamplifier].val],
      });

      values[amplifier] = result;

      if (values[amplifier].inputs === undefined) {
        trusters =
          trusters < values[prevamplifier].val
            ? values[prevamplifier].val
            : trusters;
      }

      ampIndex += ampIndex === 4 ? -4 : 1;
    }
  }
  console.log(trusters);
};

main();
