import renderer from "react-test-renderer";
import BankSettings from "../bank-settings";

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

describe("BankSettings : ", () => {
    it('renders a snapshot of <BankSettings />', () => {
      const bankSettings = renderer.create(<BankSettings />).toJSON();
      expect(bankSettings).toMatchSnapshot();
  })
});
