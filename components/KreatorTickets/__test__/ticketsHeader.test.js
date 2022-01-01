import renderer from "react-test-renderer";
import { TicketsHeader } from "../TicketsHeader";

const handleSearchInput = jest.fn();
const handleDurationInput = jest.fn();
const handleProductStatus = jest.fn();
const handleStartDate = jest.fn();
const handleEndDate = jest.fn();
const handleDateToInput = jest.fn();
const handleSearchSubmit = jest.fn();
const productStatusOptions = jest.fn();

const props = {
  handleSearchInput,
  handleDurationInput,
  handleProductStatus,
  handleStartDate,
  handleEndDate,
  handleDateToInput,
  handleSearchSubmit,
  productStatusOptions,
};

it("renders a snapshot of <TicketsHeader />", () => {
  const ticketsHeader = renderer.create(<TicketsHeader {...props} />).toJSON();
  expect(ticketsHeader).toMatchSnapshot();
});
