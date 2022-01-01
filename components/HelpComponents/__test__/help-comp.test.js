import renderer from "react-test-renderer";
import HelpHeader from "../header";

describe("HelpHeader : ", () => {
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

  it("renders a snapshot of <HelpHeader />", () => {
    const header = renderer.create(<HelpHeader />).toJSON();
    expect(header).toMatchSnapshot();
  });
});
