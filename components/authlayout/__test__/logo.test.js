import Logo, {MobileLogo} from '../logo';
import renderer from 'react-test-renderer';

describe('Logo : ', () => {
	it('renders a snapshot of <Logo />', () => {
		const logo = renderer.create(<Logo />).toJSON();
		expect(logo).toMatchSnapshot();
	});
	it('renders a snapshot of <MobileLogo />', () => {
		const logo = renderer.create(<MobileLogo />).toJSON();
		expect(logo).toMatchSnapshot();
	});
});
