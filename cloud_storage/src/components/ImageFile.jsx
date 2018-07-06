import React from 'react'; 

function ImageFile({downloadUrl,name,onClick})
{
  return(
    <div>
        <img src={downloadUrl} name={name} alt={name}/>
        <a href={downloadUrl} download={downloadUrl} target="_blank">download</a>
        <button onClick={onClick}>delete</button>
    </div>
  );
} 

export default ImageFile;