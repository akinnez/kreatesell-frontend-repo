import EnzymeToJson from 'enzyme-to-json';
import {mount, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Wallet from '..';

configure({adapter: new Adapter()});

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
	bankDetails: {
		account_number: '02772727272',
		account_name: 'Salvo Agency Intl',
		bank_name: 'salvo Bank',
		currency: 'NGN',
		country_id: '1',
	},
};

it('renders a snapshot of <Wallet /> with mock props', () => {
	const el = mount(<Wallet {...mockProps} />);
	expect(EnzymeToJson(el)).toMatchSnapshot();
});
