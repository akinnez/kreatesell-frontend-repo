import {dayOptions, currencyOptions, ticketsOptions} from '../partials';

describe('DATA : ', () => {
	test('dayOptions data snapshots ', () => {
		expect(dayOptions).toMatchSnapshot();
	});

	test('currencyOptions data snapshots', () => {
		expect(currencyOptions).toMatchSnapshot();
	});
	test('ticketsOptions data snapshots', () => {
		expect(ticketsOptions).toMatchSnapshot();
	});
});
