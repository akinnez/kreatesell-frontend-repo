import renderer from "react-test-renderer";
import CustomErrorPage from "../CustomErrorPage";

it("renders a snapshot of the <CustomErrorPage />", () => {
  const errorPage = renderer.create(<CustomErrorPage />).toJSON();
  expect(errorPage).toMatchSnapshot();
});
