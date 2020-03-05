import React from 'react';
import LoginMenu from './LoginMenu'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Container, Header } from 'semantic-ui-react'

export default class GreetingScreen extends React.Component {
    state = {
        formType: "menu"
    }

    renderLoginMenu = () => {
        return <LoginMenu changeToLogin={this.changeToLogin} changeToSignup={this.changeToSignup} />
    }

    renderGreetingScreen = () => {
        switch (this.state.formType) {
            case "login":
                return <LoginForm handleLogin={this.props.handleLogin} setUser={this.props.setUser} backToMenu={this.backToMenu} />
            case "signup":
                return <SignupForm setUser={this.props.setUser} backToMenu={this.backToMenu} />
            case "menu":
                return this.renderLoginMenu()
            default:
                console.log("Invalid form type requested")
                this.setState({
                    formType: "menu"
                })
                return this.renderLoginMenu()
        }
    }

    changeToLogin = () => {
        this.setState({
            formType: "login"
        })
    }

    changeToSignup = () => {
        this.setState({
            formType: "signup"
        })
    }

    backToMenu = () => {
        this.setState({
            formType: "menu"
        })
    }

    render() {
        return (
            <Row style={{ minHeight: '98vh', backgroundColor: "#f5f5f5" }}>
                <Col xs={12} sm={12} md={6} lg={6} style={{ padding: '175px 0' }}>
                    <Container style={{ width: '75%' }}>
                        <Header as='h1'>Login or sign up to continue</Header>
                        {this.renderGreetingScreen()}
                    </Container>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} style={{ backgroundImage: "url(/stonks_background.jpg)", backgroundSize: 'cover' }}>
                </Col>
            </Row>)
    }

}

GreetingScreen.propTypes = {
    formType: PropTypes.oneOf([
        "signup", "login", "menu"
    ])
};