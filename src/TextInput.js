import React from 'react';

class TextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

// I tried updating the DOM with the messages inputted by user but failed.
// Somehow keeps pasting the input over and over in input bar.
  handleSubmit(event) {
    let p = this.state.value;
    this.setState({ value: this.state.value.concat(p)});
    event.preventDefault();
  }


  render(){
    return(<form className="text-input" onSubmit={this.handleSubmit}>
      <input placeholder="new message" type="text" value={this.state.value} onChange={this.handleChange} />
      <input className="button" type="submit" value="↑" />

    </form>)
  }

}

export default TextInput