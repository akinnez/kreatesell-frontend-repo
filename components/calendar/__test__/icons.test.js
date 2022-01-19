import renderer from "react-test-renderer";
import { NextIcon, PreviousIcon } from "../icon";

describe("Icons", () => {
  it("renders a snapshot of the PreviousIcon svg", () => {
    const previousIcon = renderer.create(<PreviousIcon />).toJSON();
    expect(previousIcon).toMatchSnapshot();
  });
  it("renders a snapshot of the NextIcon svg", () => {
    const nextIcon = renderer.create(<NextIcon />).toJSON();
    expect(nextIcon).toMatchSnapshot();
  });
});
