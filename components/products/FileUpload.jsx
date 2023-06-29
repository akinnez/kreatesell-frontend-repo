import {useUpload} from 'hooks';
import Image from 'next/image';
import {useEffect, useState, useMemo} from 'react';
import {
	CloudUpload,
	CloudUploadDisable,
	FileDelete,
	FileZip,
	RenderIf,
} from 'utils';
import axios from 'axios';
import styles from './CreateProduct.module.scss';
import Filters from 'components/Payouts/components/Filters';

// var public_id = '<public_id>';
let cloud_name = 'salvoagency';
let upload_preset = 'kreatesell';
let sliceSize = 6000000; //TODO: Let's see if we can change this
let XUniqueUploadId = +new Date();

export default function FileUpload({
	file,
	setFile,
	isToggleable,
	toggleValue,
	initialFile,
	onLoadCb = () => {},
	multiple = null,
	validateFunction = () => {},
}) {
	const [progress, setProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const {mainFile, getRootProps, getInputProps, deleteFile} = useUpload({
		fileType: 'all',
		multiple,
		validateFunction,
	});

	const [files, setFiles] = useState([]);

	const fetchFile = async (url) => {
		const instance = axios.create();
		delete instance.defaults.headers.common['Authorization'];
		try {
			const data = await axios.get(url, {resource_type: 'raw'});
			let buffer = new Buffer(data.data.toString());
			// console.log(buffer.toString('base64'));
		} catch (error) {
			console.log(error);
		}
	};

	// ================================================================================
	// cloudinary upload functions starts here
	// ================================================================================

	function getBase64(file) {
		setIsUploading(true);
		let start = 0;
		let size = file.size;

		setTimeout(loop, 3);
		function loop() {
			let end = start + sliceSize;
			// this is to ensure that the slicesize is not bigger than the file size
			if (end > size) {
				end = size;
			}

			var s = slice(file, start, end);
			send(s, start, end - 1, size, file.name);
			if (end < size) {
				start += sliceSize;
				setTimeout(loop, 3);
				setProgress(Math.round((start / size) * 100));
			}
		}
	}

	function send(piece, start, end, size, filename) {
		let formData = new FormData();

		formData.append('file', piece);
		formData.append('upload_preset', upload_preset);
		formData.append('cloud_name', cloud_name);
		formData.append('public_id', filename);

		const xhr = new XMLHttpRequest();

		xhr.onload = function (e) {
			let parsedData = JSON.parse(this.responseText);
			// TODO: Account for files smaller than 6mb
			if (parsedData.bytes < sliceSize) {
				setIsUploading(false);
				setProgress(100);
				setFile(parsedData.secure_url);
			} else {
				if (parsedData.done === true) {
					setIsUploading(false);
					setProgress(100);
					setFile(parsedData.secure_url);
				}
			}
		};

		xhr.onerror = function () {
			setIsUploading(false);
		};

		xhr.open(
			'POST',
			'https://api.cloudinary.com/v1_1/salvoagency/auto/upload',
			false
		);
		xhr.setRequestHeader('X-Unique-Upload-Id', XUniqueUploadId);
		xhr.setRequestHeader(
			'Content-Range',
			'bytes ' + start + '-' + end + '/' + size
		);

		xhr.send(formData);
	}

	function slice(file, start, end) {
		let slice = file?.mozSlice
			? file?.mozSlice
			: file?.webkitSlice
			? file?.webkitSlice
			: file.slice
			? file.slice
			: returnNull;
		return slice.bind(file)(start, end);
	}

	function returnNull() {}
	// ================================================================================
	// cloudinary upload functions ends here
	// ================================================================================

	const handleDeleteFile = () => {
		deleteFile(mainFile[0].file);
		setFile(null);
	};
	useEffect(() => {
		return () => {
			deleteFile(mainFile[0]?.file);
			setFile(null);
		};
	}, [isToggleable, toggleValue]);

	// This is for the upload progress
	useEffect(() => {
		if (progress) {
			if (progress !== 100) {
				onLoadCb(true);
			} else {
				onLoadCb(false);
			}
		}
	}, [progress]);

	useMemo(() => {
		if (initialFile) {
			const getFileDetails = () => {
				initialFile.map(async (item) => {
					setFiles((prev) => [...prev, item]);
					setFile(item.filename);
					await fetchFile(item.filename);
				});
			};
			getFileDetails();
		}
	}, [initialFile?.length]);

	useEffect(() => {
		if (mainFile.length > 0) {
			const start = async () => {
				const pr_arr = mainFile.map(
					(item, i) =>
						new Promise(async (res, rej) => {
							await getBase64(item.file);
							// setFile(item.file);
							res(null);
						})
				);
				await Promise.all(pr_arr);
			};
			start();
		}
	}, [mainFile]);

	const handleUpdateDelete = () => {
		setFile(null);
		setFiles([]);
	};

	const fileSize = (fileSize) => {
		let oneMb = 1048576;
		if (fileSize < oneMb) {
			return `${(fileSize / 1024).toFixed(2)}KB`;
		}

		return `${(fileSize / (1024 * 1024)).toFixed(2)}MB`;
	};

	return (
		<div className="pt-2">
			<p className="text-base-gray-200 text-xs mb-0">
				Only one file is allowed to be uploaded. For multiple uploads,
				bundle all your files into a single ZIP or RAR file
			</p>
			<small className="text-black mb-4 font-normal">
				The maximum allowed size is 1GB for Images and Videos and 500MB
				for any other file type
			</small>
			{/* show this if there's  */}
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
											item?.filename.split('/')[
												item?.filename.split('/')
													.length - 1
											]}
									</h2>
									<p className="mb-0">{`${item?.size}`}</p>
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
										<Image src={FileZip} alt="zip" />
									</div>
									<div className="flex flex-col">
										<h2 className="mb-3 text-base font-bold">
											{item.file.name}
										</h2>
										<p className="mb-0">
											{fileSize(item.file.size)}
										</p>
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
				{(file || isUploading) && <span></span>}
				<div
					className={`${styles.contentFileUpload} ${
						file || isUploading
							? styles.contentFileUploadDisabled
							: ''
					}`}
					{...getRootProps()}
				>
					<div className="flex justify-center items-center">
						<input {...getInputProps()} />
						<Image
							src={
								file || isUploading
									? CloudUploadDisable
									: CloudUpload
							}
							alt="upload image"
						/>
						<p className="hidden md:block text-sm pl-4">
							Drag and Drop or Click to Upload Your Product File
						</p>
						<p className="md:hidden text-primary-blue text-sm pl-4 my-auto">
							Upload your product files
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
