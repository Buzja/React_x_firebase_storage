import React from 'react';
import './Input.css';

const Input=({onClick}) => {
    return(
        <div className="input_wrapper">
        <input id="file_input" className="input_wrapper__input"  type="file" multiple onChange={(e)=>
            {const SelectedFiles = e.target.files; 
                 SelectedFiles !== null? onClick(SelectedFiles):console.log("Choose Files");
            }
        } />
        <label className="input_wrapper__btn" htmlFor="file_input">Upload</label>
        </div>
    );
}

export default Input;