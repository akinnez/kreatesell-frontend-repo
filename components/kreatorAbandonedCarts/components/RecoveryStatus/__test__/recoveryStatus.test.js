import RecoveryStatus from '..';
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

it('renders a snapshot of <RecoveryStatus />', () => {
	const status = renderer.create(<RecoveryStatus />).toJSON();
	expect(status).toMatchSnapshot();
});
