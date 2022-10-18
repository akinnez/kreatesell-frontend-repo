import {payoutsHeaders} from '../payoutsHeaders';

it('renders a snapshot of payoutsHeaders data', () => {
	expect(payoutsHeaders).toMatchSnapshot();
});
