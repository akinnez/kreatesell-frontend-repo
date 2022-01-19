import renderer from "react-test-renderer";
import { Footer } from "../Footer";

it("renders a snapshot of <Footer />", () => {
  const footerElement = renderer.create(<Footer />).toJSON();
  expect(footerElement).toMatchSnapshot();
});
