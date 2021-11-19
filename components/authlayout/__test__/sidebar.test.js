import renderer from "react-test-renderer";
import Sidebar from "../sidebar";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <Sidebar />", () => {
  const sideBar = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <Sidebar />
      </Provider>
    )
    .toJSON();
  expect(sideBar).toMatchSnapshot();
});
