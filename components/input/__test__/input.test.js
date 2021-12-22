import renderer from "react-test-renderer";
import { Input, PasswordInput } from "../input";

describe("Input: ", () => {
  it("renders a snapshot of <Input /> with mock props : ", () => {
    const inputEl = renderer
      .create(
        <Input
          type="text"
          placeholder="mockPlaceHolder"
          name="mockName"
          label="mockLabel"
          errorMessage={false}
        />
      )
      .toJSON();
    expect(inputEl).toMatchSnapshot();
  });
  it("renders a snapshot of <Input /> with mock props : with type set at search and height set at small", () => {
    const inputEl = renderer
      .create(
        <Input
          type="search"
          placeholder="mockPlaceHolder"
          name="mockName"
          label="mockLabel"
          height="small"
          errorMessage=""
        />
      )
      .toJSON();
    expect(inputEl).toMatchSnapshot();
  });
  it("renders a snapshot of <Input /> with mock props : with type set at search and height set at small and errorMessage set at true", () => {
    const inputEl = renderer
      .create(
        <Input
          type="search"
          placeholder="mockPlaceHolder"
          name="mockName"
          label="mockLabel"
          height="small"
          errorMessage="mockErrorMessage"
        />
      )
      .toJSON();
    expect(inputEl).toMatchSnapshot();
  });
});

describe("PasswordInput: ", () => {
  it("renders a snapshot of <PasswordInput />", () => {
    const passwordInput = renderer
      .create(
        <PasswordInput
          label="mockLabel"
          name="mockName"
          placeholder="mockPlaceholder"
        />
      )
      .toJSON();
    expect(passwordInput).toMatchSnapshot();
  });
});
