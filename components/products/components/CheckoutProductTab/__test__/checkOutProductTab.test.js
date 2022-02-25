import CheckoutProductTab from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <CheckoutProductTab />", () => {
  const tab = renderer.create(<CheckoutProductTab />).toJSON();
  expect(tab).toMatchSnapshot();
});
