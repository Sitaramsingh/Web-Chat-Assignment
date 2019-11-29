import React, { Component } from 'react';
import {TextField} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import './chatbox.css';

export class index extends Component {
    constructor() {
        super();
        this.state = {
          chatText: ''
        };
      }

    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value });
    messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
    userClickedInput = () => this.props.userClickedInputFn();
    submitMessage = () => {
        if(this.messageValid(this.state.chatText)) {
        this.props.submitMessageFn(this.state.chatText);
        document.getElementById('chattextbox').value = '';
        }
    }
    
    render() {
        return (
            <div className='chatTextBoxContainer'>
                <TextField
                placeholder='Type your message..' 
                onKeyUp={(e) => this.userTyping(e)}
                id='chattextbox' 
                class='chatTextBox'
                onFocus={this.userClickedInput}>
                </TextField>
                <Send onClick={this.submitMessage} className='sendBtn'></Send>
            </div>
        )
    }
}

export default index
