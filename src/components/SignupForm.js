import React from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react'

export default class SignupForm extends React.Component {
    state = {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    }
    emailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    lastNameChange = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    firstNameChange = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    passwordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/users/', {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password_digest: this.state.password,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                cash: 5000
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // "Authorization": "LT1"
            }
        })
            .then(r => r.json())
            .then(response => {
                if (!!response.user_id) {
                    console.log(response)
                    this.props.setToken(response)
                } else {
                    console.log('error')
                    console.log(response)
                }
            })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{ width: '40%', 'align-content': 'center' }}>
                <Input style={{ width: '100%', margin: 'auto', padding: '10px' }} label="Email" onChange={this.emailChange} type="text" /><br></br>

                <Input style={{ width: '100%', margin: 'auto', padding: '10px' }} label="Fist Name" onChange={this.firstNameChange} type="text" /><br></br>

                <Input style={{ width: '100%', margin: 'auto', padding: '10px' }} label="Last Name" onChange={this.lastNameChange} type="text" /><br></br>

                <Input style={{ width: '100%', margin: 'auto', padding: '10px' }} label="Password" onChange={this.passwordChange} type="password" /><br></br>

                <Button onClick={this.props.backToMenu} >Back</Button>
                <input type="submit" value="Sign Up" class="ui blue button" />
            </Form>
        )
    }
}