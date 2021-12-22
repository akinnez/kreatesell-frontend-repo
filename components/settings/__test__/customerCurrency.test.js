import CustomerCurrency from "../CustomerCurrency";
import renderer from "react-test-renderer";

const mockList = [
  { label: "mockLabel1", value: 1 },
  { label: "mockLabel2", value: 2 },
  { label: "mockLabel3", value: 3 },
];

describe("CustomerCurrency : ", () => {
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

  it("renders a snapshot of <CustomerCurrency />", () => {
    const customerCurrency = renderer.create(<CustomerCurrency />).toJSON();
    expect(customerCurrency).toMatchSnapshot();
  });
  it("renders a snapshot of <CustomerCurrency /> with mock props", () => {
    const customerCurrency = renderer
      .create(<CustomerCurrency list={mockList} />)
      .toJSON();
    expect(customerCurrency).toMatchSnapshot();
  });
});
