import DashboardLinks from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <DashboardLinks />", () => {
  const board = renderer.create(<DashboardLinks />).toJSON();
  expect(board).toMatchSnapshot();
});
