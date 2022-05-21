import { questions } from "../../../pages/api/faqs/KreatorAffiliate";
import renderer from "react-test-renderer";
import KreatorAffiliate from "../KreatorAffiliate";

it("renders a snapshot of <Kreator/> tab", () => {
  const tab = renderer
    .create(<KreatorAffiliate questions={questions} />)
    .toJSON();
  expect(tab).toMatchSnapshot();
});
