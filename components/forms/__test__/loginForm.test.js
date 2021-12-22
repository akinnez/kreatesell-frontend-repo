import renderer from "react-test-renderer";
import { LoginForm } from "../LoginForm";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));
const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <LoginForm />", () => {
  const form = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <LoginForm />
      </Provider>
    )
    .toJSON();
  expect(form).toMatchSnapshot();
});
