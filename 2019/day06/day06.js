const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split("\n").map((ele) => ele.split(")"));
};

// const inputs = fetchInput("./day06.txt");
const inputs = [
  ["COM", "B"],
  ["B", "C"],
  ["C", "D"],
  ["D", "E"],
  ["E", "F"],
  ["B", "G"],
  ["G", "H"],
  ["D", "I"],
  ["E", "J"],
  ["J", "K"],
  ["K", "L"],
  ["K", "YOU"],
  ["I", "SAN"],
];

const makeObjects = (inputs) => {
  const obs = {};
  for (const [value, key] of inputs) {
    obs[key] = value;
  }

  return obs;
};

const findDependents = (value, count, objects) => {
  if (!objects || !value || !(value in objects)) {
    return count;
  }
  return findDependents(objects[value], count + 1, objects);
};

const calculateTotalOrbits = (values, objects) => {
  let total = 0;
  for (const orbit of values) {
    total += findDependents(orbit, 0, objects);
  }

  return total;
};

const main = () => {
  // console.log(inputs);
  const orbits = makeObjects(inputs);
  console.log(orbits);

  const orbitsvalues = calculateTotalOrbits(Object.keys(orbits), orbits);
  console.log(orbitsvalues);
};

main();
