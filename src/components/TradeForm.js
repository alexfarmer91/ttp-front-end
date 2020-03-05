import React from 'react';
import { Input, Button, Form, Container, Header } from 'semantic-ui-react'

export default class TradeForm extends React.Component {

    state = {
        quantity: 0
    }

    quantityChange = (event) => {
        this.setState({
            quantity: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.value)
    }

    buyShares = () => {
        let newCash = (parseInt(this.props.cash) - (parseInt(this.props.price) * parseFloat(parseInt(this.state.quantity).toFixed(2))))
        Promise.all([
            fetch('https://limitless-reef-85588.herokuapp.com/trades', {
                method: "POST",
                body: JSON.stringify({
                    ticker: this.props.symbol.toUpperCase(),
                    quantity: this.state.quantity,
                    user_id: localStorage.user_id,
                    price: this.props.price,
                    buy: true
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(r => r.json()),
            fetch('https://limitless-reef-85588.herokuapp.com/portfolio_items', {
                method: "POST",
                body: JSON.stringify({
                    ticker: this.props.symbol,
                    quantity: this.state.quantity,
                    user_id: localStorage.user_id
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(r => r.json()),
            fetch(`https://limitless-reef-85588.herokuapp.com/users/${localStorage.user_id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    cash: newCash
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        ])
            .then((value) => {
                console.log(value)
                let newCash = (parseInt(this.props.cash) - (parseInt(this.props.price) * parseFloat(parseInt(this.state.quantity).toFixed(2))))
                this.props.addOrRemoveFromPortfolio(value[0], true)
                this.props.updateCash(newCash)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    sellShares = () => {
        let stockId = this.props.portfolio.find(x => x.ticker === this.props.symbol.toUpperCase()).id;
        let updatedCash = (parseInt(this.props.cash) + (parseInt(this.props.price) * parseFloat(parseInt(this.state.quantity).toFixed(2))));

        Promise.all([
            fetch('https://limitless-reef-85588.herokuapp.com/trades', {
                method: "POST",
                body: JSON.stringify({
                    ticker: this.props.symbol.toUpperCase(),
                    quantity: this.state.quantity,
                    user_id: localStorage.user_id,
                    price: this.props.price,
                    buy: false
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(r => r.json()),
            fetch(`https://limitless-reef-85588.herokuapp.com/portfolio_items/${stockId}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    ticker: this.props.symbol.toUpperCase(),
                    quantity: this.state.quantity,
                    user_id: localStorage.user_id
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(r => r.json()),
            fetch(`https://limitless-reef-85588.herokuapp.com/users/${localStorage.user_id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    cash: updatedCash
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        ])
            .then((value) => {
                console.log(value)
                this.props.addOrRemoveFromPortfolio(value[0], false)
                this.props.updateCash(updatedCash)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    compare = () => {
        return (this.props.cash > (this.props.price * this.state.quantity).toFixed(2))
    }

    renderButtons = () => {
        return (<Container>
            <Button disabled={this.compare() ? false : true} onClick={this.buyShares} color={this.compare() ? 'red' : 'grey'} >Buy</Button>
            <Button onClick={this.sellShares} color={'blue'} >Sell</Button>
            {/* {this.props.portfolio.includes(this.props.symbol) ? <Button onClick={this.sellShares} color={'blue'} >Sell</Button> : null} */}
        </Container>)
    }

    render() {
        return <Container>
            <Form >
                <Input label="Quantity" value={parseInt(this.state.quantity)} onChange={this.quantityChange} type="number" /><br></br>
                <div style={{ 'height': '2vh' }} />
                {this.renderButtons()}
            </Form>
            <Header as='h6'>Total cost: ${(parseInt(this.props.price) * parseInt(this.state.quantity).toFixed(2))}</Header>
            <Header as='h6'>Cash available: ${this.props.cash}</Header>
        </Container>
    }
}