import renderer from "react-test-renderer";
import SyncDataToCSV from "../SyncDataToCSV";

it("renders a snapshot of <SyncDataToCSV", () => {
  const toCSV = renderer.create(<SyncDataToCSV />).toJSON();
  expect(toCSV).toMatchSnapshot();
});
