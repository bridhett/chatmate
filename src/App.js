import React from 'react';
import './App.css';
import logo from './logo2.png';
import TextInput from './TextInput.js'
import NamePicker from './NamePicker.js'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import Camera from 'react-snap-pic'
import Div100vh from 'react-div-100vh'

class App extends React.Component {
  
  state = {
    messages: [],
    name: '',
    editName: false,
    showCamera: false
  }

  componentWillMount() {
    var name = localStorage.getItem('name')
    if(name) {
      this.setState({name})
    }

    firebase.initializeApp({
      apiKey: "AIzaSyBopV3KcNrYBoVW1_fMxO2_4Y7wOc1eCbA",
      authDomain: "chatmate-29d54.firebaseapp.com",
      projectId: "chatmate-29d54",
      storageBucket: "chatmate-29d54.appspot.com",
    });
    
    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type==='added') {
          //console.log(change.doc.data())
          this.receive({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
        if (change.type==='removed'){
          this.remove(change.doc.id)
        }
      })
    })
  }

  remove = (id) => {
    var msgs = [...this.state.messages]
    var messages = msgs.filter(m=> m.id!==id)
    this.setState({messages})
  }

  receive = (m) => {
    const messages = [m, ...this.state.messages]
    messages.sort((a,b)=>b.ts-a.ts)
    this.setState({messages})
  }

  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }

  setEditName = (editName) => {
    if(!editName) {
      localStorage.setItem('name', this.state.name)
    }
    this.setState({editName})
  }

  takePicture = async (img) => {
    this.setState({showCamera:false})
    const imgID = Math.random().toString(36).substring(7);
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(imgID+'.jpg');
    await ref.putString(img, 'data_url')
    this.send({img: imgID})
  }

  deleteMessage = (m) => {
    var {name} = this.state
    if(name === m.from || name === 'Bridhett') {
      this.db.collection('messages').doc(m.id).delete()
    }
  }

  render() {
    var {messages, name, editName, showCamera} = this.state
    console.log(messages)
    return (
      <Div100vh className="App">
        <header className="header">
          <div style={{display:'flex', alignItems:'center'}}>
          <img src={logo} alt="logo" className="logo" />
          hatmate
          </div>
          <NamePicker 
          name={name}
          editName={editName}
          changeName={name=> this.setState({name})}
          setEditName={this.setEditName}
          />
      </header>
      <main className="messages">
        {messages.map((m, i)=>{
          return (<Message key={i} m={m} name={name} 
            onClick={()=> this.deleteMessage(m)}
          />)
        })}
      </main>
        <TextInput sendMessage={text=> this.send({text})} 
         showCamera={()=>this.setState({showCamera:true})}
        />
        {showCamera && <Camera takePicture={this.takePicture} />}
      </Div100vh>
    );
  }
}

export default App;

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatmate-29d54.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message(props) {
  var {m, name, onClick} = props
  return(<div className="bubble-wrap"
  from={m.from===name ? "me" : "you"}
  onClick={onClick}>
    {m.from!==name && <div className="bubble-name">{m.from}</div>}
    <div className="bubble">
      <span>{m.text}</span>
      {m.img && <img alt="pic" src={bucket+m.img+suffix} />}
    </div>
  </div>)
}