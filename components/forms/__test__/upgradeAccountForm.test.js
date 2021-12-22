import { UpgradeAccountForm } from "../UpgradeAccountForm";
import renderer from "react-test-renderer";

it("renders a snapshot of <UpgradeAccountForm />", () => {
  const form = renderer.create(<UpgradeAccountForm />).toJSON();
  expect(form).toMatchSnapshot();
});
