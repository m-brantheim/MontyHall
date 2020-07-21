const { getDoors, shuffle, getGoatIndex } = require("./montyHall");

describe("getDoors", () => {
  it("Should return an array", async () => {
    const doors = getDoors();
    expect(doors).toBeDefined();
    expect(doors).toEqual(expect.arrayContaining([]));
  });
  it("Should return an array of the size of the provided argument", async () => {
    const size = 5;
    const doors = getDoors(size);
    expect(doors.length).toBe(size);
  });
  it("Should return an array with size-1 false values and 1 true value", async () => {
    const size = 99;
    const doors = getDoors(size);
    const nrOfFalseValues = doors.filter((door) => !door).length;
    expect(nrOfFalseValues).toBe(size - 1);
    const nrOfTrueValues = doors.filter((door) => door).length;
    expect(nrOfTrueValues).toBe(1);
  });
});

describe("shuffle", () => {
  it("Should return an array containing the same elements", async () => {
    const unshuffled = ["a", "b", "c"];
    const shuffled = shuffle(unshuffled);
    expect(shuffled).toBeDefined();
    expect(shuffled).toEqual(expect.arrayContaining(unshuffled));
  });
});

describe("getGoatIndex", () => {
  it("Should return a different index from chosenIndex that contains a false value", async () => {
    const goatArray = [false, true, false];
    const chosenIndex = 0;
    const goatIndex = getGoatIndex(goatArray, chosenIndex);
    expect(goatIndex).toBeDefined();
    expect(goatIndex).toEqual(2);
    expect(goatArray[goatIndex]).toEqual(false);
  });
});
