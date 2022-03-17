import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import WalletBalance from "..";

configure({ adapter: new Adapter() });

const mockProps = {
  bankDetails: {
    account_number: "02772727272",
    account_name: "Salvo Agency Intl",
    bank_name: "salvo Bank",
    currency: "NGN",
    country_id: "1",
  },
};

it("renders a snapshot of <WalletBalance /> when WalletBalance is false", () => {
  const el = mount(<WalletBalance {...mockProps} />);
  expect(EnzymeToJson(el)).toMatchSnapshot();
});
