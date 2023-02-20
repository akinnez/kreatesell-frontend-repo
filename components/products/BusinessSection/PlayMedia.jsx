import {Modal} from 'antd';
import {useEffect, useState} from 'react';
import styles from './MembershipTab.module.scss';
import Image from 'next/image';
import {CloseIcon} from 'utils';
import {Document, Page, pdfjs} from 'react-pdf';
import axios from 'axios';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PlayMedia({type, open, source, closePlay, title}) {
	const [isOpen, setIsOpen] = useState(open);
	const handleclose = () => {
		setIsOpen(false);
	};

	const PdfPreview = ({cloudinaryUrl}) => {
		const [numPages, setNumPages] = useState(null);
		const [pageNumber, setPageNumber] = useState(1);
		const [pdfUrl, setPdfUrl] = useState(null);
		const [error, setError] = useState(null);

		useEffect(() => {
			const fetchPDF = async () => {
				try {
					const response = await axios.get(cloudinaryUrl, {
						responseType: 'arraybuffer',
					});
					const blob = new Blob([response.data], {
						type: 'application/pdf',
					});
					const url = URL.createObjectURL(blob);
					setPdfUrl(url);
					setError(null);
				} catch (error) {
					console.error(error);
					setError(error.toString());
				}
			};
			fetchPDF();
		}, [cloudinaryUrl]);

		const onDocumentLoadSuccess = ({numPages}) => {
			setNumPages(numPages);
			setError(null);
		};

		const onDocumentLoadError = (error) => {
			console.error(error);
			setError(error.toString());
		};

		return (
			<div className="w-full h-96 overflow-y-hidden overflow-x-hidden">
				<Document
					file={{url: pdfUrl}}
					onLoadSuccess={onDocumentLoadSuccess}
					onLoadError={onDocumentLoadError}
				>
					<Page pageNumber={pageNumber} />
				</Document>
			</div>
		);
	};

	return (
		<Modal
			title={null}
			footer={null}
			visible={isOpen}
			onCancel={() => {
				setIsOpen(false);
				closePlay(false);
			}}
			closable={false}
		>
			<div className="flex justify-between items-center">
				<p className={styles.previewModalTitle}>{title}</p>
				{/* <Image 
				src={CloseIcon} 
				width={27}  
				height={27} 
				objectFit="contain"
				 className={styles.previewCancelIcon}
				//  onClick={setIsOpen(false)}
				 /> */}
			</div>
			{type === 'image' && (
				<Image
					src={source}
					alt=""
					height={680}
					width={535}
					objectFit="cover"
				/>
			)}
			{type === 'audio' && (
				<audio controls className="mx-auto">
					<source src={source} type="audio/mpeg" />
				</audio>
			)}
			{type === 'video' && (
				<video
					controls
					loop
					src={source}
					alt=""
					className={styles.previewVideo}
				/>
			)}
			{type === 'text' ||
				(type === 'applicaation' && (
					<PdfPreview cloudinaryUrl={source} />
				))}
		</Modal>
	);
}
