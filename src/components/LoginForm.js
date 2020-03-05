import React from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react'

export default class LoginForm extends React.Component {
    state = {
        email: "",
        password: "",
        errors: []
    }
    emailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    passwordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        this.props.handleLogin(this.state)
    }

    render() {
        return (<Container textAlign={'left'}>
            <Form onSubmit={this.handleSubmit} unstackable >
                <Input label="Email" onChange={this.emailChange} type="text" /><br></br>
                <Input label="Password" onChange={this.passwordChange} type="password" /><br></br>
                <Container>
                    <Button onClick={this.props.backToMenu} >Back</Button>
                    <input type="submit" value="Log In" className="ui blue button" />
                </Container>
            </Form>
        </Container>)
    }
}