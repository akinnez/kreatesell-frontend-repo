import renderer from "react-test-renderer";
import ResourceDrop from "../ResourcesDrop";

it("renders a snapshot of <ResourceDrop /> with mockValues", () => {
  const navResourceDrop = renderer
    .create(<ResourceDrop leftOffset="200" handleMouseLeave={jest.fn()} />)
    .toJSON();

  expect(navResourceDrop).toMatchSnapshot();
});
