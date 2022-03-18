import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ReportAffiliate from "..";

configure({ adapter: new Adapter() });

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

const mockProps = {
  hideReport: jest.fn(),
};

describe("ReportAffiliate: ", () => {
  it("renders a snapshot of <ReportAffiliate /> when report is false", () => {
    const el = mount(<ReportAffiliate {...mockProps} report={false} />);
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
  it("renders a snapshot of <ReportAffiliate /> when report is true", () => {
    const el = mount(<ReportAffiliate {...mockProps} report={true} />);
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
});
