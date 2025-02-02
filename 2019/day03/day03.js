const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split("\n").map((arr) => arr.split(","));
};

const directions = {
  U: ([x, y], value) => [x, y + value],
  R: ([x, y], value) => [x + value, y],
  L: ([x, y], value) => [x - value, y],
  D: ([x, y], value) => [x, y - value],
};

const generatePath = (set) => {
  const coordinates = new Set();
  let [x, y] = [0, 0];

  for (const move of set) {
    const direction = move[0];
    const value = Number(move.slice(1));

    for (let i = 0; i < value; i++) {
      [x, y] = directions[direction]([x, y], 1);
      coordinates.add(`${x},${y}`);
    }
  }

  return coordinates;
};

const manhattanDistance = ([x, y]) => Math.abs(x) + Math.abs(y);

const findClosestIntersection = (intersections) => {
  return Math.min(...intersections.map(manhattanDistance));
};

const [set1, set2] = fetchInput("./day03.txt");

const findIntersections = (path1, path2) => {
  return [...path1]
    .filter((point) => path2.has(point))
    .map((p) => p.split(",").map(Number));
};

const findIntersectionsforSteps = (path1, path2) => {
  const steps = [];
  const keys1 = Object.keys(path1);

  for (const point of keys1) {
    if (point in path2) {
      steps.push([path1[point], path2[point]]);
    }
  }
  return steps;
};

const main = () => {
  const path1 = generatePath(set1);
  const path2 = generatePath(set2);

  const intersections = findIntersections(path1, path2);
  console.log("Intersections:", intersections);

  const steps = findIntersectionsforSteps(path1, path2);
  console.log("Nearest Steps:", findClosestIntersection(steps));

  const closestDistance = findClosestIntersection(intersections);
  console.log("Closest Manhattan Distance:", closestDistance);
};

main();
