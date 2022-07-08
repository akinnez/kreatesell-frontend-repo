import WalletHistoryMobileView from "..";
import renderer from "react-test-renderer";

const mockProps = {
  histories: [
    {
      id: 1,
      status: "Pending",
      withdrawal_date: "20/12/2022",
      currency: "NGN",
      amount: 1000,
      bank_name: "UBA",
      bank_account: "00093999393",
    },
    {
      id: 2,
      status: "Successful",
      withdrawal_date: "21/12/2022",
      currency: "USD",
      amount: 1000,
      bank_name: "BANK OF AMERICA",
      bank_account: "00393999393",
    },
    {
      id: 3,
      status: "Failed",
      withdrawal_date: "10/12/2022",
      currency: "GBP",
      amount: 1000,
      bank_name: "UBA",
      bank_account: "00123999393",
    },
  ],
};

describe("WalletHistoryMobileView : ", () => {
  it("renders a snapshot of <WalletHistoryMobileView /> when no payouts is supplied ", () => {
    const walletHistoryView = renderer
      .create(<WalletHistoryMobileView histories={[]} />)
      .toJSON();
    expect(walletHistoryView).toMatchSnapshot();
  });
  it("renders a snapshot of <WalletHistoryMobileView /> when payouts data is supplied ", () => {
    const walletHistoryView = renderer
      .create(<WalletHistoryMobileView {...mockProps} />)
      .toJSON();
    expect(walletHistoryView).toMatchSnapshot();
  });
});
