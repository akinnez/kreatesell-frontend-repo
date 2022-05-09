import renderer from "react-test-renderer";
import ManageContent from "../ManageContent";

it("renders a snapshot of <ManageContent />", () => {
  const content = renderer.create(<ManageContent />).toJSON();
  expect(content).toMatchSnapshot();
});
