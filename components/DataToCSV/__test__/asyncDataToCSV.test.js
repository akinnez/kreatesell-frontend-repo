import AsyncDataToCSV from "../AsyncDataToCSV";
import renderer from "react-test-renderer";

it("renders a snapshot of <AsyncDataToCSV />", () => {
  const toCSV = renderer.create(<AsyncDataToCSV />).toJSON();
  expect(toCSV).toMatchSnapshot();
});
