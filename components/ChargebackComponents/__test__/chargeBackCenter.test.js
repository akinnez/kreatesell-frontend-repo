import ChargeBackCenter from '../ChargeBackCenter';
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

it('renders a snapshot of <ChargeBackCenter />', () => {
	const chargeBack = renderer.create(<ChargeBackCenter />).toJSON();
	expect(chargeBack).toMatchSnapshot();
});
