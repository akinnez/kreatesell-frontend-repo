import { affiliateTerms } from "../affiliate-terms";

it("renders a snapshot of the data for the affiliate terms page", () => {
  expect(affiliateTerms).toMatchSnapshot();
});
