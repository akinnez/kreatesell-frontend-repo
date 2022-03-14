import BankInformation from "..";
import renderer from "react-test-renderer";

const mockProps = {
  bankDetails: {
    account_number: "02772727272",
    account_name: "Salvo Agency Intl",
    bank_name: "salvo Bank",
    currency: "NGN",
  },
};

const mockPropsTwo = (id) => ({
  ...mockProps,
  country_id: id,
});

describe("BankInformation: ", () => {
  it("renders a snapshot of <BankInformation /> when the country_id is neither 1 nor 72", () => {
    const bankInfo = renderer
      .create(<BankInformation {...mockProps} />)
      .toJSON();
    expect(bankInfo).toMatchSnapshot();
  });
  it("renders a snapshot of <BankInformation /> when the country_id is 1 ", () => {
    const bankInfo = renderer
      .create(<BankInformation {...mockPropsTwo("1")} />)
      .toJSON();
    expect(bankInfo).toMatchSnapshot();
  });
  it("renders a snapshot of <BankInformation /> when the country_id is 72 ", () => {
    const bankInfo = renderer
      .create(<BankInformation {...mockPropsTwo("72")} />)
      .toJSON();
    expect(bankInfo).toMatchSnapshot();
  });
});
