import AbandonedCartsForm from "../index";
import renderer from "react-test-renderer";
import { editMailData } from "../../../data/editMailData";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

it("renders a snapshot of <AbandonedCartsForm />", () => {
  const form = renderer
    .create(<AbandonedCartsForm editMailData={editMailData} />)
    .toJSON();
  expect(form).toMatchSnapshot();
});
