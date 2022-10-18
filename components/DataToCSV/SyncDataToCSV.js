import React from 'react';
import {Button} from 'antd';
import {CSVLink} from 'react-csv';
import {BsDownload} from 'react-icons/bs';
import {showToast} from 'utils';
import styles from './index.module.scss';

/*  DataToCSV Component receives 3.props:
  1 - this.props.data = an array of all data to be converted to downloadable CSV

  2 - this.props.headers = The CSV file headers. Format below:
  const headers = [
    { label: "Product Name", key: "product_name" },
    { label: "Product Type", key: "product_type" },
    { label: "Product Price", key: "product_price" },
    { label: "Date Created", key: "date_created" },
  ];

  3 - this.props.filename = The default name of the csv file.
*/

export default class SyncDataToCSV extends React.Component {
	handleClick = () => {
		showToast('Could not download CSV. Try again later', 'error');
	};

	render() {
		const {data, headers, filename} = this.props;

		const csvReport = {
			data,
			headers,
			filename: filename ? `${filename}.csv` : 'data.csv',
		};

		if (!headers) {
			return (
				<div className={styles.csvDataDownload}>
					<Button type="link" onClick={this.handleClick}>
						Export data in CSV &nbsp;
						<BsDownload />
					</Button>
				</div>
			);
		}

		return (
			<div className={styles.csvDataDownload}>
				<Button type="link">
					<CSVLink {...csvReport}>
						Export data in CSV &nbsp;
						<BsDownload />
					</CSVLink>
				</Button>
			</div>
		);
	}
}
