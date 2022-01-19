import renderer from "react-test-renderer";
import { Card } from "../index";

const MockComponent = () => <div>card mock Children</div>;
it("renders a snapshot of the Card component", () => {
  const card = renderer
    .create(
      <Card>
        <MockComponent />
      </Card>
    )
    .toJSON();
  expect(card).toMatchSnapshot();
});
