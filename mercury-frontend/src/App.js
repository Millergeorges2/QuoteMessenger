import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      phoneNumber: ''
    })
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.sendPhoneNumber = this.sendPhoneNumber.bind(this);
  }

  handlePhoneNumber(event) {
    this.setState({ phoneNumber: event.target.value });
  }


  sendPhoneNumber() {
    if (this.state.phoneNumber.length > 10) {
      alert('You have typed too many characters, do not use dashes')
    } else {
      console.log('click');
      axios
        .get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
        .then(response => {
          return axios.post('http://localhost:8484/api/phone', {
            'quote': response.data[0].content,
            'phoneNumber': this.state.phoneNumber
          })
        })
        .then(response => {
          alert('text sent');
        }).catch(err => console.log(err))
    }

  }

  render() {
    return (
      <div className="App">
        <div id="imageBackground">
        </div>
        <h1 id="title">Quote Messenger</h1>
        <input maxLength="10" type='number' onChange={this.handlePhoneNumber} placeholder="Type your phone number!" />
        <button onClick={this.sendPhoneNumber}><strong>Receive Quote!</strong></button>
      </div>
    );
  }
}

export default App;
