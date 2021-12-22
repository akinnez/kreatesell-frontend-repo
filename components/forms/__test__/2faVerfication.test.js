import { TwoFAVerificationForm } from "../2FAVerificationForm";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));
const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

it("renders a snapshot of <TwoFAVerificationForm />", () => {
  const form = renderer
    .create(
      <Provider store={initializeStore(mockState)}>
        <TwoFAVerificationForm />
      </Provider>
    )
    .toJSON();
  expect(form).toMatchSnapshot();
});
