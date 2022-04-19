import AddSection from "../AddSection";
import renderer from "react-test-renderer";

const mockProps = {
  setMajorPage: jest.fn(),
  setIsTabActive: jest.fn(),
};

it("renders a snapshot of AddSection ", () => {
  const elem = renderer.create(<AddSection {...mockProps} />).toJSON();
  expect(elem).toMatchSnapshot();
});
