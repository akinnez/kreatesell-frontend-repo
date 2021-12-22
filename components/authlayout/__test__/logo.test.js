import Logo, { MobileLogo } from "../logo";
import renderer from "react-test-renderer";

describe("Logo :", () => {
  it("renders a snapshot of <Logo />", () => {
    const logo = renderer.create(<Logo />).toJSON();
    expect(logo).toMatchSnapshot();
  });
});

describe("MobileLogo :", () => {
  it("renders a snapshot of <MobileLogo />", () => {
    const mobileLogo = renderer.create(<MobileLogo />).toJSON();
    expect(mobileLogo).toMatchSnapshot();
  });
});
