import React from 'react';
import { Input, Button, Form, Container } from 'semantic-ui-react'

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

    sellShares = () => {
        console.log('sold')
    }

    buyShares = () => {
        fetch()
    }

    renderButtons = () => {
        return (<Container>
            <Button onClick={this.buyShares} color={'red'} >Buy</Button>
            <Button onClick={this.sellShares} color={'blue'} >Sell</Button>
            {/* {this.props.portfolio.includes(this.props.symbol) ? <Button onClick={this.sellShares} color={'blue'} >Sell</Button> : null} */}
        </Container>)
    }

    render() {
        return <Form >
            <Input label="Quantity" value={this.state.quantity} onChange={this.quantityChange} type="integer" /><br></br>
            <div style={{ 'height': '2vh' }} />
            {this.renderButtons()}
        </Form>
    }
}