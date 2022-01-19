import { ProductHeader } from "../ProductHeader";
import renderer from "react-test-renderer";

test("<ProductHeader renders correctly in snapshot", () => {
  const handleSearchInput = jest.fn();
  const handleDurationInput = jest.fn();
  const handleProductTypeInput = jest.fn();
  const handleDateFromInput = jest.fn();
  const handleDateToInput = jest.fn();

  const productHeaderProps = {
    handleSearchInput,
    handleDurationInput,
    handleProductTypeInput,
    handleDateFromInput,
    handleDateToInput,
  };
  const productHeader = renderer
    .create(<ProductHeader {...productHeaderProps} />)
    .toJSON();

  expect(productHeader).toMatchSnapshot();
});
