import AffiliateLink from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <AffiliateLink />", () => {
  const link = renderer.create(<AffiliateLink />).toJSON();
  expect(link).toMatchSnapshot();
});
