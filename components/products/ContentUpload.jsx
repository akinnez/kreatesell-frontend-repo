import {useMemo} from 'react';

import {useUpload} from 'hooks';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {
	CloudUpload,
	CloudUploadDisable,
	FileDelete,
	FileZip,
	Audio,
	Video,
	RenderIf,
} from 'utils';
import axios from 'axios';
import styles from './CreateProduct.module.scss';

export default function ContentUpload({file, setFile, initialFile}) {
	const [progress, setProgress] = useState(0);
	const [files, setFiles] = useState([]);
	const {mainFile, getRootProps, getInputProps, deleteFile} = useUpload({
		fileType: 'all',
	});

	const handleDeleteFile = () => {
		deleteFile(mainFile[0].file);
		setFile(null);
	};

	useEffect(() => {
		if (mainFile.length > 0) {
			mainFile.map(
				async (item) => await uploadFile(item.file, setProgress)
			);
		}
	}, [mainFile]);

	async function uploadFile(file, cb) {
		const formData = new FormData();
		formData.append('upload_preset', 'kreatesell');
		formData.append('file', file);
		const options = {
			onUploadProgress: (progressEvent) => {
				const {loaded, total} = progressEvent;
				let percent = Math.floor((loaded * 100) / total);
				cb(percent);
			},
		};
		try {
			const instance = axios.create();
			delete instance.defaults.headers.common['Authorization'];
			const {data} = await instance.post(
				'https://api.cloudinary.com/v1_1/salvoagency/upload',
				formData,
				options
			);
			console.log(data);
			setFile({
				type: data?.resource_type,
				url: data?.secure_url,
			});
		} catch (error) {
			console.log('ERROR', error);
		}
	}
	const fetchFile = async (url) => {
		const instance = axios.create();
		delete instance.defaults.headers.common['Authorization'];
		try {
			const data = await axios.get(url, {resource_type: 'raw'});
			// console.log(data);
			let buffer = new Buffer(data.data.toString());
			// console.log(buffer.toString('base64'));
		} catch (error) {
			console.log(error);
		}
	};

	useMemo(() => {
		if (Array.isArray(initialFile) && initialFile?.length > 0) {
			const getFileDetails = () => {
				initialFile?.map(async (item) => {
					setFiles((prev) => [...prev, item]);
					setFile(item.filename);
					await fetchFile(item.filename);
				});
			};
			getFileDetails();
		}
	}, [initialFile?.length]);

	// FIXME: I
	const handleUpdateDelete = () => {
		setFile(null);
		setFiles([]);
	};

	async function extractFileSize(cloudinaryUrl) {
		try {
			const response = await axios.head(cloudinaryUrl, {
				headers: {
					'Accept-Encoding': 'identity',
				},
			});
			const size = response.headers['content-length'];
			return size;
		} catch (error) {
			console.log(error);
			return 0;
		}
	}

	const CloudinaryFileSize = ({cloudinaryUrl}) => {
		const [fileSize, setFileSize] = useState(null);

		useEffect(() => {
			extractFileSize(cloudinaryUrl).then((size) => {
				setFileSize(size);
			});
		}, [cloudinaryUrl]);

		return fileSize !== null ? (
			<h2
				className={`text-base font-medium mt-0 ${styles.digitalProductSize}`}
			>
				{fileSize > 1000000
					? `${Number(fileSize / 1000000).toFixed(2)}MB`
					: `${Number(fileSize / 1000).toFixed(2)}KB`}
			</h2>
		) : (
			<p>Loading file size</p>
		);
	};

	// useEffect(() => {
	// 	if (mainFile.length > 0) {
	// 		const start = async () => {
	// 			const pr_arr = mainFile.map(
	// 				(item, i) =>
	// 					new Promise(async (res, rej) => {
	// 						await getBase64(item.file);
	// 						setFile(item.file);
	// 						res(null);
	// 					})
	// 			);
	// 			await Promise.all(pr_arr);
	// 		};
	// 		start();
	// 	}
	// }, [mainFile]);

	return (
		<div className="pt-2">
			<p className="text-base-gray-200 text-xs mb-0">
				You can upload Audio, Video or PDF Files
			</p>
			<small className="text-black mb-4 font-normal">
				The maximum allowed file size is 750MB.
			</small>
			{files.length > 0 &&
				files.map((item, index) => (
					<div
						key={index}
						className={styles.fileUpload + ' flex flex-col'}
					>
						<div
							key={index}
							className={styles.uploaded + ' w-full rounded-md'}
						>
							<div className="flex items-center">
								<div
									className="mr-4 flex items-center justify-center"
									style={{
										width: '48px',
										height: '48px',
										background: '#0072EF',
										borderRadius: '8px',
									}}
								>
									<Image src={FileZip} alt="zip" />
								</div>
								<div className="flex flex-col">
									<h2 className="mb-3 text-base font-bold">
										{item?.uploaded_name ||
											item?.filename?.split('/')[
												item?.filename.split('/')
													.length - 1
											]}
									</h2>
									<CloudinaryFileSize
										cloudinaryUrl={item?.filename}
									/>
								</div>
							</div>
							<div
								onClick={() => handleUpdateDelete()}
								className={
									styles.deleteFile +
									' flex items-center justify-center'
								}
							>
								<Image src={FileDelete} alt="delete" />
							</div>
						</div>
					</div>
				))}
			<RenderIf condition={files.length === 0}>
				{mainFile.length > 0 &&
					mainFile.map((item, index) => (
						<div
							key={index}
							className={styles.fileUpload + ' flex flex-col'}
						>
							<p className="mb-3">
								{progress !== 100
									? 'Uploading'
									: 'Content Uploaded Successfully'}{' '}
								({progress && <>{progress}</>})%
							</p>
							<div
								key={index}
								className={
									styles.uploaded + ' w-full rounded-md'
								}
							>
								{progress !== 100 && <span></span>}
								<div className="flex items-center">
									<div
										className="mr-4 flex items-center justify-center"
										style={{
											width: '48px',
											height: '48px',
											background: '#0072EF',
											borderRadius: '8px',
										}}
									>
										<Image
											src={
												item.file.type.includes('video')
													? Video
													: item.file.type.includes(
															'audio'
													  )
													? Audio
													: FileZip
											}
											alt="zip"
										/>
									</div>
									<div className="flex flex-col">
										<h2 className="mb-3 text-base font-bold">
											{item.file.name}
										</h2>
										<p className="mb-0">{`${(
											item.file.size /
											(1024 * 1024)
										).toFixed()}MB`}</p>
									</div>
								</div>
								<div
									onClick={() => handleDeleteFile()}
									className={
										styles.deleteFile +
										' flex items-center justify-center'
									}
								>
									<Image src={FileDelete} alt="delete" />
								</div>
							</div>
						</div>
					))}
			</RenderIf>
			<div className={styles.fileUploader}>
				{file?.length > 0 && <span></span>}
				<div
					className={`${styles.contentFileUpload} ${
						file?.length > 0 ? styles.contentFileUploadDisabled : ''
					}`}
					{...getRootProps()}
				>
					<div className="flex justify-center items-center">
						<input {...getInputProps()} />
						<Image
							src={
								file?.length > 0
									? CloudUploadDisable
									: CloudUpload
							}
							alt="upload image"
						/>
						<p className="hidden md:block text-sm pl-4 my-auto">
							Drag and Drop or Click to Upload Your Product Files
						</p>
						<p className="md:hidden text-primary-blue text-sm pl-4 my-auto">
							Drag & Drop Or Click to Upload Your Product File
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
