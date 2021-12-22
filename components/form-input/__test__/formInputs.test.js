import renderer from "react-test-renderer";
import { Input, FileInput, Button, Dropzone, Select } from "../index";

const label = "mockLabel";
const mockHandleChange = jest.fn();
describe("Form elements", () => {
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

  it("renders a snapshot of <Input />", () => {
    const inputElement = renderer.create(<Input />).toJSON();
    expect(inputElement).toMatchSnapshot();
  });
  it("renders a snapshot of <Select />", () => {
    const selectElement = renderer.create(<Select />).toJSON();
    expect(selectElement).toMatchSnapshot();
  });

  it("renders a snapshot of <Button/>", () => {
    const btnElement = renderer.create(<Button label={label} />).toJSON();
    expect(btnElement).toMatchSnapshot();
  });
  it("renders a snapshot of <FileInput/>", () => {
    const btnElement = renderer
      .create(<FileInput onChange={mockHandleChange} />)
      .toJSON();
    expect(btnElement).toMatchSnapshot();
  });

  it("renders a snapshot of <DropZone />", () => {
    const dropZoneElement = renderer
      .create(<Dropzone label={label} onChange={mockHandleChange} />)
      .toJSON();
    expect(dropZoneElement).toMatchSnapshot();
  });
});
