import SyncDataToCSV from "../SyncDataToCSV";
import renderer from "react-test-renderer";

it("renders a snapshot of <SyncDataToCSV />", () => {
  const toCSV = renderer.create(<SyncDataToCSV />).toJSON();
  expect(toCSV).toMatchSnapshot();
});
