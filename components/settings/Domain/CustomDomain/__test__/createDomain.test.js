import { CreateDomain } from "../CreateDomain";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../../redux/store";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <CreateDomain /> ", () => {
  const createDomain = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <CreateDomain />
      </Provider>
    )
    .toJSON();
  expect(createDomain).toMatchSnapshot();
});
