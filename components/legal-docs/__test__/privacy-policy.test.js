import renderer from "react-test-renderer";
import { Privacy } from "../Privacy";

it("renders a snapshot of <Privacy />", () => {
  const privacyPolicy = renderer.create(<Privacy />).toJSON();
  expect(privacyPolicy).toMatchSnapshot();
});
