import React from 'react';
import GreetingScreen from './GreetingScreen'
import StockSearchDashboard from './StockSearchDashboard.js'
import BuySellPage from './BuySellPage.js'
import TransactionPage from './TransactionPage.js'
import PortfolioPage from './PortfolioPage.js'
import { Route, Switch, Redirect } from 'react-router-dom'

class SwitchBox extends React.Component {

    redirectIfLoggedIn = () => {
        if (!this.props.session) {
            return <GreetingScreen handleLogin={this.props.handleLogin} setUser={this.props.setUser} />
        } else {
            return <Redirect to="/trade" />
        }
    }

    renderTransactionPage = () => {
        return <TransactionPage />
    }

    renderPortfolio = () => {
        return <PortfolioPage />
    }

    renderBuySellPage = (props) => {
        return <BuySellPage addOrRemoveFromPortfolio={this.props.addOrRemoveFromPortfolio} userPortfolio={this.props.userPortfolio} cash={this.props.cash} {...props} session={this.props.session} updateCash={this.props.updateCash} />
    }

    renderStockSearchPage = () => {
        return <StockSearchDashboard />
    }

    render() {
        return (
            <Switch>
                <Route exact path="/users/:id/portfolio" render={this.renderPortfolio} />
                {/* <Route exact path="/users/:id/profile" render={this.renderUserPage} /> */}
                <Route exact path="/users/:id/transactions" render={this.renderTransactionPage} />
                <Route exact path="/trade/:id" render={this.renderBuySellPage} />
                <Route exact path="/trade/" render={this.renderStockSearchPage} />
                <Route exact path="/" render={this.redirectIfLoggedIn} />
            </Switch>)
    }
}

export default SwitchBox;