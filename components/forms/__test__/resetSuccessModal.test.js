import { ResetPasswordSuccesModal } from "../ResetSuccesModal";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));

it("renders a snapshot of <ResetPasswordSuccesModal />", () => {
  const form = renderer.create(<ResetPasswordSuccesModal />).toJSON();
  expect(form).toMatchSnapshot();
});
