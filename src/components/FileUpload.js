import React, {useState} from 'react';

function FileUpload(){

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		// setIsSelected(true);
	};

	const handleSubmission = () => {
	};

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
		   
		</div>
	)
}
export default FileUpload;