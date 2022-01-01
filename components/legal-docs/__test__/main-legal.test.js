import renderer from "react-test-renderer";
import Legal from "../index";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

it("renders a snapshot of <Legal />", () => {
  const legal = renderer.create(<Legal defaultActiveKey="1" />).toJSON();
  expect(legal).toMatchSnapshot();
});
