import {  Link } from 'react-router-dom';
import React from 'react';
import './login.css';
import {FormControl,InputLabel,Input, Paper,Typography, Button} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const firebase = require("firebase");

class index extends React.Component {
    constructor() {
        super();
        this.state = {
          email: null,
          password: null,
          serverError: false
        };
      }
     submitLogin = async (e) => {
        e.preventDefault();
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            this.props.history.push('/dashboard');
          }, err => {
            this.setState({ serverError: true });
            console.log('Not logging in: ', err);
          });
      };
      userTyping = (whichInput, event) => {
        switch (whichInput) {
          case 'email':
            this.setState({ email: event.target.value });
            break;
          case 'password':
            this.setState({ password: event.target.value });
            break;
          default:
            break;
        }
      }
    
    render() {
        return (
            <div>
                <main className="main">
                    <CssBaseline/>
                    <Paper className="paper">
                        <Typography component="h1" variant="h5">
            Log In!
          </Typography>
                        <form onSubmit={(e) => this.submitLogin(e)} className="form">
                            <FormControl required fullWidth margin='normal'>
                                <InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
                                <Input autoComplete='email' autoFocus onChange={(e) => this.userTyping('email', e)} id='login-email-input'></Input>
                            </FormControl>
                                <FormControl required fullWidth margin='normal'>
                                <InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
                                <Input autoComplete="current-password" type="password" onChange={(e) => this.userTyping('password', e)} id='login-password-input'></Input>
                            </FormControl>
                            <Button type='submit' fullWidth variant='contained' color='primary' className="submit">Log In</Button>
                        </form>
                        { this.state.serverError ? 
                            <Typography className="errorText" component='h5' variant='h6'>
                            Incorrect Login Information
                            </Typography> :
                            null
                        }
                        <h5 className="noAccountHeader">Don't Have An Account?</h5>
                          <Link className="signUpLink" to='/signup'>Sign Up!</Link>
                    </Paper>
                </main>
            </div>
        )
    }
}

export default index
