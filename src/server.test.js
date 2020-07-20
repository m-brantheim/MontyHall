const request = require("supertest");
const app = require("./server");
describe("Get Endpoints", () => {
  it("Should return error message when missing parameter", async () => {
    const res = await request(app).get("/montyhall");
    expect(res.statusCode).toEqual(200);
    const { errorMessage } = res.body;
    expect(errorMessage).toBeDefined();
    expect(errorMessage.length).toBeGreaterThan(0);
  });
  it("Should return error message when nrOfSimulations is less than 1", async () => {
    const res = await request(app)
      .get("/montyhall")
      .query({ nrOfSimulations: 0 });
    expect(res.statusCode).toEqual(200);
    const { errorMessage } = res.body;
    expect(errorMessage).toBeDefined();
    expect(errorMessage.length).toBeGreaterThan(0);
  });
  it("Should return nr of wins when nrOfSimulations is greater than 0", async () => {
    const res = await request(app)
      .get("/montyhall")
      .query({ nrOfSimulations: 10 });
    expect(res.statusCode).toEqual(200);
    const { nrOfNoSwitchWins, nrOfSwitchWins } = res.body;
    expect(nrOfNoSwitchWins).toBeDefined();
    expect(nrOfSwitchWins).toBeDefined();
  });
  it("Nr of wins should be in the possible range", async () => {
    const nrOfSimulations = 66;
    const res = await request(app).get("/montyhall").query({ nrOfSimulations });
    expect(res.statusCode).toEqual(200);
    const { nrOfNoSwitchWins, nrOfSwitchWins } = res.body;
    expect(nrOfNoSwitchWins).toBeGreaterThanOrEqual(0);
    expect(nrOfSwitchWins).toBeGreaterThanOrEqual(0);
    expect(nrOfNoSwitchWins).toBeLessThanOrEqual(nrOfSimulations);
    expect(nrOfSwitchWins).toBeLessThanOrEqual(nrOfSimulations);
  });
});
