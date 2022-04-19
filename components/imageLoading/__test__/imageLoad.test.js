import ImageLoad from "../imageLoad";
import renderer from "react-test-renderer";

const mockProps = {
  imageName: "mockImageName.fileExtension",
  //   errors: ["-*.,#@553a---", "-", "!-!*.,#@553a---", "-"],
};

describe("ImageLoad : ", () => {
  it("renders a snapshot of <ImageLoad /> with mock props at progress level 0 with no errors", () => {
    const imageLoad = renderer
      .create(<ImageLoad {...mockProps} progress={0} isError={false} />)
      .toJSON();
    expect(imageLoad).toMatchSnapshot();
  });
  it("renders a snapshot of <ImageLoad /> with mock props at progress level 80 with no errors", () => {
    const imageLoad = renderer
      .create(<ImageLoad {...mockProps} progress={80} isError={false} />)
      .toJSON();
    expect(imageLoad).toMatchSnapshot();
  });
  //   it("renders a snapshot of <ImageLoad /> with mock props at progress level 80 with an error", () => {
  //     const imageLoad = renderer
  //       .create(<ImageLoad {...mockProps} progress={80} isError={true} />)
  //       .toJSON();
  //     expect(imageLoad).toMatchSnapshot();
  //   });
  it("renders a snapshot of <ImageLoad /> with mock props at progress level 100 with no error", () => {
    const imageLoad = renderer
      .create(<ImageLoad {...mockProps} progress={100} isError={false} />)
      .toJSON();
    expect(imageLoad).toMatchSnapshot();
  });
  //   it("renders a snapshot of <ImageLoad /> with mock props at progress level 100 with an error", () => {
  //     const imageLoad = renderer
  //       .create(<ImageLoad {...mockProps} progress={100} isError={true} />)
  //       .toJSON();
  //     expect(imageLoad).toMatchSnapshot();
  //   });
});
