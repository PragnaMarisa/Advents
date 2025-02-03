const readFile = (file) => Deno.readTextFileSync(file);

export const fetchInput = (file) => {
  const content = readFile(file);
  return content.split("");
};

const width = 25;
const height = 6;

const inputs = fetchInput("./day08.txt");
// const inputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1", "2"];

const makeLayers = (inputs, width, height) => {
  const layers = [];
  for (let index = 0; index < inputs.length; index += width * height) {
    const row = inputs.slice(index, index + width * height);

    layers.push(row);
  }

  return layers;
};

const getCountOf = (digit, layer) => layer.filter((d) => d === digit).length;

const findLeastZeros = (layers) => {
  let minZeros = Infinity;
  let leastLayer = [];

  for (const layer of layers) {
    const zeroCount = getCountOf("0", layer);
    if (zeroCount < minZeros) {
      minZeros = zeroCount;
      leastLayer = layer;
    }
  }

  return leastLayer;
};

const getFirstColors = (layers) => {
  const colors = [];
  for (let index = 0; index < width * height; index++) {
    for (const layer of layers) {
      if (layer[index] === "0" || layer[index] === "1") {
        colors.push(layer[index]);
        break;
      }
    }
  }

  return colors;
};

const display = (width, height, arr) => {
  const a = [];
  for (let index = 0; index < arr.length; index += width) {
    a.push(arr.slice(index, index + width));
  }

  return a.map((ele) => ele.join(""));
};

const main = () => {
  const layers = makeLayers(inputs, width, height);

  const least0 = findLeastZeros(layers);

  const noOfOnes = getCountOf("1", least0);
  const noOfTwos = getCountOf("2", least0);

  console.log("Part1: ", noOfOnes * noOfTwos);

  const firstColors = getFirstColors(layers);
  const x = firstColors.map((e) => (e === "1" ? "*" : " "));
  console.log(display(width, height, x).join("\n"));
};

main();
