import AffiliatePageFooter from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <AffiliatePageFooter />", () => {
  const pageFooter = renderer.create(<AffiliatePageFooter />).toJSON();
  expect(pageFooter).toMatchSnapshot();
});
