import { fetchInput } from "./commonLib.js";

// const set1 = fetchInput("inputs/day03/part1.txt");
// const set2 = fetchInput("inputs/day03/part2.txt");

const set1 = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"];
const set2 = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];

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

const findIntersections = (path1, path2) => {
  return [...path1]
    .filter((point) => path2.has(point))
    .map((p) => p.split(",").map(Number));
};

const manhattanDistance = ([x, y]) => Math.abs(x) + Math.abs(y);

const findClosestIntersection = (intersections) => {
  return Math.min(...intersections.map(manhattanDistance));
};

const main = () => {
  const path1 = generatePath(set1);
  const path2 = generatePath(set2);

  const intersections = findIntersections(path1, path2);
  console.log("Intersections:", intersections);

  const closestDistance = findClosestIntersection(intersections);
  console.log("Closest Manhattan Distance:", closestDistance);
};

main();
