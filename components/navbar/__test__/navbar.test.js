import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import { Navbar } from "../Navbar";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

it("renders a snapshot of <Navbar />", () => {
  const navbar = renderer.create(<Navbar />).toJSON();
  expect(navbar).toMatchSnapshot();
});
