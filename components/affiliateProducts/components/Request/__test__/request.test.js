import renderer from "react-test-renderer";
import Request from "..";

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

it("renders a snapshot of <Request />", () => {
  const request = renderer.create(<Request />).toJSON();
  expect(request).toMatchSnapshot();
});
