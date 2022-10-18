import PayoutsForm from '..';
import {Provider} from 'react-redux';
import {initializeStore} from 'redux/store';
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

const hideModal = jest.fn();

const mockState = {
	auth: '',
	domain: '',
	store: '',
	utils: {countries: ['Nigeria', 'Uganda', 'Ghana']},
	product: '',
};

describe('PayoutsForm : ', () => {
	it('renders a snapshot of <PayoutsForm /> when show is false', () => {
		const el = mount(
			<Provider store={initializeStore(mockState)}>
				<PayoutsForm hide={hideModal} show={false} />
			</Provider>
		);
		expect(EnzymeToJson(el)).toMatchSnapshot();
	});
	it('renders a snapshot of <PayoutsForm /> when show is true', () => {
		const el = mount(
			<Provider store={initializeStore(mockState)}>
				<PayoutsForm hide={hideModal} show={true} />
			</Provider>
		);
		expect(EnzymeToJson(el)).toMatchSnapshot();
	});
});
