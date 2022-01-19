import renderer from "react-test-renderer";
import DropDown from "../index";

it("renders a snapshot of <DropDown />", () => {
  const dropDownElement = renderer.create(<DropDown />).toJSON();
  expect(dropDownElement).toMatchSnapshot();
});
