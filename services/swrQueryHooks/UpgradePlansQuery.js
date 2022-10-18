import useSWR from 'swr';

import {GET_UPGRADE_PLAN_PRICES} from '../queryKeys';
import {getUpgradePlanPrices} from '../api/UpgradePlans';

export const useGetUpgradePlansPrices = () => {
	const {data, error} = useSWR(GET_UPGRADE_PLAN_PRICES, () =>
		getUpgradePlanPrices()
	);

	return {data, error};
};
