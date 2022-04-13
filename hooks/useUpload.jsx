import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const useUpload = ({ setFileChange, fileType}) => {
	// const [files, setFiles] = useState([]);
	// const [preview, setPreview] = useState([]);

	// const getBase64 = (file) => {
	// 	return new Promise((resolve, reject) => {
	// 		const reader = new FileReader();
	// 		reader.readAsDataURL(file);
	// 		reader.onload = () => resolve(reader.result);
	// 		reader.onerror = (error) => reject(error);
	// 	});
	// };

	// const onDrop = async (acceptedFiles) => {
	// 	setFiles([...files, ...acceptedFiles]);
	// 	setFileChange([...files, ...acceptedFiles]);
	// 	let b64arr = [];
	// 	const pr_arr = await acceptedFiles.map(
	// 		(item, i) =>
	// 			new Promise(async (res, rej) => {
	// 				let b64 = await getBase64(item);
	// 				b64arr.push({ url: b64, index: i });
	// 				res(null);
	// 			})
	// 	);

	// 	await Promise.all(pr_arr);
	// 	setPreview([...preview, ...b64arr]);
	// };

	// const removeFile = () => {
	// 	setFiles([]);
	// 	setPreview([]);
	// };

	// const { getRootProps, getInputProps } = useDropzone({ onDrop });

	
	
	const [files, setFiles] = useState([])
	const onDrop = useCallback((acceptedFiles, rejectedFiles)=>{
		const fileMatched = acceptedFiles.map(file=> ({file, errors:[]}))
		setFiles(prev=> [...prev, ...fileMatched, ...rejectedFiles])
	}, [])

	const deleteFile = (file)=>{
		setFiles(prev => prev.filter(item=> item.file !== file))
	}

	const setUrl = (file, url)=>{
		setFiles(prev => prev.map(oneFile => {
			if (oneFile.file === file){
				oneFile.url = url
				return oneFile
			}
			return oneFile
		}))
	}
	
	const {getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: `${fileType}/*`,
		maxFiles: fileType === "image"? 3 : 50,
		maxSize: fileType === "image" ? 2097152: 5368709120
	})

	return { mainFile: files, getRootProps, getInputProps, deleteFile, setUrl };
};