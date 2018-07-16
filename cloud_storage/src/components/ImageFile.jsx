import React from 'react';
import fileSaver from 'file-saver'; 
import './ImageFile.css';
import docImg from './doc.svg';

function ImageFile({downloadUrl,name,type,onClick})
{
  const downloadFunc=(url,name)=>{
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
   xhr.onload = function(event) {
   var blob = xhr.response;
   fileSaver.saveAs(blob,name);
  };
  xhr.open('GET', url);
  xhr.send();
  }

  return(
    <div className="imageFile">
    <div className="info_wrapper">
    <div className="imageFile__image_wrapper" style={type.search("image") !== -1 ?{backgroundImage: `url(${downloadUrl})`}:{backgroundImage: `url(${docImg})`,backgroundSize: '30%', backgroundColor: "#efefef"}}>
          <button  className="imageFile__del_btn" onClick={onClick}>X</button>
        </div>
        <div className="name_sec">
          <div className="name_sec__type">name:</div>
          <div className="name_sec__name">{name}</div>
        </div>
    </div>
        <div className="imageFile__download_sec">
        <button id="download" className="imageFile__dwnld_btn" onClick={()=>{downloadFunc(downloadUrl,name)}} href={downloadUrl} download={downloadUrl} target="_blank">download</button>
        </div>
    </div>
  );
} 

export default ImageFile;