import RenderQuillHTML from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <RenderQuillHTML />", () => {
  const editor = renderer
    .create(<RenderQuillHTML html="<h1>here it comes!</h1>" />)
    .toJSON();
  expect(editor).toMatchSnapshot();
});
