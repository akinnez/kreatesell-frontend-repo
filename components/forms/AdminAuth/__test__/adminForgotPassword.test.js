import { AdminForgotPasswordForm } from "../AdminForgotPasswordForm";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../../redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));
const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <AdminForgotPasswordForm/>", () => {
  const form = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <AdminForgotPasswordForm />
      </Provider>
    )
    .toJSON();
  expect(form).toMatchSnapshot();
});
