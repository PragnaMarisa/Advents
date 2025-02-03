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

const findDependents = (value, dependents, objects) => {
  if (!objects || !value || !(value in objects)) {
    return dependents;
  }
  dependents.push(value);
  return findDependents(objects[value], dependents, objects);
};

const calculateTotalOrbits = (values, objects) => {
  let total = 0;

  for (const orbit of values) {
    total += findDependents(orbit, [], objects).length;
  }

  return total;
};

const calculateDistance = (you, san) => {
  for (const orbit of san) {
    if (you.includes(orbit)) {
      return you.indexOf(orbit) + san.indexOf(orbit) - 2;
    }
  }
  return 0;
};

const main = () => {
  const orbits = makeObjects(inputs);
  const orbitsvalues = calculateTotalOrbits(Object.keys(orbits), orbits);

  const you = findDependents("YOU", [], orbits);
  const san = findDependents("SAN", [], orbits);
  console.log(you, san);

  const distance = calculateDistance(you, san);

  console.log("Part1: ", orbitsvalues);
  console.log("Part2: ", distance);
};

main();
