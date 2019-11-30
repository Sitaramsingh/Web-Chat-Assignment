import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './signup.css';
import {FormControl, InputLabel, Input, Paper, Typography, Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const firebase = require("firebase");

class index extends Component {
    constructor() {
        super();
        this.state = {
          email: null,
          password: null,
          passwordConfirmation: null,
          signupError: ''
        };
      }

      userTyping = (whichInput, event) => {
        switch (whichInput) {
          case 'email':
            this.setState({ email: event.target.value });
            break;
    
          case 'password':
            this.setState({ password: event.target.value });
            break;
    
          case 'passwordConfirmation':
            this.setState({ passwordConfirmation: event.target.value });
            break;
    
          default:
            break;
        }
      }

    formIsValid = () => this.state.password === this.state.passwordConfirmation;
    submitSignup = (e) => {
        //debugger
        e.preventDefault();
    
        if(!this.formIsValid()) {
          this.setState({ signupError: 'Passwords do not match' });
          return;
        }
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(authRes => {
          const userObj = {
            email: authRes.user.email,
            friends: [],
            messages: []
          };
          firebase
            .firestore()
            .collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(() => {
              this.props.history.push('/dashboard');
          }, dbErr => {
            console.log('Failed to add user to the database: ', dbErr);
            this.setState({ signupError: 'Failed to add user' });
          });
      }, authErr => {
        console.log('Failed to create user: ', authErr);
        this.setState({ signupError: 'Failed to add user' });
      });
    };
    render() {
        return (
            <main className="main">
            <CssBaseline/>
            <Paper className="paper">
              <Typography component="h1" variant="h5">
                Sign Up!
              </Typography>
              <form onSubmit={(e) => this.submitSignup(e)} className="form">
                <FormControl required fullWidth margin='normal'>
                  <InputLabel htmlFor='signup-email-input'>Enter Your Email</InputLabel>
                  <Input autoComplete='email' autoFocus onChange={(e) => this.userTyping('email', e)} id='signup-email-input'></Input>
                </FormControl>
                <FormControl required fullWidth margin='normal'>
                  <InputLabel htmlFor='signup-password-input'>Create A Password</InputLabel>
                  <Input type="password" onChange={(e) => this.userTyping('password', e)} id='signup-password-input'></Input>
                </FormControl>
                <FormControl required fullWidth margin='normal'>
                  <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Your Password</InputLabel>
                  <Input type="password" onChange={(e) => this.userTyping('passwordConfirmation', e)} id='signup-password-confirmation-input'></Input>
                </FormControl>
                <Button type='submit' fullWidth variant='contained' color='primary' className="submit">Submit</Button>
              </form>
              { 
                this.state.signupError ? 
                <Typography className="errorText" component='h5' variant='h6'>
                  {this.state.signupError}
                </Typography> :
                null
              }
              <h5 className="hasAccountHeader">Already Have An Account?</h5>
                <Link className="logInLink" to='/login'>Log In!</Link>
            </Paper>
          </main>
        
        )
    }
}

export default index;
