import PopOverFooter from '..';
import renderer from 'react-test-renderer';

const mockProps = {
	affiliateId: 'mockId',
	showReport: jest.fn(),
};

describe('PopOverFooter :', () => {
	it('renders a snapshot of <PopOverFooter /> with mock props when affiliateReported is false', () => {
		const el = renderer
			.create(<PopOverFooter {...mockProps} affiliateReported="false" />)
			.toJSON();
		expect(el).toMatchSnapshot();
	});
	it('renders a snapshot of <PopOverFooter /> with mock props when affiliateReported is true', () => {
		const el = renderer
			.create(<PopOverFooter {...mockProps} affiliateReported="true" />)
			.toJSON();
		expect(el).toMatchSnapshot();
	});
});
