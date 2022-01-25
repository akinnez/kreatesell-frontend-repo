import Social from "../social-media";
import renderer from "react-test-renderer";

it("renders a snapshot of <Social /> with no props passed!", () => {
  const social = renderer.create(<Social />).toJSON();
  expect(social).toMatchSnapshot();
});
