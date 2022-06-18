import { questions } from "../../../pages/api/faqs/Buyer";
import renderer from "react-test-renderer";
import Buyer from "../Buyer";

it("renders a snapshot of <Buyer/> tab", () => {
  const tab = renderer.create(<Buyer questions={questions} />).toJSON();
  expect(tab).toMatchSnapshot();
});
