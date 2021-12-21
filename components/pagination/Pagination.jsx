import { usePagination, DOTS } from "../../hooks";
import styles from "./Pagination.module.scss";

export const Pagination = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
	className,
}) => {
	const { paginationRange } = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange?.length < 2) return null;

	const onNext = () => onPageChange(currentPage + 1);
	const onPrevious = () => onPageChange(currentPage - 1);

	let lastPage =
		(paginationRange && paginationRange[paginationRange?.length - 1]) ||
		totalCount - 1;

	return (
		<ul
			className={`${styles.paginationContainer} ${className}`}
			data-testid="pagination"
		>
			<li
				className={`${styles.paginationItem} ${
					currentPage === 1 && styles.disabled
				}`}
				onClick={onPrevious}
			>
				<div className={`${styles.arrow} ${styles.left}`} />
			</li>
			{paginationRange?.map((pageNumber, i) => {
				if (pageNumber === DOTS) {
					return (
						<li key={i} className={`${styles.paginationItem} ${styles.dots}`}>
							&#8230;
						</li>
					);
				}

				return (
					<li
						key={i}
						className={`${styles.paginationItem} ${
							pageNumber === currentPage && styles.selected
						}`}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={`${styles.paginationItem} ${
					currentPage === lastPage && styles.disabled
				}`}
				onClick={onNext}
			>
				<div className={`${styles.arrow} ${styles.right}`} />
			</li>
		</ul>
	);
};
