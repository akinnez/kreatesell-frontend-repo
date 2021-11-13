import renderer from "react-test-renderer";
import { Row } from "../index";

const MockChild = () => <div>mock child</div>;
it("renders a snapshot of <Row />", () => {
  const row = renderer
    .create(
      <Row>
        <MockChild />
      </Row>
    )
    .toJSON();

  expect(row).toMatchSnapshot();
});
