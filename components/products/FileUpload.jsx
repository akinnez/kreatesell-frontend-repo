import {useUpload} from 'hooks';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {CloudUpload, CloudUploadDisable, FileDelete, FileZip} from 'utils';
import axios from 'axios';
import styles from './CreateProduct.module.scss';

export default function FileUpload({
	file,
	setFile,
	isToggleable,
	toggleValue,
	initialFile,
}) {
	const [progress, setProgress] = useState(0);
	const {mainFile, getRootProps, getInputProps, deleteFile} = useUpload({
		fileType: '.zip,.rar',
	});

	console.log(initialFile, 'initialFileinitialFile');

	console.log(file, 'filefilefilefile');

	const fetchFile = async (url) => {
		const instance = axios.create();
		delete instance.defaults.headers.common['Authorization'];
		try {
			const data = await axios.get(url, {resource_type: 'raw'});
			console.log(data);
			let buffer = new Buffer(data.data.toString());
			console.log(buffer.toString('base64'));
		} catch (error) {
			console.log(error);
		}
	};
	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onprogress = (data) => {
				if (data.lengthComputable) {
					var progress = parseInt(
						(data.loaded / data.total) * 100,
						10
					);
					setProgress(progress);
				}
			};
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};
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

	useEffect(() => {
		if (initialFile) {
			const getFileDetails = () => {
				initialFile.map(async (item) => {
					await fetchFile(item.filename);
				});
			};
			getFileDetails();
		}
	}, [initialFile]);

	useEffect(() => {
		if (mainFile.length > 0) {
			const start = async () => {
				const pr_arr = mainFile.map(
					(item, i) =>
						new Promise(async (res, rej) => {
							await getBase64(item.file);
							setFile(item.file);
							res(null);
						})
				);
				await Promise.all(pr_arr);
			};
			start();
		}
	}, [mainFile]);

	console.log(mainFile, 'mainFilemainFilemainFilemainFile');

	return (
		<div className="pt-2">
			<p className="text-base-gray-200 text-xs mb-0">
				Only one file is allowed to be uploaded. Bundles all your files
				into single RAR or ZIP file.
			</p>
			<small className="text-black mb-4 font-normal">
				The maximum allowed file size is 1GB.
			</small>
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
							className={styles.uploaded + ' w-full rounded-md'}
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
			<div className={styles.fileUploader}>
				{file && <span></span>}
				<div
					className={`${styles.contentFileUpload} ${
						file ? styles.contentFileUploadDisabled : ''
					}`}
					{...getRootProps()}
				>
					<div className="flex justify-center items-center">
						<input {...getInputProps()} />
						<Image
							src={file ? CloudUploadDisable : CloudUpload}
							alt="upload image"
						/>
						<p className="hidden md:block text-sm pl-4 my-auto">
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
