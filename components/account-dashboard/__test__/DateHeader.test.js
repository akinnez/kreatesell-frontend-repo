import renderer from "react-test-renderer";
import { DateHeader } from "../DateHeader";

describe("DateHeader", () => {
  it("renders snapshot for when showSelect is true", () => {
    const dateHeader = renderer
      .create(<DateHeader showSelect={true} />)
      .toJSON();
    expect(dateHeader).toMatchSnapshot();
  });
  it("renders snapshot for when showSelect is false", () => {
    const dateHeader = renderer
      .create(<DateHeader showSelect={false} />)
      .toJSON();
    expect(dateHeader).toMatchSnapshot();
  });
});
