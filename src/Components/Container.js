import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Login from './Login';
import SignUP from './SignUp';

export class ContainerComponent extends Component {
    render() {
        return (
            <Container>
              <SignUP/>  
            </Container>
        )
    }
}

export default ContainerComponent
