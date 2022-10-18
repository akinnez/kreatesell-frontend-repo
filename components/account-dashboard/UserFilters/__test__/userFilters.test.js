import UserFilters from '..';
import renderer from 'react-test-renderer';

Object.defineProperty(window, 'matchMedia', {
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

const mockProps = {
	data: [],
	setFiltered: jest.fn(),
	searchQuery: '',
};
it('renders a snapshot of <UserFilters /> with mock props', () => {
	const filter = renderer.create(<UserFilters {...mockProps} />).toJSON();
	expect(filter).toMatchSnapshot();
});
