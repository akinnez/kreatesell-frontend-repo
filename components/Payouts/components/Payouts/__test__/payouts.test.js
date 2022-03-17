import Payouts from "..";
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
describe("Payouts : ", () => {
  it("renders a snapshot of <Payouts /> when bankDetails is false", () => {
    const el = renderer
      .create(<Payouts handleClick={jest.fn()} bankDetails={false} />)
      .toJSON();
    expect(el).toMatchSnapshot();
  });
  it("renders a snapshot of <Payouts /> when bankDetails is true", () => {
    const el = renderer
      .create(<Payouts handleClick={jest.fn()} bankDetails={true} />)
      .toJSON();
    expect(el).toMatchSnapshot();
  });
});
