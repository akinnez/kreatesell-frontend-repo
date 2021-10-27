import { EmptyDataTable } from "utils";
import styles from "./Table.module.scss";
import Image from "next/image";

export const Table = ({ header, data, loading }) => {
	return (
		<div className={styles.tableContainer}>
			<table className={styles.table}>
				<thead>
					<tr>
						{header?.map((item, i) => (
							<th key={i}>{item?.title}</th>
						))}
					</tr>
				</thead>

				{Boolean(data?.length) && (
					<tbody className="t-body">
						{data?.map((data, i) => (
							<tr key={data?.id || i}>
								{header?.map((item, i) =>
									item?.component ? (
										<td key={i}>
											{item.component({ item: data[item?.key], data })}
										</td>
									) : (
										<td key={i}>{data[item?.key]}</td>
									)
								)}
							</tr>
						))}
					</tbody>
				)}
			</table>

			{!Boolean(data?.length) && (
				<div className="w-full h-full flex flex-col items-center justify-center p-8">
					<div>
						<Image src={EmptyDataTable} />
					</div>
					{loading ? (
						<div>Loading Data ...</div>
					) : (
						<div className="text-center mt-3 bolder">No available data</div>
					)}
				</div>
			)}
		</div>
	);
};
