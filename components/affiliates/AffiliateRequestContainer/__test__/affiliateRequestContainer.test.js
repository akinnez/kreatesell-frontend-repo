import AffiliateRequestContainer from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <AffiliateRequestContainer />", () => {
  const container = renderer
    .create(
      <AffiliateRequestContainer>mock Children</AffiliateRequestContainer>
    )
    .toJSON();
  expect(container).toMatchSnapshot();
});
