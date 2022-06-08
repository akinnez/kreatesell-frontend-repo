import PaginationHelper from "..";
import renderer from "react-test-renderer";

const mockProps = {
  filters: { page: 1, limit: 10 },
  setFilters: jest.fn(),
  dataSize: 50,
};

it("renders a snapshot of <PaginationHelper /> with mock props", () => {
  const helper = renderer.create(<PaginationHelper {...mockProps} />).toJSON();
  expect(helper).toMatchSnapshot();
});
