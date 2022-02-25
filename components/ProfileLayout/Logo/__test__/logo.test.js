import Logo from "..";
import renderer from "react-test-renderer";

it("renders a snapshot of <Logo />", () => {
  const logo = renderer.create(<Logo />).toJSON();
  expect(logo).toMatchSnapshot();
});
