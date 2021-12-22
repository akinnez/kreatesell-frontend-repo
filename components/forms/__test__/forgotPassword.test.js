import { ForgotPasswordForm } from "../ForgotPasswordForm";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));
const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <ForgotPasswordForm />", () => {
  const form = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <ForgotPasswordForm />
      </Provider>
    )
    .toJSON();
  expect(form).toMatchSnapshot();
});
