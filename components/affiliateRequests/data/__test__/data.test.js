import { requestsData } from "..";

it("renders a snapshot of the mock data requestsData", () => {
  expect(requestsData).toMatchSnapshot();
});
