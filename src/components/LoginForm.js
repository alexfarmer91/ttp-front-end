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
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "LT1"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.errors || data.error) {
                    console.log(data.errors)
                    this.setState({
                        errors: data.errors
                    })
                } else {
                    console.log(data)
                    this.props.setToken(data)
                }
            })
    }

    render() {
        return (<Container textAlign={'left'}>
            <Form onSubmit={this.handleSubmit} unstackable >
                <Input label="Email" onChange={this.emailChange} type="text" /><br></br>
                <Input label="Password" onChange={this.passwordChange} type="password" /><br></br>
                <Container>
                    <Button onClick={this.props.backToMenu} >Back</Button>
                    <input type="submit" value="Log In" class="ui blue button" />
                </Container>
            </Form>
        </Container>)
    }
}