import React, { Component } from 'react';

import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider, Button, ListItemIcon} from '@material-ui/core';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import './chatlist.css';

export class index extends Component {

  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
    render() {
        if(this.props.chats.length > 0) {
            return(
              <div className="root">
                  <Button variant="contained" 
                    fullWidth 
                    color='primary' 
                    onClick={this.newChat} 
                    className='newChatBtn'>
                      New Message
                  </Button>
                  <List>
                    {
                      this.props.chats.map((_chat, _index) => {
                        return (
                          <div key={_index}>
                            <ListItem onClick={() => this.selectChat(_index)} 
                              className='listItem'
                              selected={this.props.selectedChatIndex === _index} 
                              alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar alt="Remy Sharp">{_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                                secondary={
                                  <React.Fragment>
                                    <Typography component='span'
                                      color='textPrimary'>
                                        {_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}
                                    </Typography>
                                  </React.Fragment>
                                }/>
                                {
                                  _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
                                  <ListItemIcon><NotificationImportant className="unreadMessage"></NotificationImportant></ListItemIcon> :
                                  null
                                }
                            </ListItem>
                            <Divider/>
                          </div>
                        )
                      })
                    }
                  </List>
                  <Button className="signOutBtn" onClick={this.props.onClickSignOut}>Sign Out</Button>
              </div>
            );
          } else {
            return(
              <div className='root'>
                <Button variant="contained" 
                  fullWidth 
                  color='primary' 
                  onClick={this.newChat} 
                  className='newChatBtn'>
                    New Message
                </Button>
                <List></List>
              </div>
            );
          }
        // return (
        //     <div>
                
        //     </div>
        // )
    }
}

export default index
