import React from 'react';
import { TiArrowUpOutline } from "react-icons/ti";
import { FiSend, FiCamera } from 'react-icons/fi';

class TextInput extends React.Component {
   
  state = {
    text:"",
  }

  // fat arrow allows you to use this inside function
  send = () => {
    // props live in the Apps.js file e.g. <TextInput />
    this.props.sendMessage(this.state.text)
    this.setState({text:""})
  }

  keyPress = (e) => {
    console.log(e.key)
    if(e.key === 'Enter') {
      this.send()
    }
  }

  render(){
    var {text} = this.state
    return(<div className="text-input">
      <button onClick={this.props.showCamera}
      style={{left:10, right:'auto'}}>
      <FiCamera style={{height:15, width:15}} />
      </button>
      <input placeholder="new message" type="text" value={text} 
      onChange={e => this.setState({text: e.target.value})} 
      onKeyPress={this.keyPress} />
      <button disabled={!text} onClick={this.send}>
        <TiArrowUpOutline />
      </button>

    </div>)
  }

}

export default TextInput