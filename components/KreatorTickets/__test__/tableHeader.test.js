import renderer from "react-test-renderer";
import { AllProductsTableHeader } from "../TableHeader";

it("renders a snapshot of <AllProductsTableHeader />", () => {
  const tableHeader = renderer.create(<AllProductsTableHeader />).toJSON();
  expect(tableHeader).toMatchSnapshot();
});
