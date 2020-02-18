import React from 'react'
import { Container, Button, Header } from 'semantic-ui-react'

const ResultsContainer = (props) => {
    return (<Container style={{ 'paddingLeft': '20vh', 'paddingTop': '30vh', 'margin': 'auto' }}>
        <Header>Search Results</Header>
        <Container>
            {props.results.map(result => {
                return <Button href={`http://localhost:3001/trade/${result["1. symbol"]}`} key={result["1. symbol"]}>{result["1. symbol"]} - {result["2. name"]}</Button>
            })}
        </Container>
    </Container>
    )
}

export default ResultsContainer