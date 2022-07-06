import ProductDetails from "..";
import renderer from "react-test-renderer";

const mockProps = {
  kreatorName: "mock kreatorName",
  productType: "digital product",
  currency: "NGN",
  price: 2500,
  sold: 250,
  visits: 20,
  commission: 10,
};

it("renders a snapshot of <ProductDetails /> with mock props", () => {
  const details = renderer.create(<ProductDetails {...mockProps} />).toJSON();
  expect(details).toMatchSnapshot();
});
