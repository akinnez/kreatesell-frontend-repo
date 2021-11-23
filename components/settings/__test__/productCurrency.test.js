import renderer from "react-test-renderer";
import ProductCurrency from "../ProductCurrency";

const mockList = [
  { label: "mockLabel1", value: 1 },
  { label: "mockLabel2", value: 2 },
  { label: "mockLabel3", value: 3 },
];

describe("ProductCurrency : ", () => {
  beforeAll(() => {
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
  });

  it("renders a snapshot of <ProductCurrency /> with no props", () => {
    const productCurrency = renderer.create(<ProductCurrency />).toJSON();
    expect(productCurrency).toMatchSnapshot();
  });

  it("renders a snapshot of <ProductCurrency /> with mock list", () => {
    const productCurrency = renderer
      .create(<ProductCurrency list={mockList} />)
      .toJSON();
    expect(productCurrency).toMatchSnapshot();
  });
});
