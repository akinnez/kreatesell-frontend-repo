import BecomeAnAffiliate from '..';
import * as nextRouter from 'next/router';
import {Provider} from 'react-redux';
import {initializeStore} from '../../../../../redux/store';
import EnzymeToJson from 'enzyme-to-json';
import {mount, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({
	route: '/',
}));

const mockState = {auth: '', domain: '', store: '', utils: '', product: ''};
it('renders a snapshot of <BecomeAnAffiliate />', () => {
	const el = mount(
		<Provider store={initializeStore(mockState)}>
			<BecomeAnAffiliate />
		</Provider>
	);
	expect(EnzymeToJson(el)).toMatchSnapshot();
});
