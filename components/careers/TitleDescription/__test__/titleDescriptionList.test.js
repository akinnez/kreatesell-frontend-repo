import renderer from "react-test-renderer";
import TitleDescriptionList from "../TitleDescriptionList";

const mockProps = {
  title: "Benefits",
  subtitle: null,
  list: [
    "Attractive Salary",
    "Provision of quality Health Insurance.",
    "Access to Certification Training Materials.",
    "Conducive Work Environment.",
    "Flexible office time.",
  ],
};

it("renders a snapshot of <TitleDescriptionList /> with mock props", () => {
  const list = renderer
    .create(<TitleDescriptionList {...mockProps} />)
    .toJSON();
  expect(list).toMatchSnapshot();
});
