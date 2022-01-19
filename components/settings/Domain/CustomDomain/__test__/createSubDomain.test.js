import { CreateSubDomain } from "../CreateSubDomain";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../../redux/store";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <CreateSubDomain />", () => {
  const createSubDomain = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <CreateSubDomain />
      </Provider>
    )
    .toJSON();
  expect(createSubDomain).toMatchSnapshot();
});
