import ContentUpload from "../ContentUpload";
import renderer from "react-test-renderer";

const mockProps = {
  file: ["-..ddi*7d&^54"],
  setFile: jest.fn(),
};

it("renders a snapshot of <ContentUpload /> with mock props", () => {
  const contentUpload = renderer
    .create(<ContentUpload {...mockProps} />)
    .toJSON();
  expect(contentUpload).toMatchSnapshot();
});
