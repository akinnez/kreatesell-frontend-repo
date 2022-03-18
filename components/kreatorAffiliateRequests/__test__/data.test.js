import { statusArr, requestsData } from "../data";

describe("Data: ", () => {
  it("renders a snapshot of statusArr data", () => {
    expect(statusArr).toMatchSnapshot();
  });
  it("renders a snapshot of requestsData data", () => {
    expect(requestsData).toMatchSnapshot();
  });
});
