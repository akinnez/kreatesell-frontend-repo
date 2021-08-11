import styles from "./Table.module.scss";

export const Table = ({ header, data }) => {
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

				{data?.length && (
					<tbody className="t-body">
						{data?.map((data) => (
							<tr key={data.id}>
								{header?.map((item, i) =>
									item.component ? (
										<td key={i}>
											{item.component({ item: data[item.key], data })}
										</td>
									) : (
										<td key={i}>{data[item.key]}</td>
									)
								)}
							</tr>
						))}
					</tbody>
				)}
			</table>
		</div>
	);
};
