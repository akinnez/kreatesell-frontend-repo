import { VerifyResetPasswordTokenForm } from "../VerifyResetPasswordTokenForm";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));
const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <VerifyResetPasswordTokenForm/>", () => {
  const form = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <VerifyResetPasswordTokenForm />
      </Provider>
    )
    .toJSON();
  expect(form).toMatchSnapshot();
});
