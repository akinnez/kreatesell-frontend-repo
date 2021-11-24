import renderer from "react-test-renderer";
import Social from "../social-media";

it("renders a snapshot of <Social />", () => {
  const socialEl = renderer.create(<Social />).toJSON();
  expect(socialEl).toMatchSnapshot();
});
