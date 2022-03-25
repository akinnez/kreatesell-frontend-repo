import StatsHeader from "..";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
  pathname: "/account/dashboard",
}));

const mockProps = {
  title: "mockTitle",
  url: "mockUrl",
  orderUrl: "mockOrderUrl",
};

it("renders a snapshot of <StatsHeader />  with mock props", () => {
  const header = renderer.create(<StatsHeader {...mockProps} />).toJSON();
  expect(header).toMatchSnapshot();
});
