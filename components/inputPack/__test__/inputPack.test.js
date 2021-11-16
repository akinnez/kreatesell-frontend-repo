import renderer from "react-test-renderer";
import { TextInput, TextArea, CustomSelect, Button } from "../index";

const handleChange = jest.fn();
const handleBlur = jest.fn();
const handleClick = jest.fn();
const placeholder = "mockPlaceholder";
const name = "mockName";
const value = "mockValue";
const label = "mockLabel";
const labelExtra = "mockLabelExtra";
const mockSelectOptions = [
  { value: "valOne", label: "labelOne" },
  { value: "valTwo", label: "labelTwo" },
  { value: "valTwo", label: "labelThree" },
];

describe("TextInput : ", () => {
  it("renders a snapshot of <TextInput /> with mock Props  and disableBtn at false", () => {
    const textInput = renderer
      .create(
        <TextInput
          value="mockValue"
          onChange={handleChange}
          onBlue={handleBlur}
          placeholder="mockPlaceholder"
          name="mockName"
          label="mockLabel"
        />
      )
      .toJSON();
    expect(textInput).toMatchSnapshot();
  });
  it("renders a snapshot of <TextInput /> with mock Props and disableBtn at false", () => {
    const textInput = renderer
      .create(
        <TextInput
          value="mockValue"
          onChange={handleChange}
          onBlue={handleBlur}
          placeholder="mockPlaceholder"
          name="mockName"
          label="mockLabel"
          labelExtra={"mocklabelExtra"}
          disabled={false}
        />
      )
      .toJSON();
    expect(textInput).toMatchSnapshot();
  });
  it("renders a snapshot of <TextInput /> with mock Props  and disableBtn at true", () => {
    const textInput = renderer
      .create(
        <TextInput
          value="mockValue"
          onChange={handleChange}
          onBlue={handleBlur}
          placeholder="mockPlaceholder"
          name="mockName"
          label="mockLabel"
          labelExtra={"mockLabelExtra"}
          disabled={true}
        />
      )
      .toJSON();
    expect(textInput).toMatchSnapshot();
  });
});

describe("TextArea : ", () => {
  it("renders a snapshot of <TextArea /> with the disabled prop set to false and no labelExtra supplied", () => {
    const textArea = renderer
      .create(
        <TextArea
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          label={label}
          placeholder={placeholder}
        />
      )
      .toJSON();
    expect(textArea).toMatchSnapshot();
  });
  it("renders a snapshot of <TextArea /> with the disabled prop set to false and no labelExtra supplied", () => {
    const textArea = renderer
      .create(
        <TextArea
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          label={label}
          placeholder={placeholder}
        />
      )
      .toJSON();
    expect(textArea).toMatchSnapshot();
  });

  it("renders a snapshot of <TextArea /> with the disabled prop set to false and with a mock labelExtra supplied", () => {
    const textArea = renderer
      .create(
        <TextArea
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          label={label}
          placeholder={placeholder}
          labelExtra={labelExtra}
        />
      )
      .toJSON();
    expect(textArea).toMatchSnapshot();
  });

  it("renders a snapshot of <TextArea /> with the disabled prop set to true and no labelExtra supplied", () => {
    const textArea = renderer
      .create(
        <TextArea
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          label={label}
          placeholder={placeholder}
          disabled={true}
        />
      )
      .toJSON();
    expect(textArea).toMatchSnapshot();
  });

  it("renders a snapshot of <TextArea /> with the disabled prop set to true and a mock labelExtra supplied", () => {
    const textArea = renderer
      .create(
        <TextArea
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          label={label}
          placeholder={placeholder}
          disabled={true}
          labelExtra={labelExtra}
        />
      )
      .toJSON();
    expect(textArea).toMatchSnapshot();
  });
});

describe("CustomSelect : ", () => {
  it("renders a snapshot of <CustomSelect  /> with mock Prop values, a test width of 50 and  the isMultiple prop set at false", () => {
    const customSelect = renderer
      .create(
        <CustomSelect
          label={label}
          onChange={handleChange}
          value="mockValue"
          error="mockError"
          placeholder={placeholder}
          isMultiple={false}
          list={mockSelectOptions}
          width={50}
        />
      )
      .toJSON();

    expect(customSelect).toMatchSnapshot();
  });
});

describe("Button : ", () => {
  it("renders a snapshot of <Button /> when the loading prop is false or not supplied", () => {
    const btn = renderer
      .create(<Button onClick={handleClick} disabled={false} />)
      .toJSON();
    expect(btn).toMatchSnapshot();
  });

  it("renders a snapshot of <Button /> when the loading prop is true and disabled prop is false", () => {
    const btn = renderer
      .create(<Button onClick={handleClick} disabled={false} loading={true} />)
      .toJSON();
    expect(btn).toMatchSnapshot();
  });
  it("renders a snapshot of <Button /> when the loading prop is true and disabled prop is false", () => {
    const btn = renderer
      .create(<Button onClick={handleClick} disabled={true} loading={false} />)
      .toJSON();
    expect(btn).toMatchSnapshot();
  });
  it("renders a snapshot of <Button /> when the loading prop is true and disabled prop is false", () => {
    const btn = renderer
      .create(<Button onClick={handleClick} disabled={true} loading={true} />)
      .toJSON();
    expect(btn).toMatchSnapshot();
  });
});
