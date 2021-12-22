import renderer from "react-test-renderer";
import { FormError } from "../FormError";

const mockErrors = {
  mockErrorOne: "isRequired",
  mockErrorTwo: "isRequired",
};
it("renders a snapshot of <FormError />", () => {
  const formErrorElement = renderer
    .create(<FormError errors={mockErrors} />)
    .toJSON();
  expect(formErrorElement).toMatchSnapshot();
});
