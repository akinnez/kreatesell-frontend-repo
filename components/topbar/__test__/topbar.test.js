import TopBar from "../index";
import renderer from "react-test-renderer";

it("renders a snapshot of <TopBar />", () => {
  const topBar = renderer.create(<TopBar />).toJSON();
  expect(topBar).toMatchSnapshot();
});
