import renderer from "react-test-renderer";
import { Select } from "../Select";

const mockOptions = ["opt1", "opt2", "opt3"];
it("renders a snapshot of <Select /> with mock props", () => {
  const selectBox = renderer
    .create(
      <Select
        options={mockOptions}
        name="mockName"
        placeholder="mockPlaceholder"
        arrowIconColor="blue"
        label="mockLabel"
      />
    )
    .toJSON();
  expect(selectBox).toMatchSnapshot();
});
