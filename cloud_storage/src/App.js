import React, {Component} from 'react';
import firebase from 'firebase';
import ImageFile from './components/ImageFile';
import Input from './components/Input';
import './App.css';

const config = {
  apiKey: "AIzaSyDk4JksCFeMAzEmlX53iAdI4wGrh9sGxP4",
  authDomain: "test-67f1c.firebaseapp.com",
  databaseURL: "https://test-67f1c.firebaseio.com",
  projectId: "test-67f1c",
  storageBucket: "test-67f1c.appspot.com",
  messagingSenderId: "838573815134"
};
firebase.initializeApp(config);
const storage = firebase.storage();
const database = firebase.database();

class App extends Component {

  state ={
    files:[]
  }

  uploadFiles = selectedFiles =>{
    for(let i=0;i<selectedFiles.length;i++){
      const uploadFile = selectedFiles[i];   
      const filesFromState = this.state.files;
  
      for(let file of filesFromState){
        if(file.name === uploadFile.name){
          console.log("Thats file currently Exist!");
          return;
        }
      }    
      const uploadTask = storage.ref(`files/${uploadFile.name}`).put(uploadFile);
      uploadTask.on('state_changed', function(snapshot){
      var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log('Upload is ' + progress + '% done');
    }, function(error) {
      console.log(error);
    }, function() {
      storage.ref(`files/${uploadFile.name}`).getDownloadURL().then(url=>database.ref('files').push().set({
         name: uploadFile.name,
         downloadUrl: url,
         type: uploadFile.type
         }))
    });
    }
  }

  componentWillMount=()=>{
    const prevFiles = this.state.files;

    database.ref('files').on('child_added',snap=>{
      prevFiles.push({
        id: snap.key,
        name: snap.val().name,
        downloadUrl: snap.val().downloadUrl,
        type: snap.val().type
      })

      this.setState({
        files: prevFiles
      })
    })

    database.ref('files').on('child_removed',snap=>{
      for(let i =0; i<prevFiles.length;i++){
        if(prevFiles[i].id === snap.key){
          prevFiles.splice(i,1);
        }
      }

      this.setState({
        users: prevFiles
      })
    })
  }

  deleteFile=(file)=>{
    storage.ref(`files/${file.name}`).delete().then(()=>{
      database.ref('files').child(file.id).remove();
      console.log("deleted successfully!");
    })
  }

  render() {
  const files = this.state.files.map(file=>(
  <ImageFile key={file.id} downloadUrl={file.downloadUrl} name={file.name} type={file.type} onClick={()=>this.deleteFile(file)}/>
));
    return (
      <div className="App">
        <Input onClick={this.uploadFiles}/>
        <div className="files_wrapper">         
        {files}
        </div>
      </div>
    );
  }
}

export default App;