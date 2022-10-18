import Header from '..';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {initializeStore} from 'redux/store';

const mockState = {auth: '', domain: '', store: '', utils: '', product: ''};

it('renders a snapshot of <Header />', () => {
	const header = renderer
		.create(
			<Provider store={initializeStore(mockState)}>
				<Header />
			</Provider>
		)
		.toJSON();
	expect(header).toMatchSnapshot();
});
