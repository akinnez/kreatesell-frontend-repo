import Currency from "../Currency";
import renderer from "react-test-renderer";

describe("Currency : ", () => {
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
  it("renders a snapshot of <Currency /> with no list props", () => {
    const currency = renderer.create(<Currency />).toJSON();
    expect(currency).toMatchSnapshot();
  });
});
