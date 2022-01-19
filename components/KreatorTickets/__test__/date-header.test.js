import renderer from "react-test-renderer";
import { DateHeader } from "../DateHeader";

it("renders a snapshot of <DateHeader />", () => {
  const dateHeader = renderer.create(<DateHeader />).toJSON();
  expect(dateHeader).toMatchSnapshot();
});
