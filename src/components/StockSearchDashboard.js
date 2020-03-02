import React from 'react';
import ResultsContainer from '../containers/ResultsContainer.js'
import { Row, Col } from 'react-bootstrap';
import { Input, Button, Icon, Container, Header } from 'semantic-ui-react'

class StockSearchDashboard extends React.Component {

    state = {
        searchInput: "",
        results: []
    }

    resultClick = (value) => {
        let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=${process.env.REACT_APP_SECRET_KEY}`
        fetch(url)
            .then(r => r.json())
            .then(response => {
                this.setState({
                    displayStock: value,
                    displayStockData: response["Global Quote"]
                })
            })
    }

    handleTickerChange = (event) => {
        this.setState({
            searchInput: event.target.value
        })
    }

    searchEndpoint = () => {
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.searchInput}&apikey=${process.env.REACT_APP_SECRET_KEY}`)
            .then(r => r.json())
            .then(response => {
                this.setState({
                    results: response["bestMatches"]
                })
                console.log(response["bestMatches"])
            })
    }

    componentDidMount() {
        console.log("loaded")
    }

    render() {
        return (<Row style={{ minHeight: '98vh', backgroundColor: "#f5f5f5" }}>
            <Col xs={12} sm={12} md={6} lg={6} style={{ padding: '175px 0' }}>
                <Container style={{ 'paddingLeft': '30vh', 'margin': 'auto' }}>
                    {this.state.results.length === 0 ? <Header as='h1'>Search for tickers or stock names below...</Header> : null}
                    <Input
                        placeholder='Search...'
                        onChange={this.handleTickerChange}
                        value={this.state.searchInput}
                        style={{ 'paddingBottom': '1vh', 'paddingTop': '1vh' }} />
                    <br></br>
                    <Button icon labelPosition='left' onClick={this.searchEndpoint} >
                        <Icon name='search' />
                        Search
                </Button>
                </Container>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} >
                <ResultsContainer results={this.state.results} resultClick={this.resultClick} clearSearch={this.clearSearch} />
            </Col>
        </Row>)
    }
}

{/* <Container>
                <Input
                    placeholder='Search...'
                    onChange={this.handleTickerChange}
                    value={this.state.searchInput}
                />
                <Button icon='search' onClick={this.searchEndpoint} />
                <ResultsContainer results={this.state.results} resultClick={this.resultClick} clearSearch={this.clearSearch} />
                {this.state.displayStock === "" ? null : <DisplayCard symbol={this.state.displayStockData["01. symbol"]} price={this.state.displayStockData["05. price"]} change={this.state.displayStockData["10. change percent"]} volume={this.state.displayStockData["06. volume"]} />}
            </Container> */}

export default StockSearchDashboard;
