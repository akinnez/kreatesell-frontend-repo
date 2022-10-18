import CustomCheckoutSelect from '../CustomCheckout';
import EnzymeToJson from 'enzyme-to-json';
import {mount, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

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
	title: 'mockTitle',
	field: [
		{amount: 300, currency: 'NGN'},
		{amount: 400, currency: 'GHC'},
	],
	setField: jest.fn(),
};

it('renders a snapshot of <CustomCheckoutSelect /> with mock props', () => {
	const customCheckOut = mount(<CustomCheckoutSelect {...mockProps} />);

	expect(EnzymeToJson(customCheckOut)).toMatchSnapshot();
});
