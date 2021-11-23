import { CheckoutProductTab } from "../Checkout";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <CheckoutProductTab />", () => {
  const checkoutProductTab = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <CheckoutProductTab />
      </Provider>
    )
    .toJSON();
  expect(checkoutProductTab).toMatchSnapshot();
});
