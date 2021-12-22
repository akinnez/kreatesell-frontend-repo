import renderer from "react-test-renderer";
import Password from "../Password";

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

it("renders a snapshot of <Password />", () => {
  const password = renderer.create(<Password />).toJSON();
  expect(password).toMatchSnapshot();
});
