import renderer from "react-test-renderer";
import EmailSetting from "../EmailSetting";

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

it("renders a snapshot of <EmailSetting />", () => {
  const emailSetting = renderer.create(<EmailSetting />).toJSON();
  expect(emailSetting).toMatchSnapshot();
});
