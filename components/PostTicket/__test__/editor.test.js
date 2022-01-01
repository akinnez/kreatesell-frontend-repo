import renderer from "react-test-renderer";
import Editor from "../Editor";

it("renders a snapshot of <Editor />", () => {
  const editor = renderer.create(<Editor />).toJSON();
  expect(editor).toMatchSnapshot();
});
