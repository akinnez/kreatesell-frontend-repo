import renderer from "react-test-renderer";
import { Item } from "../Item";

const mockValues = {
  question: "MockHeading",
  answer: ["Mock subheading or response"],
  withMargin: true,
  isSubHeading: true,
};

it("renders a snapshot of <Item /> with mock props", () => {
  const item = renderer.create(<Item {...mockValues} />).toJSON();
  expect(item).toMatchSnapshot();
});
