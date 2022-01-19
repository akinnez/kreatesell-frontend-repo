import { RecentAnalytics as Recent } from "../Recent";
import renderer from "react-test-renderer";

test("renders snapshot of <Recent /> correctly", () => {
  const elem = renderer.create(<Recent />).toJSON();
  expect(elem).toMatchSnapshot();
});
