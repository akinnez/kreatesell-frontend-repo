import renderer from "react-test-renderer";
import { Checkbox } from "../Checkbox";

const mockHandleChange = jest.fn();
const name = "mockName";
it("renders a snapshot of the Checkbox component", () => {
  const checkBox = renderer.create(
    <Checkbox onChange={mockHandleChange} name={name} />
  );
  expect(checkBox).toMatchSnapshot();
});
