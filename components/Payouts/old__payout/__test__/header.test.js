import renderer from "react-test-renderer";
import Header from "../header";

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

describe("Header : ", () => {
  it("renders a snapshot of <Header />", () => {
    const header = renderer.create(<Header />).toJSON();
    expect(header).toMatchSnapshot();
  });
});
