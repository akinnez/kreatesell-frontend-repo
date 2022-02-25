import CreateProductTab from "..";
import renderer from "react-test-renderer";

it("renders a snapshot  of <CreateProductTab />", () => {
  const tab = renderer.create(<CreateProductTab />).toJSON();
  expect(tab).toMatchSnapshot();
});
