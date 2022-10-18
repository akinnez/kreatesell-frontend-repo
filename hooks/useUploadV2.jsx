import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';

function useMyDropzone() {
	const [files, setFiles] = useState([]);
	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		// console.log('rejectedFiles', rejectedFiles)
		// console.log('acceptedFiles', acceptedFiles)

		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onload = () => {
				// console.log("file upload started")
				// Do whatever you want with the file contents
				setFiles((prev) => [...prev, file]);
				const binaryStr = reader.result;
				// console.log(binaryStr)
			};
			reader.readAsArrayBuffer(file);
		});
	}, []);
	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		// maxFiles: 1,
		// accept: {
		//   'image/*': ['.jpeg', '.jpg', '.png'],
		// },
	});

	return {getInputProps, getRootProps, isDragActive, files};
}

export default useMyDropzone;
