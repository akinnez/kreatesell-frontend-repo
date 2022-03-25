import DashboardLinks from "..";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));
it("renders a snapshot of <DashboardLinks />", () => {
  const board = renderer.create(<DashboardLinks />).toJSON();
  expect(board).toMatchSnapshot();
});
