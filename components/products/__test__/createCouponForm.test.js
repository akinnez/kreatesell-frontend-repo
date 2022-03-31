import { CreateCouponForm } from "../CreateCouponForm";
import renderer from "react-test-renderer";

it("renders a snapshot of <CreateCouponForm />", () => {
  const form = renderer.create(<CreateCouponForm />).toJSON();
  expect(form).toMatchSnapshot();
});
