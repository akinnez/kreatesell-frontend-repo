import HistoryTag from '../HistoryTag';
import renderer from 'react-test-renderer';

describe('HistoryTag : ', () => {
	it('renders a snapshot of <HistoryTag /> when status = Successful', () => {
		const tag = renderer
			.create(<HistoryTag status="Successful" />)
			.toJSON();
		expect(tag).toMatchSnapshot();
	});
	it('renders a snapshot of <HistoryTag /> when status = Pending', () => {
		const tag = renderer.create(<HistoryTag status="Pending" />).toJSON();
		expect(tag).toMatchSnapshot();
	});
	it('renders a snapshot of <HistoryTag /> when status = Successful', () => {
		const tag = renderer.create(<HistoryTag status="Failed" />).toJSON();
		expect(tag).toMatchSnapshot();
	});
});
