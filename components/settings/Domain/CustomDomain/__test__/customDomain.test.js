import { CustomDomain } from "../CustomDomain";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../../redux/store";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <CustomDomain />", () => {
  const customDomain = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <CustomDomain />
      </Provider>
    )
    .toJSON();
  expect(customDomain).toMatchSnapshot();
});
