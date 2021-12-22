import renderer from "react-test-renderer";
import { Button } from "../Button";

describe("Button based on background-color passed", () => {
  it("renders a correct snapshot of <Button  /> with no Icons and defaults of text, bgColor and type props used in the render", () => {
    const btn = renderer.create(<Button />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it("renders a correct snapshot of <Button  /> with bgColor='blue' and  defaults of text ,type props used in the render", () => {
    const btn = renderer.create(<Button bgColor="blue" />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it("renders a correct snapshot of <Button  /> with bgColor='primaryBlue' and  defaults of text ,type props used in the render", () => {
    const btn = renderer.create(<Button bgColor="primaryBlue" />).toJSON();
    expect(btn).toMatchSnapshot();
  });
});

describe("Button snapshot when passed icons and a backgroundColor", () => {
  it("renders a snapshot of <Button /> when passed in only the leftIcon prop and other default props", () => {
    const btn = renderer.create(<Button leftIcon={true} />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it("renders a snapshot of <Button /> when passed in only the icon prop and other default props", () => {
    const btn = renderer.create(<Button icon={true} />).toJSON();
    expect(btn).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("renders a snapshot of Button when passed both icon props and default props", () => {
    const btn = renderer
      .create(<Button icon={true} leftIcon={true} />)
      .toJSON();
    expect(btn).toMatchSnapshot();
  });
});
