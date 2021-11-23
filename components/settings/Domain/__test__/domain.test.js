import Domain from "../Domain";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../redux/store";
import renderer from "react-test-renderer";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <Domain />", () => {
  const domain = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <Domain />
      </Provider>
    )
    .toJSON();
  expect(domain).toMatchSnapshot();
});
