import { MobileProductCard, AllProductsTableHeader } from "../index";
import renderer from "react-test-renderer";

const mockItem = {
  date_created: new Date("November 24, 2021 03:24:00"),
  status: 0,
};
describe("MobileProductCard : ", () => {});

describe("AllProductsTableHeader : ", () => {
  it("renders a snapshot of the data in AllProductsTableHeader ", () => {
    expect(AllProductsTableHeader).toMatchSnapshot();
  });
});
