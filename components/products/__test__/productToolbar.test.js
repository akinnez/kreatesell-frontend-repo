import renderer from "react-test-renderer";
import { Toolbar } from "../ProductToolbar";

it("renders a snapshot of Toolbar data", () => {
  expect(Toolbar).toMatchSnapshot();
});
