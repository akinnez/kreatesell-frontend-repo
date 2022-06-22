import ProductKreator from "..";
import renderer from "react-test-renderer";

const mockProps = {
  KreatorImage: "https://mockImage.com",
  storeName: "mockstoreName",
};

describe("ProductKreator : ", () => {
  it("renders a snapshot of <ProductKreator /> with mock props when a KreatorName is supplied", () => {
    const el = renderer
      .create(<ProductKreator {...mockProps} kreatorName="mockName" />)
      .toJSON();
    expect(el).toMatchSnapshot();
  });

  it("renders a snapshot of <ProductKreator /> with mock props when no Kreator name is supplied", () => {
    const el = renderer.create(<ProductKreator {...mockProps} />).toJSON();
    expect(el).toMatchSnapshot();
  });
});
