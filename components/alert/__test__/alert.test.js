import renderer from "react-test-renderer";
import Alert from "../index";

test("it renders a snapshot of <Alert />", () => {
  const alertElem = renderer.create(<Alert />).toJSON();
  expect(alertElem).toMatchSnapshot();
});
