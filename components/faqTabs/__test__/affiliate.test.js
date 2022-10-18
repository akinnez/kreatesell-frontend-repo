import {questions} from '../../../pages/api/faqs/Affiliate';
import renderer from 'react-test-renderer';
import Affiliate from '../Affiliate';

it('renders a snapshot of <Affiliate /> tab', () => {
	const tab = renderer.create(<Affiliate questions={questions} />).toJSON();
	expect(tab).toMatchSnapshot();
});
