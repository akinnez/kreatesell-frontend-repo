import NotificationsItem from '..';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {initializeStore} from 'redux/store';

const mockState = {auth: '', domain: '', store: '', utils: '', product: ''};

const mockProps = {
	is_read: true,
	id: 'mockId',
	notification_type: 'affiliate request',
	name: 'mock name',
	product_name: 'mock Product name',
	created_at: '12/5/2022',
	product_img: 'https://www.mockProductName',
	product_name: 'mockProductName',
};

it('renders a snapshot of <NotificationsItem />', () => {
	const el = renderer
		.create(
			<Provider store={initializeStore(mockState)}>
				<NotificationsItem notification={mockProps} />
			</Provider>
		)
		.toJSON();
	expect(el).toMatchSnapshot();
});
