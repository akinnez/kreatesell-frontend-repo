import renderer from "react-test-renderer";
import { InputButton } from "../InputButton";

const handleChange = jest.fn();
const mockHandleSubmit = jest.fn();

describe("InputButton : ", () => {
  it("renders a snapshot of <InputButton /> with mock Props and the disabled prop set at false", () => {
    const inputButton = renderer
      .create(
        <InputButton
          onChange={handleChange}
          name="mockName"
          placeholder="mockPlaceholder"
          buttonText="mockBtnText"
          disableBtn={false}
          onSubmit={mockHandleSubmit}
        />
      )
      .toJSON();
    expect(inputButton).toMatchSnapshot();
  });

  it("renders a snapshot of <InputButton /> with mock Props and the disabled prop set at true", () => {
    const inputButton = renderer
      .create(
        <InputButton
          onChange={handleChange}
          name="mockName"
          placeholder="mockPlaceholder"
          buttonText="mockBtnText"
          disableBtn={true}
          onSubmit={mockHandleSubmit}
        />
      )
      .toJSON();
    expect(inputButton).toMatchSnapshot();
  });
});
