import TitleDescription from "../TitleDescription";
import renderer from "react-test-renderer";

const mockProps = {
  title: "Product designer",
  description: "mock description",
};

it("renders a snapshot of <TitleDescription /> with mock props", () => {
  const description = renderer
    .create(<TitleDescription {...mockProps} />)
    .toJSON();
  expect(description).toMatchSnapshot();
});
