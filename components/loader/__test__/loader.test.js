import renderer from "react-test-renderer";
import Loader from "../index";

it("renders a snapshot of <Loader />", () => {
  const loader = renderer.create(<Loader />).toJSON();
  expect(loader).toMatchSnapshot();
});
