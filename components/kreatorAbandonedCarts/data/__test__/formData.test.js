import { emailTags } from "../formData";

it("renders a snapshot of emailTags data", () => {
  expect(emailTags).toMatchSnapshot();
});
