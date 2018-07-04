import React, {Component} from 'react';
import firebase from 'firebase';


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

  uploadFiles = e =>{
    const uploadFile = e.target.files[0];
    const filesFromState = this.state.files;
    for(let file of filesFromState){
      if(file.name === uploadFile.name){
        console.log("Thats file currently Exist!");
        return;
      }
    }    
    const uploadTask = storage.ref(`files/${uploadFile.name}`).put(uploadFile);
    uploadTask.on('state_changed', function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, function(error) {
    console.log(error);
  }, function() {
    storage.ref(`files/${uploadFile.name}`).getDownloadURL().then(url=>database.ref('files').push().set({
       name: uploadFile.name,
       downloadUrl: url
       }))
  });
  }

  componentWillMount=()=>{
    const prevFiles = this.state.files;

    database.ref('files').on('child_added',snap=>{
      prevFiles.push({
        id: snap.key,
        name: snap.val().name,
        downloadUrl: snap.val().downloadUrl
      })

      this.setState({
        files: prevFiles
      }, console.log(this.state))
    })

    database.ref('files').on('child_removed',snap=>{
      for(let i =0; i<prevFiles.length;i++){
        if(prevFiles[i].id === snap.key){
          prevFiles.splice(i,1);
        }
      }

      this.setState({
        users: prevFiles
      }, console.log(this.state))
    })
  }

  deleteFile=(file)=>{
    storage.ref(`files/${file.name}`).delete().then(()=>{
      database.ref('files').child(file.id).remove();
      console.log("deleted successfully!");
    })
  }

  render() {
  const images = this.state.files.map(file=>(<div className="image"><img key={file.id} style={{maxWidth:300}} src={file.downloadUrl} name={file.name} alt={file.name}/>
  <a href={file.downloadUrl} download={file.name} target="_blank">download</a>
  <button onClick={()=>this.deleteFile(file)}>delete</button>
  </div>));
    return (
      <div className="App">        
        <input id="fileUpload" type="file" multiple onChange={this.uploadFiles} />
        {images}
      </div>
    );
  }
}

export default App;