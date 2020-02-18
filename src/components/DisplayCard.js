import React from 'react'
import { Card, Button, Header } from 'semantic-ui-react'

const DisplayCard = (props) => {
    return (<Card >
        <Header style={{ 'text-align': 'center' }} as='h2'>{props.symbol}</Header>
        <Card.Content>
            <Card.Header>Price: {props.price}</Card.Header>
            <Card.Meta>
                <span className='change'>Daily Change: {props.change}</span>
            </Card.Meta>
            <Card.Description>
                Volume: {props.volume}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button>Buy</Button>
        </Card.Content>
    </Card>)
}

export default DisplayCard