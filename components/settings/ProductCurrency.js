import React, {useState, useEffect} from 'react';
import Image from 'next/image';

import {useSelector} from 'react-redux';

import {Row, Col, Spin} from 'antd';

import {Checkbox as CustomCheck} from 'components/checkbox/Checkbox';
import style from './Index.module.scss';
import {Button} from '../form-input';
import {UpdateStoreCurrencies, GetStoreCurrencies} from 'redux/actions';

const Index = ({countriesCurrency, filteredCentral, filterdWest, loading}) => {
	const {storeCurrencies} = useSelector((state) => state.store);
	const updateStoreCurrencies = UpdateStoreCurrencies();
	const getStoreCurrencies = GetStoreCurrencies();
	const [selectedCurrencies, setSelectedCurrencies] = useState([]);
	const [allSelected, setAllSelected] = useState({
		allCountriesCurrencies: false,
		westCountries: false,
		centralCountries: false,
	});

	// make request to get currency
	useEffect(() => {
		getStoreCurrencies();
		return () => {};
	}, []);

	// set currencies on mount
	useEffect(() => {
		if (storeCurrencies?.length > 0) {
			getSelected();
		}
		return () => {};
	}, [storeCurrencies?.length]);

	const handleSelect = (currency) => {
		if (
			selectedCurrencies.some((cry) =>
				[cry?.short_name, cry.country].includes(currency.short_name)
			)
		) {
			// console.log('exist')
			setSelectedCurrencies((prev) => {
				const newList = prev.filter(
					(val) =>
						![val.country, val.short_name].includes(
							currency?.short_name
						)
				);
				// console.log('newList', newList)
				return newList;
			});
		} else {
			// console.log('does not exists')
			setSelectedCurrencies((prev) => {
				return [...prev, currency];
			});
		}
	};

	const formatCurrency = () => {
		const data = {
			currencies_id: [
				...selectedCurrencies.map((cur) => ({
					country: cur?.country || cur?.short_name,
					status: true,
					currency: cur?.currency_short_name || cur?.currency,
				})),
			],
		};
		return data;
	};

	// TODO: check for if each section's all currencies are checked by default
	const handleCheckAll = (field) => {
		switch (field) {
			case 'allCountriesCurrencies':
				// if all currencies are selected from this section
				if (allSelected.allCountriesCurrencies) {
					setAllSelected((prev) => ({
						...prev,
						allCountriesCurrencies: !prev.allCountriesCurrencies,
					}));
					setSelectedCurrencies((prev) => [
						...prev.filter(
							(prv) =>
								['XOF', 'XAF'].includes(
									prv.currency_short_name
								) || ['XOF', 'XAF'].includes(prv.currency)
						),
					]);
				} else {
					setAllSelected((prev) => ({
						...prev,
						allCountriesCurrencies: !prev.allCountriesCurrencies,
					}));
					setSelectedCurrencies((prev) => [
						...prev.filter(
							(prv) =>
								['XOF', 'XAF'].includes(
									prv.currency_short_name
								) || ['XOF', 'XAF'].includes(prv.currency)
						),
						...countriesCurrency,
					]);
				}
				break;
			case 'westCountries':
				if (allSelected.westCountries) {
					setAllSelected((prev) => ({
						...prev,
						westCountries: !prev.westCountries,
					}));
					// if
					setSelectedCurrencies((prev) => [
						...prev.filter(
							(prv) =>
								![
									prv?.currency_short_name,
									prv?.currency,
								].includes('XOF')
						),
					]);
				} else {
					setAllSelected((prev) => ({
						...prev,
						westCountries: !prev.westCountries,
					}));
					setSelectedCurrencies((prev) => [
						...prev.filter(
							(prv) =>
								![
									prv?.currency_short_name,
									prv?.currency,
								].includes('XOF')
						),
						...filterdWest,
					]);
				}
				break;
			case 'centralCountries':
				if (allSelected.centralCountries) {
					setAllSelected((prev) => ({
						...prev,
						centralCountries: !prev.centralCountries,
					}));
					setSelectedCurrencies((prev) => [
						...prev.filter(
							(prv) =>
								![
									prv?.currency_short_name,
									prv?.currency,
								].includes('XAF')
						),
					]);
				} else {
					setAllSelected((prev) => ({
						...prev,
						centralCountries: !prev.centralCountries,
					}));
					setSelectedCurrencies((prev) => [
						...prev.filter(
							(prv) =>
								![
									prv?.currency_short_name,
									prv?.currency,
								].includes('XAF')
						),
						...filteredCentral,
					]);
				}
				break;
		}
	};

	const handleSubmit = () => {
		// console.log(formatCurrency())
		updateStoreCurrencies(
			formatCurrency(),
			() => console.log('successful'),
			() => console.log('error occured')
		);
	};

	function getSelected() {
		setSelectedCurrencies(storeCurrencies);
	}

	if (loading) return <Spin />;
	return (
		<div className={style.wrapper}>
			<h3>Store Currency Settings</h3>
			<div className={style.bordered}>
				<h4>
					Custom Product Currency - Customize your product currency
				</h4>
				<p>
					As a Kreator, your country&apos;s currency is selected by
					default. But you can decide to turn it off if you prefer.
					You can select other options to set the currency while
					adding a product through the &lsquo;add product&rsquo;
					section. Any currency that you don&apos;t select here will
					be automatically converted if used by your customer.
				</p>
				<div className={`flex justify-between`}>
					<h4>
						Customize the amount you can set when adding a product
					</h4>
					<CustomCheck
						checked={allSelected.allCountriesCurrencies}
						onChange={() =>
							handleCheckAll('allCountriesCurrencies')
						}
						name="countries"
						labelStyle={'flex items-center'}
					>
						<p className="mb-0">Select All</p>
					</CustomCheck>
				</div>

				<div style={{width: '100%'}}>
					<Row>
						{countriesCurrency?.map((cur, i) => (
							<Col
								key={i}
								md={4}
								sm={8}
								style={{marginBlockEnd: '1rem'}}
							>
								<CustomCheck
									checked={selectedCurrencies.some((cry) =>
										[cry?.short_name, cry.country].includes(
											cur.short_name
										)
									)}
									onChange={() => handleSelect(cur)}
									name="countries"
								>
									<span
										className={`p-2 flex`}
										style={{
											border: '1px solid #D9D9D9',
											borderRadius: '8px',
										}}
									>
										<div
											className={style.checFlag + ' mr-2'}
										>
											<Image
												src={cur.flag}
												alt="flag"
												layout="fill"
											/>
										</div>
										{cur.currency}
									</span>
								</CustomCheck>
							</Col>
						))}
					</Row>
				</div>

				<div className={`flex justify-between`}>
					<h4>West African CFA Franc BCEAO(XOF)</h4>
					<CustomCheck
						checked={allSelected.westCountries}
						onChange={() => handleCheckAll('westCountries')}
						name="countries"
						labelStyle={'flex items-center'}
					>
						<p className="mb-0">Select All</p>
					</CustomCheck>
				</div>
				<div style={{width: '100%'}}>
					<Row>
						{filterdWest?.map((cur, i) => (
							<Col
								key={i}
								md={5}
								sm={8}
								style={{marginBlockEnd: '1rem'}}
							>
								<CustomCheck
									checked={selectedCurrencies.some((cry) =>
										[cry.short_name, cry.country].includes(
											cur.short_name
										)
									)}
									onChange={() => handleSelect(cur)}
									name="countries"
								>
									<span
										className={`p-2 flex`}
										style={{
											border: '1px solid #D9D9D9',
											borderRadius: '8px',
										}}
									>
										<div
											className={style.checFlag + ' mr-2'}
										>
											<Image
												src={cur?.flag}
												alt="flag"
												layout="fill"
											/>
										</div>
										{cur?.name}
									</span>
								</CustomCheck>
							</Col>
						))}
					</Row>
				</div>

				<div className={`flex justify-between`}>
					<h4>Central African CFA Franc BEAC(XAF)</h4>
					<CustomCheck
						checked={allSelected.centralCountries}
						onChange={() => handleCheckAll('centralCountries')}
						name="countries"
						labelStyle={'flex items-center'}
					>
						<p className="mb-0">Select All</p>
					</CustomCheck>
				</div>
				<div style={{width: '100%'}}>
					<Row>
						{filteredCentral?.map((cur, i) => (
							<Col
								key={i}
								md={4}
								sm={6}
								style={{marginBlockEnd: '1rem'}}
							>
								<CustomCheck
									checked={selectedCurrencies.some((cry) =>
										[cry?.short_name, cry.country].includes(
											cur.short_name
										)
									)}
									onChange={() => handleSelect(cur)}
									name="countries"
								>
									<span
										className={`p-2 flex`}
										style={{
											border: '1px solid #D9D9D9',
											borderRadius: '8px',
										}}
									>
										<div
											className={style.checFlag + ' mr-2'}
										>
											<Image
												src={cur?.flag}
												alt="flag"
												layout="fill"
											/>
										</div>
										{cur?.name}
									</span>
								</CustomCheck>
							</Col>
						))}
					</Row>
				</div>
				<Button
					onClick={handleSubmit}
					type="primary"
					style={{marginTop: '20px'}}
					label="Update Details"
				/>
			</div>
		</div>
	);
};

export default Index;
