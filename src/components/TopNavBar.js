import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default class TopNavbar extends React.Component {

    renderLogoutButton = () => {
        if (this.props.appState.session) {
            return (
                <>
                    <Nav.Link as={Link} eventKey="1" to="/users/:id/portfolio" style={{ textDecoration: 'none' }}>
                        <b>Portfolio</b>
                    </Nav.Link>
                    <Nav.Link as={Link} eventKey="2" to="/users/:id/transactions" style={{ textDecoration: 'none' }}>
                        <b>Transactions</b>
                    </Nav.Link>
                    <Nav.Link as={Link} eventKey="3" to="/trade/" style={{ textDecoration: 'none' }}>
                        <b>Trade</b>
                    </Nav.Link>
                    <Nav.Link onClick={() => this.props.handleLogout()}>
                        <Icon name="log out" />
                    </Nav.Link>
                </>
            )
        }
    }

    render() {
        return (
            <Navbar eventKey="1" style={{ backgroundColor: 'black' }} variant="dark">
                <Navbar.Brand href="/">
                    <b>Welcome to Stonks 📈</b>
                </Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                <Nav>
                    {this.renderLogoutButton()}
                </Nav>
            </Navbar>
        )
    }
}