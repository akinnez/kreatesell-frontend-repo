import renderer from "react-test-renderer";
import { modules, formats, QuillToolbar } from "../EditorToolbar";

describe("Editor data : ", () => {
  it("renders a snapshot of modules data", () => {
    expect(modules).toMatchSnapshot();
  });
  it("renders a snapshot of formats data", () => {
    expect(formats).toMatchSnapshot();
  });
});

describe("QuillToolbar : ", () => {
  it("renders a snapshot of <QuillToolbar />", () => {
    const quillToolbar = renderer.create(<QuillToolbar />).toJSON();
    expect(quillToolbar).toMatchSnapshot();
  });
});
