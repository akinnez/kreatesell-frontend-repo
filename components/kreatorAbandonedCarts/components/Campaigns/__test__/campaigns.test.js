import Campaigns from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <Campaigns />", () => {
  const el = renderer.create(<Campaigns />).toJSON();
  expect(el).toMatchSnapshot();
});
