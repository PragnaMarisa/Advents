const readFile = (file) => Deno.readTextFileSync(file);

const fetchInput = (file) => {
  const content = readFile(file);
  return content.split("\n").map((line) => line.split(""));
};

const inputs = fetchInput("./day10.txt");

const findAsteroids = (inputs) => {
  const asteroids = [];
  for (let y = 0; y < inputs.length; y++) {
    for (let x = 0; x < inputs[y].length; x++) {
      if (inputs[y][x] === "#") asteroids.push([x, y]);
    }
  }
  return asteroids;
};

const calculateVisibility = ([x2, y2], asteroids) => {
  const uniqueAngles = new Set();

  for (const [x1, y1] of asteroids) {
    if (x1 === x2 && y1 === y2) continue;

    const angle = Math.atan2(y2 - y1, x2 - x1);
    uniqueAngles.add(angle);
  }

  return { [uniqueAngles.size]: [x2, y2] };
};

const main = () => {
  const asteroids = findAsteroids(inputs);
  let asteroidsVisibility = {};
  for (const asteroid of asteroids) {
    const count = calculateVisibility(asteroid, asteroids);
    asteroidsVisibility = { ...asteroidsVisibility, ...count };
  }

  const maxCount = Math.max(...Object.keys(asteroidsVisibility));

  console.log(asteroidsVisibility[maxCount], maxCount);
};

main();
