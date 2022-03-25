import { CouponHeader } from "../CouponHeader";
import renderer from "react-test-renderer";

const mockProps = {
  handleSearchInput: jest.fn(),
  handleProductStatus: jest.fn(),
  handleSearchDate: jest.fn(),
  handleEndDate: jest.fn(),
  handleSearchSubmit: jest.fn(),
  productStatusOption: "",
};

it("renders a snapshot of <CouponHeader />", () => {
  const header = renderer.create(<CouponHeader {...mockProps} />).toJSON();
  expect(header).toMatchSnapshot();
});
