const getDoors = (n = 3) => {
  const a = new Array(n);
  const b = a.fill(false);
  b[n - 1] = true;
  return b;
};

const shuffle = (a) => {
  return a
    .map((n) => [Math.random(), n])
    .sort()
    .map((n) => n[1]);
};

const getGoatIndex = (array, chosenIndex) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (index !== chosenIndex && !element) {
      return index;
    }
  }
};

const runSimulation = (nrOfSimulations) => {
  let nrOfNoSwitchWins = 0;
  let nrOfSwitchWins = 0;
  const nrOfDoors = 3;
  const minIndex = 0;
  const maxIndex = 2;
  for (let index = 0; index < nrOfSimulations; index++) {
    const doors = getDoors(nrOfDoors);
    const shuffledDoors = shuffle(doors);
    const chosenIndex =
      Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    const goatIndex = getGoatIndex(shuffledDoors, chosenIndex);
    const remainingIndexes = [...Array(nrOfDoors).keys()].filter(
      (n) => n !== chosenIndex && n !== goatIndex
    );
    const switchIndex = remainingIndexes[0];
    if (shuffledDoors[chosenIndex]) nrOfNoSwitchWins++;
    if (shuffledDoors[switchIndex]) nrOfSwitchWins++;
  }
  return {
    nrOfNoSwitchWins,
    nrOfSwitchWins,
  };
};

module.exports = {
  runSimulation,
};
