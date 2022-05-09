import renderer from "react-test-renderer";
import ManageContent from "../ManageContent";

it("renders a snapshot of <ManageContent />", () => {
  const elem = renderer.create(<ManageContent />).toJSON();
  expect(elem).toMatchSnapshot();
});
