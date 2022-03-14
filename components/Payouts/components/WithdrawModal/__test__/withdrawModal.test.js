import WithdrawModal from "..";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const mockProps = {
  hideModal: jest.fn(),
  showSuccess: jest.fn(),
  balance: "0",
  bankDetails: {
    account_number: "02772727272",
    account_name: "Salvo Agency Intl",
    bank_name: "salvo Bank",
    currency: "NGN",
    country_id: "1",
  },
};

describe("WithdrawModal: ", () => {
  it("renders a snapshot of <WithdrawModal /> when withdrawModal is false", () => {
    const el = mount(
      <WithdrawModal {...mockProps} WithdrawModal={false}>
        mock child
      </WithdrawModal>
    );
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
  it("renders a snapshot of <WithdrawModal /> when withdrawModal is true", () => {
    const el = mount(
      <WithdrawModal {...mockProps} WithdrawModal={true}>
        mock child
      </WithdrawModal>
    );
    expect(EnzymeToJson(el)).toMatchSnapshot();
  });
});
