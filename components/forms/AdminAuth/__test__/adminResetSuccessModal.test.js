//
import { AdminResetPasswordSuccesModal } from "../AdminResetSuccesModal";
import renderer from "react-test-renderer";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
  route: "/",
}));

it("renders a snapshot of <AdminResetPasswordSuccesModal/>", () => {
  const form = renderer.create(<AdminResetPasswordSuccesModal />).toJSON();
  expect(form).toMatchSnapshot();
});
