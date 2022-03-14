import WalletFilters from "..";
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
  data: [{ currency: "NGN" }, { currency: "USD" }],
  setFiltered: jest.fn(),
  searchQuery: "duh",
};

it("renders a snapshot of <WalletFilters />", () => {
  const filters = renderer.create(<WalletFilters {...mockProps} />).toJSON();
  expect(filters).toMatchSnapshot();
});
