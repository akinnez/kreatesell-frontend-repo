import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";
import { CheckoutForm } from "../CheckoutForm";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

describe("CheckoutForm : ", () => {
  it("renders a snapshot of <CheckoutForm />", () => {
    const checkoutForm = renderer.create(
      <Provider store={initializeStore(mockState)}>
        <CheckoutForm />
      </Provider>
    );
    expect(checkoutForm).toMatchSnapshot();
  });
});
