import DashboardFilters from "..";
import renderer from "react-test-renderer";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockProps = {
  setFiltered: jest.fn(),
};

it("renders a snapshot of <DashboardFilters /> with mock props ", () => {
  const filter = renderer.create(<DashboardFilters {...mockProps} />).toJSON();
  expect(filter).toMatchSnapshot();
});
