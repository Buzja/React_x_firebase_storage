import React from 'react'; 
import './ImageFile.css'

function ImageFile({downloadUrl,name,onClick})
{
  return(
    <div className="imageFile">
        <img className="imageFile__img" src={downloadUrl} name={name} alt={name}/>
        <a  className="imageFile__dwnld_btn"  href={downloadUrl} download={downloadUrl} target="_blank">download</a>
        <button  className="imageFile__del_btn" onClick={onClick}>delete</button>
    </div>
  );
} 

export default ImageFile;