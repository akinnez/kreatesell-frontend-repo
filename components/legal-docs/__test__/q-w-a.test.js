import { QwA } from "../QwA";
import renderer from "react-test-renderer";

const mockData = [
  {
    question: "MockHeading",
    answer: ["Mock subheading or response"],
    withMargin: true,
    isSubHeading: true,
  },
  {
    question: "MockHeading 2",
    answer: ["Mock subheading or response"],
    withMargin: false,
    isSubHeading: true,
  },

  {
    question: "MockHeading 3",
    answer: ["Mock subheading or response", "second instance"],
    withMargin: true,
    isSubHeading: false,
  },
];

it("renders a snapshot of <QwA />", () => {
  const questionnaire = renderer.create(<QwA data={mockData} />).toJSON();
  expect(questionnaire).toMatchSnapshot();
});
