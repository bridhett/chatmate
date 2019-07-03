import React from 'react';
import './App.css';
import logo from './logo2.png';
import TextInput from './TextInput.js'
import NamePicker from './NamePicker.js'

class App extends React.Component {
  
  state = {
    messages: [],
    name: '',
    editName: false
  }

  gotMessage = (m) => {
    // ... spread operator takes takes everything in messages array and adds m which is the new message
    var newMessagesArray = [...this.state.messages, m]
    this.setState({messages: newMessagesArray})
    // same as this.setState({messages: [...this.state.messages, m]})
  }

  render() {
    var {messages} = this.state
    console.log(messages)
    return (
      <div className="App">
        <header className="header">
          <div>
          <img src={logo} alt="logo" className="logo" />
          hatmate
          </div>
          <NamePicker />
      </header>
      <main className="messages">
        {messages.map((m, i)=>{
          return (<div key={i} className="bubble-wrap">
            <div className="bubble">
              <span>{m}</span>
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
