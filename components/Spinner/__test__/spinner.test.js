import renderer from "react-test-renderer";
import Spinner from "..";

it("renders a snapshot of <Spinner />", () => {
  const spinner = renderer.create(<Spinner />).toJSON();
  expect(spinner).toMatchSnapshot();
});
