import renderer from "react-test-renderer";
import { SubFooter } from "../SubFooter";

it("renders a snapshot of <SubFooter />", () => {
  const subFooter = renderer.create(<SubFooter />).toJSON();
  expect(subFooter).toMatchSnapshot();
});
