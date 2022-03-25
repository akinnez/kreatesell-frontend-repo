import DashboardFilters from "..";
import renderer from "react-test-renderer";

const mockProps = {
  setFiltered: jest.fn(),
};

it("renders a snapshot of <DashboardFilters /> ", () => {
  const filter = renderer.create(<DashboardFilters {...mockProps} />).toJSON();
  expect(filter).toMatchSnapshot();
});
