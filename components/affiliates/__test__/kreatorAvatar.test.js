import KreatorAvatar from "../KreatorAvatar";
import renderer from "react-test-renderer";

it("renders a snapshot of <KreatorAvatar />", () => {
  const avatar = renderer.create(<KreatorAvatar />).toJSON();
  expect(avatar).toMatchSnapshot();
});
