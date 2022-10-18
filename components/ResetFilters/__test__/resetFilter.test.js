import ResetFilters from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	resetFilter: jest.fn(),
};

it('renders a snapshot of <ResetFilters /> with mock props', () => {
	const filter = renderer.create(<ResetFilters {...mockProps} />).toJSON();
	expect(filter).toMatchSnapshot();
});
