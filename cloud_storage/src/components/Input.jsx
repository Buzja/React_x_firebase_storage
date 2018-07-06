import React from 'react';

const Input=({onClick}) => {
    let SelectedFiles=null;

    return(
        <div>
        <input  type="file" multiple onChange={(e)=>SelectedFiles = e.target.files} />
        <button onClick={()=>SelectedFiles !== null? onClick(SelectedFiles):console.log("Choose Files")}>Upload</button>
        </div>
    );
}

export default Input;