import renderer from "react-test-renderer";
import { Modal } from "../Modal";

describe("Modal : ", () => {
  it("renders a snapshot of <Modal /> with mock props", () => {
    const modal = renderer.create(<Modal />).toJSON();
    expect(modal).toMatchSnapshot();
  });
});
