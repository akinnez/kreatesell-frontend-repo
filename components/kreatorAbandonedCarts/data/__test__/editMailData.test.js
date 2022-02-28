import { editMailData } from "../editMailData";

it("renders a snapshot of editMailData mock data", () => {
  expect(editMailData).toMatchSnapshot();
});
