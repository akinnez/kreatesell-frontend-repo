import renderer from "react-test-renderer";
import TwoFactor from "../2Fa";

it("renders a snapshot of <TwoFactor />", () => {
  const twoFactor = renderer.create(<TwoFactor />).toJSON();
  expect(twoFactor).toMatchSnapshot();
});
