import renderer from "react-test-renderer";
import NotificationsDropdown from "..";
import { Provider } from "react-redux";
import { initializeStore } from "redux/store";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <NotificationsDropdown />", () => {
  const el = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <NotificationsDropdown />
      </Provider>
    )
    .toJSON();
  expect(el).toMatchSnapshot();
});
