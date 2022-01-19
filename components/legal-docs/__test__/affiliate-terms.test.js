import renderer from "react-test-renderer";
import { AffiliateTerms } from "../AffiliateTerms";

it("renders a snapshot of <AffiliateTerms />", () => {
  const affiliateTerms = renderer.create(<AffiliateTerms />).toJSON();
  expect(affiliateTerms).toMatchSnapshot();
});
