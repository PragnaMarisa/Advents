const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split("\n").map((ele) => +ele);
};

export const getFuel = (mass) => Math.floor(mass / 3) - 2;
