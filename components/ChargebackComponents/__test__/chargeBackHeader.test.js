import {ChargeBackHeader} from '../ChargeBackHeader';
import renderer from 'react-test-renderer';

const mockProps = {
	handleSearchInput: jest.fn(),
	handleDurationInput: jest.fn(),
	handleProductStatus: jest.fn(),
	handleStartDate: jest.fn(),
	handleEndDate: jest.fn(),
	handleDateToInput: jest.fn(),
	handleSearchSubmit: jest.fn(),
};

it('renders a snapshot of <ChargeBackHeader /> with mock props', () => {
	const el = renderer.create(<ChargeBackHeader {...mockProps} />).toJSON();
	expect(el).toMatchSnapshot();
});
