import renderer from "react-test-renderer";
import { Shop, OneTimeSubscriptionIcon } from "../index";

const mockPrimaryColor = "mockColor";
const mockClassName = "mockClass";

describe("Shop :", () => {
  it("renders a snapshot of <Shop /> with mock values of primaryColor and className and the active Prop at true", () => {
    const shop = renderer
      .create(
        <Shop
          active={true}
          primaryColor={mockPrimaryColor}
          className={mockClassName}
        />
      )
      .toJSON();
    expect(shop).toMatchSnapshot();
  });
  it("renders a snapshot of <Shop /> with mock values of primaryColor and className and the active Prop at false", () => {
    const shop = renderer
      .create(
        <Shop
          active={false}
          primaryColor={mockPrimaryColor}
          className={mockClassName}
        />
      )
      .toJSON();
    expect(shop).toMatchSnapshot();
  });
});

describe("OneTimeSubscriptionIcon : ", () => {
  it("renders a snapshot of <OneTimeSubscription /> with active set to true and onHover at false", () => {
    const oneTimeSub = renderer
      .create(<OneTimeSubscriptionIcon active={true} onHover={false} />)
      .toJSON();
    expect(oneTimeSub).toMatchSnapshot();
  });
  it("renders a snapshot of <OneTimeSubscription /> with active set to false and onHover at true", () => {
    const oneTimeSub = renderer
      .create(<OneTimeSubscriptionIcon active={false} onHover={true} />)
      .toJSON();
    expect(oneTimeSub).toMatchSnapshot();
  });
  it("renders a snapshot of <OneTimeSubscription /> with both props set at false", () => {
    const oneTimeSub = renderer
      .create(<OneTimeSubscriptionIcon active={false} onHover={false} />)
      .toJSON();
    expect(oneTimeSub).toMatchSnapshot();
  });
  it("renders a snapshot of <OneTimeSubscription /> with both props set at true", () => {
    const oneTimeSub = renderer
      .create(<OneTimeSubscriptionIcon active={true} onHover={true} />)
      .toJSON();
    expect(oneTimeSub).toMatchSnapshot();
  });
});
