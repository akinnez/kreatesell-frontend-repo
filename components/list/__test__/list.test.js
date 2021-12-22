import List from "../index";
import renderer from "react-test-renderer";

const mockList = ["one", "two", "three"];
it("renders a snapshot of <List />", () => {
  const list = renderer.create(<List list={mockList} step={1} />).toJSON();
  expect(list).toMatchSnapshot();
});
