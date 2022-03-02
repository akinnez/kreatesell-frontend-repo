import CloseIcon from "../CloseIcon";
import renderer from "react-test-renderer";

it("renders a snapshot of CloseIcon", () => {
  const icon = renderer.create(<CloseIcon />).toJSON();
  expect(icon).toMatchSnapshot();
});
