import KreatorInfo from "..";
import renderer from "react-test-renderer";

const mockProps = {
  children: "mock children",
  href: "mock-link",
};

it("renders a snapshot of <KreatorInfo /> with mock props", () => {
  const info = renderer.create(<KreatorInfo {...mockProps} />).toJSON();
  expect(info).toMatchSnapshot();
});
