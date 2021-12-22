import renderer from "react-test-renderer";
import { Meta } from "../Meta";

it("renders a snapshot of <Meta />", () => {
  const metaElement = renderer
    .create(
      <Meta
        title="mockTitle"
        description="This is  a mock description"
        keywords="mockKeyword"
      />
    )
    .toJSON();
  expect(metaElement).toMatchSnapshot();
});
