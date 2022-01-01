import renderer from "react-test-renderer";
import { CookiePolicy } from "../CookiePolicy";

it("renders a snapshot of <CookiePolicy />", () => {
  const cookiesPolicy = renderer.create(<CookiePolicy />).toJSON();
  expect(cookiesPolicy).toMatchSnapshot();
});
