import React from 'react';
import { Container, Header } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap';


export default class PortfolioPage extends React.Component {

    state = {
        value: 0
    }

    getValue = ticker => {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.REACT_APP_SECRET_KEY}`)
            .then(r => r.json())
            .then(res => {
                let newVal = this.state.value + res["Global Quote"]["01. symbol"];
                this.setState({
                    value: newVal
                })
            })
    }

    async componentWillMount() {
        console.log(this.props.portfolio)
        this.props.portfolio.forEach(item => {
            this.getValue(item.ticker)
        })
    }

    render() {

        return (
            <Row style={{ minHeight: '98vh', backgroundColor: "#f5f5f5" }}>
                <Col xs={12} sm={12} md={6} lg={6} style={{ padding: '175px 0' }}>
                    <Container style={{ width: '75%' }}>
                        <Header as='h1'>Welcome, {this.props.name}</Header>
                        <Header as='h3'>Your portfolio value:</Header>
                        <Header as='h3'>${this.state.value}</Header>

                    </Container>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} style={{ backgroundColor: "#7a7a7a" }}>
                    {this.props.portfolio.map(item => {
                        return <p>{item.ticker}</p>
                    })}
                </Col>
            </Row>)
    }

}