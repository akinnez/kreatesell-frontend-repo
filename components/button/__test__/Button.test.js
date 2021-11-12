import renderer from "react-test-renderer";
import { Button } from "../Button";

it("renders a correct snapshot of <Button />", () => {
  const elem = renderer.create(<Button />).toJSON();
  console.log(elem);
});
