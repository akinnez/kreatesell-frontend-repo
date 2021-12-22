import Billing from "../Billing";
import renderer from "react-test-renderer";

it("renders a snapshot of <Billing />", () => {
  const billing = renderer.create(<Billing />).toJSON();
  expect(billing).toMatchSnapshot();
});
