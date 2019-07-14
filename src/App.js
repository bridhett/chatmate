import React from 'react';
import './App.css';
import logo from './logo2.png';
import TextInput from './TextInput.js'
import NamePicker from './NamePicker.js'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import Camera from 'react-snap-pic'

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
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive(change.doc.data())
        }
      })
    })
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

  takePicture = (img) => {
    console.log(img)
    this.setState({showCamera:false})
}

  render() {
    var {messages, name, editName} = this.state
    console.log(messages)
    return (
      <div className="App">
        <header className="header">
          <div className="app-title">
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
          return <Message key={i} m={m} name={name} />
        })}
      </main>
        <TextInput sendMessage={text=> this.send({text})} 
         showCamera={()=>this.setState({showCamera:true})}
        />
        {this.state.showCamera && <Camera takePicture={this.takePicture} />}
      </div>
    );
  }
}
export default App;

function Message(props) {
  var {m, name} = props
  return(<div className="bubble-wrap"
  from={m.from===name ? "me" : "you"}>
    {m.from!==name && <div className="bubble-name">{m.from}</div>}
    <div className="bubble">
      <span>{m.text}</span>
    </div>
  </div>)
}