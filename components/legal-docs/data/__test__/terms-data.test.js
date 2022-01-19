import { termsData } from "../terms-of-service";

it("renders a snapshot  of the data for the terms of service page", () => {
  expect(termsData).toMatchSnapshot();
});
