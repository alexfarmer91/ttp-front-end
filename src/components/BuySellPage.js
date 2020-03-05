import React from 'react';
import TradeForm from './TradeForm.js'
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Icon, Header, Label } from 'semantic-ui-react'

export default class BuySellPage extends React.Component {

    state = {
        symbol: this.props.match.url.replace('/trade/', ''),
        open: 0,
        high: 0,
        low: 0,
        price: 0,
        volume: 0,
        latestTradingDay: "date",
        previousClose: 0,
        change: 0,
        changePercent: 0
    }

    stockPerformance = (num) => {
        if (Math.sign(num) === 1) {
            return <Icon name='arrow alternate circle up' color='green' />
        } else {
            return <Icon name='arrow alternate circle down' color='red' />
        }
    }

    changeRender = () => {
        if (Math.sign(parseFloat(this.state.change)) === 1) {
            return "$" + this.state.change
        } else {
            return "-$" + Math.abs(parseFloat(this.state.change))
        }
    }

    componentDidMount() {
        let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.symbol}&apikey=${process.env.REACT_APP_SECRET_KEY}`
        fetch(url)
            .then(r => r.json())
            .then(response => {
                let data = response["Global Quote"]
                this.setState({
                    open: data["02. open"],
                    high: data["03. high"],
                    low: data["04. low"],
                    price: data["05. price"],
                    volume: data["06. volume"],
                    latestTradingDay: data["07. latest trading day"],
                    previousClose: data["08. previous close"],
                    change: data["09. change"],
                    changePercent: data["10. change percent"]
                })
            })
    }

    render() {
        return <Row style={{ minHeight: '98vh', backgroundColor: "#f5f5f5" }}>
            <Col xs={12} sm={12} md={6} lg={6} style={{ padding: '20vh 0' }}>
                <Container style={{ 'paddingLeft': '15vh' }}>
                    <Header>Summary for {this.state.symbol.toUpperCase()}</Header>
                    <Label size={'big'}>
                        ${this.state.price}
                    </Label><br></br>
                    <div style={{ 'height': '2vh' }}></div>
                    <Label>
                        {this.stockPerformance(parseFloat(this.state.changePercent))} {this.state.changePercent}
                    </Label>
                    <Header as='h5' >Open: {this.state.open}</Header>
                    <Header as='h5' >High: {this.state.high}</Header>
                    <Header as='h5' >Low: {this.state.low}</Header>
                    <Header as='h5' >Volume: {this.state.volume}</Header>
                    <Header as='h5' >Previous close: {this.state.previousClose}</Header>
                    <Header as='h5' >Change: {this.changeRender()}</Header>
                </Container>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} style={{ padding: '20vh 0' }}>
                <Container style={{ 'paddingLeft': '15vh', 'paddingTop': '10vh' }}>
                    {!!localStorage.user_id ? <TradeForm addOrRemoveFromPortfolio={this.props.addOrRemoveFromPortfolio} updateCash={this.props.updateCash} cash={this.props.cash} symbol={this.state.symbol} price={this.state.price} portfolio={this.props.userPortfolio} /> : null}
                </Container>
            </Col>
        </Row>
    }
}