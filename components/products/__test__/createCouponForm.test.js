import renderer from "react-test-renderer";
import { CreateCouponForm } from "../CreateCouponForm";

it("renders a snapshot of <CreateCouponForm />", () => {
  const elem = renderer.create(<CreateCouponForm />).toJSON();
  expect(elem).toMatchSnapshot();
});
