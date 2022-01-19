import renderer from "react-test-renderer";
import { Modal } from "../Modal";

const handleClose = jest.fn();
describe("Modal : ", () => {
  it("renders a snapshot of <Modal /> with mock props", () => {
    const modal = renderer.create(<Modal />).toJSON();
    expect(modal).toMatchSnapshot();
  });
  it("renders a snapshot of <Modal /> with mock props and closeButton and cancelPropagation both at true and visible set at false", () => {
    const modal = renderer
      .create(
        <Modal
          onClose={handleClose}
          closeButton={false}
          cancelPropagation={false}
          visible={false}
        />
      )
      .toJSON();
    expect(modal).toMatchSnapshot();
  });
  it("renders a snapshot of <Modal /> with mock props and closeButton set at false and cancelPropagation at false,  visible set at false", () => {
    const modal = renderer
      .create(
        <Modal
          onClose={handleClose}
          closeButton={false}
          cancelPropagation={true}
          visible={false}
        />
      )
      .toJSON();
    expect(modal).toMatchSnapshot();
  });
  it("renders a snapshot of <Modal /> with mock props and closeButton set at false and cancelPropagation at false,  visible set at true", () => {
    const modal = renderer
      .create(
        <Modal
          onClose={handleClose}
          closeButton={false}
          cancelPropagation={false}
          visible={true}
        />
      )
      .toJSON();
    expect(modal).toMatchSnapshot();
  });
  it("renders a snapshot of <Modal /> with mock props and closeButton set at false and cancelPropagation at true,  visible set at true", () => {
    const modal = renderer
      .create(
        <Modal
          onClose={handleClose}
          closeButton={false}
          cancelPropagation={true}
          visible={true}
        />
      )
      .toJSON();
    expect(modal).toMatchSnapshot();
  });

  // @btnClose = true, too many re-renders happen.
});
