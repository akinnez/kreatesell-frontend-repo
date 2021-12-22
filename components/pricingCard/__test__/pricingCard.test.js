import renderer from "react-test-renderer";
import { PricingCard } from "../PricingCard";

const handleBtnClick = jest.fn();
describe("PricingCard : ", () => {
  it("renders a snapshot of <PricingCard /> with no props", () => {
    const pricingCard = renderer.create(<PricingCard />).toJSON();
    expect(pricingCard).toMatchSnapshot();
  });

  it("renders a snapshot of <PricingCard /> with mock props and currentPlan at false", () => {
    const pricingCard = renderer
      .create(
        <PricingCard
          title="mockTitle"
          subTitle="mockSubtitle"
          price={3000}
          btnText="mockBtnText"
          priceType="mockPriceType"
          btnOnClick={handleBtnClick}
          currentPlan={false}
        />
      )
      .toJSON();
    expect(pricingCard).toMatchSnapshot();
  });

  it("renders a snapshot of <PricingCard /> with mock props and currentPlan at true", () => {
    const pricingCard = renderer
      .create(
        <PricingCard
          title="mockTitle"
          subTitle="mockSubtitle"
          price={3000}
          btnText="mockBtnText"
          priceType="mockPriceType"
          btnOnClick={handleBtnClick}
          currentPlan={true}
        />
      )
      .toJSON();
    expect(pricingCard).toMatchSnapshot();
  });
});
