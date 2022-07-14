import RequestNotesButton from "..";
import renderer from "react-test-renderer";

const mockProps = {
  notes: [".%&*", "^%$4"],
  showNoteModal: jest.fn(),
};

describe("RequestNotesButton : ", () => {
  it("renders a snapshot of <RequestNotesButton /> with mock props when noteFlag is not supplied", () => {
    const el = renderer.create(<RequestNotesButton {...mockProps} />).toJSON();
    expect(el).toMatchSnapshot();
  });
  it("renders a snapshot of <RequestNotesButton /> with mock props when noteFlag is  supplied", () => {
    const el = renderer
      .create(<RequestNotesButton {...mockProps} noteFlag="Unread" />)
      .toJSON();
    expect(el).toMatchSnapshot();
  });
});
