import { questions } from "../../../pages/api/faqs/General";
import renderer from "react-test-renderer";
import General from "../General";

it("renders a snapshot of <General /> tab", () => {
  const tab = renderer.create(<General questions={questions} />).toJSON();
  expect(tab).toMatchSnapshot();
});
