import ActionModal from '..';
import EnzymeToJson from 'enzyme-to-json';
import {mount, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

const mockProps = {
	hideAction: jest.fn(),
	updateStatus: jest.fn(),
	status: 'Approved',
	title: 'mock title',
	requestId: 'mockId',
	affiliate: 'mockAffiliate',
	affiliateId: 'mockId',
	product: 'digital product',
	productId: 'mockProductId',
};

describe('ActionModal : ', () => {
	it('renders a snapshot of <ActionModal /> with no props', () => {
		const el = mount(<ActionModal />);
		expect(EnzymeToJson(el)).toMatchSnapshot();
	});

	it('renders a snapshot of <ActionModal /> with mock props when actionIsVisble is true', () => {
		const el = mount(<ActionModal {...mockProps} actionIsVisible={true} />);
		expect(EnzymeToJson(el)).toMatchSnapshot();
	});
	it('renders a snapshot of <ActionModal /> with mock props when actionIsVisble is false', () => {
		const el = mount(
			<ActionModal {...mockProps} actionIsVisible={false} />
		);
		expect(EnzymeToJson(el)).toMatchSnapshot();
	});
});
