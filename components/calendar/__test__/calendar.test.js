import renderer from "react-test-renderer";
import Calendar from "../index";

it("renders a snapshot of <Calendar />", () => {
  const calendar = renderer.create(<Calendar />).toJSON();
  expect(calendar).toMatchSnapshot();
});
