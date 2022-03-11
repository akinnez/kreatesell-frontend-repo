import renderer from "react-test-renderer";
import PayoutBody from "../payouts-body";

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
describe("PayoutBody : ", () => {
  it("renders a snapshot of <PayoutBody />", () => {
    const payoutBody = renderer.create(<PayoutBody />).toJSON();
    expect(payoutBody).toMatchSnapshot();
  });
});
