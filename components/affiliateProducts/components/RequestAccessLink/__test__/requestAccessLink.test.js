import RequestAccessLink from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	productId: 'mockId',
};

describe('RequestAccessLink : ', () => {
	it('renders a snapshot of <RequestAccessLink /> with mock prop when status is false', () => {
		const accessLink = renderer
			.create(<RequestAccessLink {...mockProps} status={false} />)
			.toJSON();
		expect(accessLink).toMatchSnapshot();
	});
	it('renders a snapshot of <RequestAccessLink /> with mock prop when status is true', () => {
		const accessLink = renderer
			.create(<RequestAccessLink {...mockProps} status={true} />)
			.toJSON();
		expect(accessLink).toMatchSnapshot();
	});
});
