import Filters from '..';
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
	setStartDate: jest.fn(),
	setEndDate: jest.fn(),
	setProductName: jest.fn(),
};
it('renders a snapshot of <Filters /> using mock props', () => {
	const filter = renderer.create(<Filters {...mockProps} />).toJSON();
	expect(filter).toMatchSnapshot();
});
