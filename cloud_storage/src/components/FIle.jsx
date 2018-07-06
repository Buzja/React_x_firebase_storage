import React from 'react'; 

function File({downloadUrl,name,onClick})
{
  return(
    <div>
        <h1>{name}</h1>
        <a href={downloadUrl} download={name} target="_blank">download</a>
        <button onClick={onClick}>delete</button>
    </div>
  );
} 

export default File;