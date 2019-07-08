import React from 'react';
import './App.css';
import logo from './logo2.png';
import TextInput from './TextInput.js'
import NamePicker from './NamePicker.js'

class App extends React.Component {
  
  state = {
    messages: [],
    name: '',
    editName: false,
  }

  gotMessage = (m) => {
    const message = {
      text: m,
      from: this.state.name
    }
    // ... spread operator takes takes everything in messages array and adds m which is the new message
    var newMessagesArray = [...this.state.messages, message]
    this.setState({messages: newMessagesArray})
    // same as this.setState({messages: [...this.state.messages, m]})
  }

  render() {
    var {messages} = this.state
    console.log(messages)
    return (
      <div className="App">
        <header className="header">
          <div className="app-title">
          <img src={logo} alt="logo" className="logo" />
          hatmate
          </div>
          <NamePicker 
          name={this.state.name}
          editName={this.state.editName}
          changeName={name=> this.setState({name})}
          setEditName={editName=> this.setState({editName})}/>
      </header>
      <main className="messages">
        {messages.map((m, i)=>{
          return (<div key={i} className="bubble-wrap">
            <div className="bubble">
              <div className="bubble-name">{m.from}</div>
              <span>{m.text}</span>
            </div>
          </div>)
        })}
      </main>
        <TextInput sendMessage={this.gotMessage} />
      </div>
    );
  }
}
export default App;
