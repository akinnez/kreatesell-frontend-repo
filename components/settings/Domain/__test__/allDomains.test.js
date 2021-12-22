import { AllDomains } from "../AllDomains";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../redux/store";
import renderer from "react-test-renderer";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

test("AllDomains : ", () => {
  const allDomains = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <AllDomains />
      </Provider>
    )
    .toJSON();
  expect(allDomains).toMatchSnapshot();
});
