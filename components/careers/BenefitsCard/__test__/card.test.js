import renderer from "react-test-renderer";
import Card from "../Card";

const mockProps = {
  Icon: <></>,
  title: "mockTitle",
  description: "mock description",
};
it("renders a snapshot of <Card /> with mock props", () => {
  const card = renderer.create(<Card {...mockProps} />).toJSON();
  expect(card).toMatchSnapshot();
});
