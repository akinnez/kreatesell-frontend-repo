import Nav from "../header";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/mock-path-to-home",
}));
const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <Nav />", () => {
  const nav = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <Nav />
      </Provider>
    )
    .toJSON();

  expect(nav).toMatchSnapshot();
});
