import { questions } from "../../../pages/api/faqs/Kreators";
import renderer from "react-test-renderer";
import Kreator from "../Kreator";

it("renders a snapshot of <Kreator/> tab", () => {
  const tab = renderer.create(<Kreator questions={questions} />).toJSON();
  expect(tab).toMatchSnapshot();
});
