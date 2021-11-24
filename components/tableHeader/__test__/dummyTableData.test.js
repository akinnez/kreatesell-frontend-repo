import { ProductsTableData } from "../dummyTableData";
import renderer from "react-test-renderer";

it("renders a snapshot of the dummy data for the dummyTableData", () => {
  expect(ProductsTableData).toMatchSnapshot();
});
