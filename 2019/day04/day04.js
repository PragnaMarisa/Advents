const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split("\n").map(Number);
};

const [startRange, endRange] = fetchInput("./day04.txt");

const isStringDoubled = (string) => {
  const counts = {};

  for (const digit of string) {
    counts[digit] = (counts[digit] || 0) + 1;
  }

  return Object.values(counts).includes(2);
};

const isAscending = (number) => {
  const string = number + "";

  for (let i = 0; i < string.length - 1; i++) {
    if (string[i] > string[i + 1]) return false;
  }
  return isStringDoubled(string);
};

const countValidPasswords = (startRange, endRange) => {
  let count = 0;

  for (let start = startRange; start <= endRange; start++) {
    if (isAscending(start)) {
      count++;
    }
  }

  return count;
};

const main = () => {
  const count = countValidPasswords(startRange, endRange);
  console.log("Valid Passwords: ", count);
};

main();
