import {walletHeaders} from '../walletHeaders';

it('renders a snapshot of walletHeaders data', () => {
	expect(walletHeaders).toMatchSnapshot();
});
