import renderer from "react-test-renderer";
import HelpHeader from "../header";

it("renders a snapshot of <HelpHeader />", () => {
  const header = renderer.create(<HelpHeader />).toJSON();
  expect(header).toMatchSnapshot();
});
