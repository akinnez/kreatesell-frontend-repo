import GetLink from "..";
import renderer from "react-test-renderer";

const mockProps = {
  productId: "mockId",
};

describe("GetLink : ", () => {
  it("renders a snapshot of <GetLink /> with mock prop when status is supplied", () => {
    const getLink = renderer
      .create(<GetLink {...mockProps} status="Approved" />)
      .toJSON();
    expect(getLink).toMatchSnapshot();
  });
  it("renders a snapshot of <GetLink /> with mock prop when status isn't supplied", () => {
    const getLink = renderer.create(<GetLink {...mockProps} />).toJSON();
    expect(getLink).toMatchSnapshot();
  });
});
