import renderer from "react-test-renderer";
import Payout from "../payouts";

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

describe("Payout : ", () => {
  it("renders a snapshot of <Payout />", () => {
    const payout = renderer.create(<Payout />).toJSON();
    expect(payout).toMatchSnapshot();
  });
});
