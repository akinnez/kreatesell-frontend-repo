import {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

export const useUpload = ({fileType}) => {
	const [files, setFiles] = useState([]);
	const [showImageFileFeedback, setShowImageFileFeedback] = useState(false);

	//* edits
	const onDrop = useCallback(
		(acceptedFiles, rejectedFiles) => {
			// console.log('onDrop');
			// console.log('acceptedFiles = ', acceptedFiles);
			// console.log('rejectedFiles = ', rejectedFiles);

			/**
			 * TODO: we should refactor this to accept the accepted MIME type
			 *  e.g. acceptedFile = ['.rar', .'png']
			 *  const isAcceptableForUpload = acceptedFile.includes(acceptedFiles?.[0]?.path)
			 */
			const isAcceptableForUpload =
				acceptedFiles?.[0]?.path?.endsWith('.png') ||
				acceptedFiles?.[0]?.path?.endsWith('.jpg') ||
				acceptedFiles?.[0]?.path?.endsWith('.jpeg') ||
				acceptedFiles?.[0]?.path?.endsWith('.rar') ||
				acceptedFiles?.[0]?.path?.endsWith('.zip');

			if (isAcceptableForUpload) {
				setShowImageFileFeedback(false);
				const fileMatched = acceptedFiles.map((file) => ({
					file,
					errors: [],
				}));

				const filesInAcceptedFormats = fileMatched.filter(
					(file) =>
						!file?.file?.name.toLowerCase().endsWith('.png') ||
						!file?.file?.name.toLowerCase().endsWith('.jpg') ||
						!file?.file?.name.toLowerCase().endsWith('.jpeg')
				);

				if (fileType === 'image') {
					setFiles((prev) => [
						...prev,
						...filesInAcceptedFormats,
						// ...rejectedFiles,
					]);
					return;
				}
				return setFiles([
					...filesInAcceptedFormats,
					// ...rejectedFiles
				]);
			} else {
				setShowImageFileFeedback(true);
			}
		},
		[fileType]
	);

	const deleteFile = (file) => {
		setFiles((prev) => prev.filter((item) => item.file !== file));
	};

	const setUrl = (file, url) => {
		console.log('setUrl');
		setFiles((prev) =>
			prev.map((oneFile) => {
				if (oneFile.file === file) {
					oneFile.url = url;
					return oneFile;
				}
				return oneFile;
			})
		);
	};

	const {getRootProps, getInputProps} = useDropzone({
		onDrop,
		// TODO: work on the accept
		// accept: fileType,
		maxFiles: fileType === 'image' ? 3 : 50,
		maxSize: fileType === 'image' ? 2097152 : 5368709120,
	});

	// note: mainFile was not a rename, we assigned files to it
	return {
		mainFile: files,
		getRootProps,
		getInputProps,
		deleteFile,
		setUrl,
		setFiles,
		showImageFileFeedback,
	};
};
