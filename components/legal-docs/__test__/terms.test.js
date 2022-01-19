import renderer from "react-test-renderer";
import { TermsOfService } from "../TermsOfService";

it("renders a snapshot of <TermsOfService />", () => {
  const terms = renderer.create(<TermsOfService />).toJSON();
  expect(terms).toMatchSnapshot();
});
