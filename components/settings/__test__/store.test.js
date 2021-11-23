import StoreSettings from "../Store";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <StoreSettings />", () => {
  const storeSettings = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <StoreSettings />
      </Provider>
    )
    .toJSON();
  expect(storeSettings).toMatchSnapshot();
});
