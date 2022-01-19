import renderer from "react-test-renderer";
import { ProductInput } from "../ProductInput";

describe("ProductInput : ", () => {
  it("renders a snapshot of <ProductInput /> with mock props and no errorMessage", () => {
    const productInput = renderer
      .create(
        <ProductInput
          prefix="mockPrefix"
          placeholder="mockPlaceholder"
          name="mockName"
          errorMessage=""
        />
      )
      .toJSON();
    expect(productInput).toMatchSnapshot();
  });

  it("renders a snapshot of <ProductInput /> with mock props and a mock errorMessage", () => {
    const productInput = renderer
      .create(
        <ProductInput
          prefix="mockPrefix"
          placeholder="mockPlaceholder"
          name="mockName"
          errorMessage="mockErrorMessage"
        />
      )
      .toJSON();
    expect(productInput).toMatchSnapshot();
  });
});
