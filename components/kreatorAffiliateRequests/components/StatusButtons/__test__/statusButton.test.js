import StatusButtons from "..";
import renderer from "react-test-renderer";

const mockProps = {
  setFilters: jest.fn(),
  filters: {},
  setLoadng: jest.fn(),
};

it("renders a snapshot of <StatusButtons />", () => {
  const button = renderer.create(<StatusButtons {...mockProps} />).toJSON();
  expect(button).toMatchSnapshot();
});
