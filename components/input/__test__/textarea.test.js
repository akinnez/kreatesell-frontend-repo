import renderer from "react-test-renderer";
import { TextArea } from "../TextArea";

describe("TextArea :  ", () => {
  it("renders a snapshot of <TextArea /> with mock props and no value for errorMessage", () => {
    const textArea = renderer
      .create(
        <TextArea
          name="mockName"
          label="mockLabel"
          errorMessage=""
          placeholder="mockPlaceholder"
        />
      )
      .toJSON();
    expect(textArea).toMatchSnapshot();
  });

  it("renders a snapshot of <TextArea /> with mock props and a mock value for the errorMessage prop", () => {
    const textArea = renderer
      .create(
        <TextArea
          name="mockName"
          label="mockLabel"
          errorMessage="mockErrorMessage"
          placeholder="mockPlaceholder"
        />
      )
      .toJSON();
    expect(textArea).toMatchSnapshot();
  });
});
