import React from 'react';
import Image from 'next/image';
import {useDropzone} from 'react-dropzone';
import {Button} from 'components/button/Button';
import {FaPlus} from 'react-icons/fa';
import {IoCloudUploadOutline} from 'react-icons/io5';
import styles from './fileupload.module.scss';
import {AiFillDelete} from 'react-icons/ai';

function FileUpload({files, setFiles, uploadingFiles, setUploadingFiles}) {
	const {
		getRootProps,
		acceptedFiles,
		fileRejections,
		getInputProps,
		open,
		isDragActive,
	} = useDropzone({
		accept: 'image/*',
		maxFiles: 5,
		noClick: files?.length >= 5,
		multiple: true,
		onDrop: (acceptedFiles) => {
			if (files?.length < 5) {
				setFiles((prevState) => {
					return [
						...prevState,
						...acceptedFiles.map((file) =>
							Object.assign(file, {
								preview: URL.createObjectURL(file),
							})
						),
					].slice(0, 5);
				});
				setUploadingFiles(
					[...uploadingFiles, ...acceptedFiles].slice(0, 5)
				);
			} else {
				return null;
			}
		},
	});

	const customImgLoader = ({src}) => {
		return `/${src}`;
	};
	const removeFile = (file) => {
		let newFiles = [...files];
		let newUploadingFiles = [...uploadingFiles];
		newFiles = newFiles.filter((item) => file.preview !== item.preview);
		newUploadingFiles = newUploadingFiles.filter(
			(item) => file.preview !== item.preview
		);
		setFiles(newFiles);
		setUploadingFiles(newUploadingFiles);
	};
	const thumbs = files?.map((file, index) => (
		<div className={styles.thumb} key={index}>
			<AiFillDelete
				className={styles.deleteIcon}
				onClick={() => removeFile(file)}
			/>
			<div className={styles.thumbInner}>
				<Image
					src={file.preview}
					unoptimized
					layout="fill"
					className={styles.img}
					alt=""
				/>
				{/* <img src={file.preview} layout="fill" alt="" className={styles.img} /> */}
			</div>
		</div>
	));

	//   useEffect(
	//     () => () => {
	//       files.forEach((file) => URL.revokeObjectURL(file.preview));
	//     },
	//     [files]
	//   );

	return (
		<section>
			<div className={styles.fileUploadWrapper}>
				<div
					{...getRootProps()}
					className={styles.fileUploadContainer}
					style={{cursor: files?.length >= 5 && 'not-allowed'}}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<div className={styles.fileUploadDiv}>
							<IoCloudUploadOutline
								className={styles.uploadIcon}
							/>
							<p className={styles.dragText}>
								Drop the files here ...
							</p>
						</div>
					) : (
						<div className={styles.fileUploadDiv}>
							{files?.length > 5 ? (
								<IoCloudUploadOutline
									className={styles.uploadIconRed}
								/>
							) : (
								<IoCloudUploadOutline
									className={styles.uploadIcon}
								/>
							)}
							{files?.length > 5 ? (
								<p className={`my-0 ${styles.dragTextRed}`}>
									You have exceeded the maximum number of
									files to be uploaded
								</p>
							) : (
								<>
									<p
										className={`my-0 ${styles.dragTextMobile}`}
									>
										Drag and Drop or Upload files
									</p>
									<p className={`my-0 ${styles.dragText}`}>
										Drag and drop or click to upload files,
										maximum number of files (5) five
									</p>
								</>
							)}
						</div>
					)}
				</div>
				<Button
					style={{cursor: files?.length >= 5 && 'not-allowed'}}
					text="Add more"
					className={styles.addFileBtn}
					leftIcon={<FaPlus className={styles.iconSize} />}
					onClick={open}
					disabled={files?.length >= 5}
				/>
			</div>
			<div className={styles.thumbsContainer}>
				{files && files?.length > 0 && thumbs}
			</div>
		</section>
	);
}

export default FileUpload;
