import { privacyData } from "../privacy-policy";

it("renders a snapshot of the data for the privacy policy page", () => {
  expect(privacyData).toMatchSnapshot();
});
