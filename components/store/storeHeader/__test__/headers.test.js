import {ProtectedStoreHeader, StoreHeader} from '../index';
import renderer from 'react-test-renderer';

const mockProps = {
	storeName: 'mockStoreName',
	coverImage: 'mockImage',
	displayPicture: '..',
	brandName: 'mockBrandName',
	social: {
		facebook: 'mockFacebookName',
		twitter: 'mockTwitterName',
		instagram: 'mockInstagramName',
		linkedIn: 'mockLinkedInName',
	},
	publicStoreInfo: {
		cover_page: 1,
		display_picture: '...',
		brand_name: 'mockBrandName',
		store_name: 'mockStoreName',
		facebook: 'mockFacebookName',
		twitter: 'mockTwitterName',
		instagram: 'mockInstagramName',
		linkedIn: 'mockLinkedInName',
	},
};

describe('StoreHeader : ', () => {
	it('renders a snapshot of <StoreHeader />', () => {
		const header = renderer.create(<StoreHeader />).toJSON();
		expect(header).toMatchSnapshot();
	});
});

describe('ProtectedStoreHeader : ', () => {
	it('renders a snapshot of <ProtectedStoreHeader /> with mock props when publicStore is false', () => {
		const header = renderer
			.create(<ProtectedStoreHeader publicStore={false} {...mockProps} />)
			.toJSON();
		expect(header).toMatchSnapshot();
	});

	it('renders a snapshot of <ProtectedStoreHeader /> with mock props when publicStore is true', () => {
		const header = renderer
			.create(<ProtectedStoreHeader publicStore={true} {...mockProps} />)
			.toJSON();
		expect(header).toMatchSnapshot();
	});
});
