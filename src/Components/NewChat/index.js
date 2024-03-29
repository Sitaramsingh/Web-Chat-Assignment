import React, { Component } from 'react';
import { FormControl, InputLabel, Input, Button, Paper, Typography } from '@material-ui/core';

import './newchat.css';

const firebase = require("firebase");


export class index extends Component {
    constructor() {
        super();
        this.state = {
          username: null,
          message: null
        };
      }

    componentWillMount() {
        if(!firebase.auth().currentUser)
          this.props.history.push('/');
      }
      userTyping = (inputType, e) => {
        switch (inputType) {
          case 'username':
            this.setState({ username: e.target.value });
            break;
          
          case 'message':
            this.setState({ message: e.target.value });
            break;
          default:
            break;
        }
      }
      submitNewChat = async (e) => {
        e.preventDefault();
        const userExists = await this.userExists();
        if(userExists) {
          const chatExists = await this.chatExists();
          chatExists ? this.goToChat() : this.createChat();
        }
      }
      buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(':');
      createChat = () => {
        this.props.newChatSubmitFn({
          sendTo: this.state.username,
          message: this.state.message
        });
      }
      goToChat = () => this.props.goToChatFn(this.buildDocKey(), this.state.message);
      chatExists = async () => {
        const docKey = this.buildDocKey();
        const chat = await 
          firebase
          .firestore()
          .collection('chats')
          .doc(docKey)
          .get();
        console.log(chat.exists);
        return chat.exists;
      }
      userExists = async () => {
          debugger
        const usersSnapshot = await 
        firebase
          .firestore()
          .collection('users')
          .get();
        const exists = usersSnapshot
          .docs
            .map(_doc => _doc.data().email)
            .includes(this.state.username);
        this.setState({ serverError: !exists });
        return exists;
      }

    render() {
        return (
            <main className='main'>
                <Paper className='paper'>
                <Typography component="h1" variant="h5">Send A Message!</Typography>
                <form className='form' onSubmit={(e) => this.submitNewChat(e)}>
                    <FormControl fullWidth>
                    <InputLabel htmlFor='new-chat-username'>
                        Enter Your Friend's Email
                    </InputLabel>
                    <Input required 
                        className='input'
                        autoFocus 
                        onChange={(e) => this.userTyping('username', e)} 
                        id='new-chat-username'>
                    </Input>
                    </FormControl>
                    <FormControl fullWidth>
                    <InputLabel htmlFor='new-chat-message'>
                        Enter Your Message
                    </InputLabel>
                    <Input required 
                        className='input'
                        onChange={(e) => this.userTyping('message', e)} 
                        id='new-chat-message'>
                    </Input>
                    </FormControl>
                    <Button fullWidth variant='contained' color='primary' className='submit' type='submit'>Send</Button>
                </form>
                {
                    this.state.serverError ? 
                    <Typography component='h5' variant='h6' className='errorText'>
                    Unable to locate the user
                    </Typography> :
                    null
                }
                </Paper>
            </main>
        )
    }
}

export default index
