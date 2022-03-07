import renderer from "react-test-renderer";
import BankModal from "../account-info-form";

it("renders a snapshot of <BankModal />", () => {
  const bankModal = renderer.create(<BankModal />).toJSON();
  expect(bankModal).toMatchSnapshot();
});
