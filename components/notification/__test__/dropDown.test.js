import { NotificationDropdown } from "../Dropdown";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));

const mockNotification = [
  { id: 0, contents: "mockContent", action_time: "2022-01-20 10:26:44" },
  { id: 1, contents: "mockContent 1", action_time: "2022-01-21 10:26:44" },
  { id: 2, contents: "mockContent 2", action_time: "2022-01-22 10:25:44" },
  { id: 3, contents: "mockContent 3", action_time: "2022-01-23 10:26:24" },
  { id: 4, contents: "mockContent 4", action_time: "2022-01-24 10:11:34" },
  { id: 5, contents: "mockContent 5", action_time: "2022-01-26 10:28:44" },
  { id: 6, contents: "mockContent 6", action_time: "2022-01-28 10:27:44" },
];

const mockState = {
  auth: "",
  domain: "",
  store: "",
  utils: "",
  product: "",
  notification: mockNotification,
};
it("renders a snapshot of <BecomeAnAffiliate />", () => {
  const dropdown = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <NotificationDropdown />
      </Provider>
    )
    .toJSON();
  expect(dropdown).toMatchSnapshot();
});
