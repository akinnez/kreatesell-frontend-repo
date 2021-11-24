import * as nextRouter from "next/router";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";
import { NotificationDropdown } from "../Dropdown";

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };
nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

it("renders a snapshot of <NotificationDropdown />", () => {
  const dropDown = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <NotificationDropdown />
      </Provider>
    )
    .toJSON();
  expect(dropDown).toMatchSnapshot();
});
