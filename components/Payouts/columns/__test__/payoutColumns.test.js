import {payoutsColumns} from '../payoutsColumns';

it('renders a snapshot of payoutsColumns data', () => {
	expect(payoutsColumns).toMatchSnapshot();
});
