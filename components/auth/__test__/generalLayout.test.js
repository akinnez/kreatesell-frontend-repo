import { GeneralLayout } from "../GeneralLayout";
import renderer from "react-test-renderer";
import {
  ForgotPasswordForm,
  ResetPasswordForm,
  UpgradeAccountForm,
} from "../../forms";
import * as nextRouter from "next/router";
import { Provider } from "react-redux";
import { initializeStore } from "../../../redux/store";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

const mockState = { auth: "", domain: "", store: "", utils: "", product: "" };

describe("GeneralLayout : ", () => {
  it("renders a snapshot of <GeneralLayout /> using <ForgotPasswordForm /> as a test case", () => {
    const generalLayout = renderer
      .create(
        <Provider store={initializeStore(mockState)}>
          <GeneralLayout
            Form={ForgotPasswordForm}
            formTitle="Forgot Password"
            title="KreateSell | Forgot Password"
            subTitle="Enter your email and a reset token will be sent to you"
            socialBtn={false}
            subTitleOpacity={true}
          />
        </Provider>
      )
      .toJSON();
    expect(generalLayout).toMatchSnapshot();
  });
  it("renders a snapshot of <GeneralLayout /> using <ResetPasswordForm /> as a test case", () => {
    const generalLayout = renderer
      .create(
        <Provider store={initializeStore(mockState)}>
          <GeneralLayout
            Form={ResetPasswordForm}
            formTitle="Forgot Password"
            title="KreateSell | Forgot Password"
            subTitle="Set up a new password"
            socialBtn={false}
          />
        </Provider>
      )
      .toJSON();
    expect(generalLayout).toMatchSnapshot();
  });
  it("renders a snapshot of <GeneralLayout /> using <UpgradeAccountForm /> as a test case", () => {
    const generalLayout = renderer
      .create(
        <Provider store={initializeStore(mockState)}>
          <GeneralLayout
            Form={UpgradeAccountForm}
            formTitle="Forgot Password"
            title="KreateSell | Forgot Password"
            subTitle="Set up a new password"
            socialBtn={false}
          />
        </Provider>
      )
      .toJSON();
    expect(generalLayout).toMatchSnapshot();
  });
});
