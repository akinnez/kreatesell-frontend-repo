import AbandonedCartsStats from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <AbandonedCartsStats />", () => {
  const cart = renderer.create(<AbandonedCartsStats />).toJSON();
  expect(cart).toMatchSnapshot();
});
