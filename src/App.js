import React from 'react';
import TopNavBar from './components/TopNavBar.js'
import SwitchBox from './components/SwitchBox.js'

class App extends React.Component {

  state = {
    userCash: 0,
    userPortfolio: [],
    transactionHistory: [],
    session: false,
    loggedInUserId: null,
    loggedInUserProfile: {}
  }

  //TODO 
  /*
   fix cash/userCash issue
   remove unnecessary console logs
   build out portfolio and transaction history pages
  */

  handleLogin = (obj) => {
    fetch('https://limitless-reef-85588.herokuapp.com/users')
      .then(r => r.json())
      .then(users => {
        let me = users.find(x => x.email === obj.email)
        this.setUser(me)
        this.findPortfolio(me.cash, me.portfolio_items, me.trades)
      })
  }

  addOrRemoveFromPortfolio = (stockData, isBuy) => {
    //isBuy should always be a boolean 
    let transactionData = stockData
    let portfolioItemData = { ticker: stockData.ticker, user_id: stockData.user_id, quantity: stockData.quantity }
    let stateSearch = this.state.userPortfolio.find(stock => stock.ticker.toUpperCase() === stockData.ticker.toUpperCase())

    this.setState({
      transactionHistory: [
        ...this.state.transactionHistory,
        transactionData
      ]
    })
    if (isBuy) {
      if (stockData.ticker === stateSearch.ticker) {
        fetch(`https://limitless-reef-85588.herokuapp.com/users/${localStorage.user_id}`)
          .then(r => r.json())
          .then(user => {
            this.setState({
              userPortfolio: user.portfolio_items
            })
          })
      } else {
        this.setState({
          userPortfolio: [
            ...this.state.userPortfolio,
            portfolioItemData
          ]
        })
      }
    } else {
      fetch(`https://limitless-reef-85588.herokuapp.com/users/${localStorage.user_id}`)
        .then(r => r.json())
        .then(user => {
          this.setState({
            userPortfolio: user.portfolio_items
          })
        })
    }
  }

  updateCash = (amount) => {
    this.setState({
      cash: amount
    })
  }

  handleLogout = () => {
    this.setState({
      userCash: 0,
      userPortfolio: [],
      transactionHistory: [],
      session: false,
      loggedInUserId: null,
      loggedInUserProfile: {}
    })
    window.location.href = window.location.origin;
    localStorage.clear();
  }

  setUser = (obj) => {

    if (typeof (obj) === "number") {
      console.log(obj)
      console.log("saved ya")
      return
    }

    localStorage.user_id = obj.id

    this.setState({
      loggedInUserId: obj.id,
      session: true,
      loggedInUserProfile: obj
    })
  }

  findPortfolio = (amount, stocksArray, trades) => {
    this.setState({
      userCash: amount,
      userPortfolio: stocksArray,
      transactionHistory: trades
    })
  }

  componentDidMount() {
    fetch('https://limitless-reef-85588.herokuapp.com/trades/30').then(r => r.json()).then(res => console.log(res));
    if (localStorage.user_id === "undefined") {
      this.handleLogout()
      return
    }
    if (!!localStorage.user_id) {
      fetch(`https://limitless-reef-85588.herokuapp.com/users/${localStorage.user_id}`)
        .then(r => r.json())
        .then(user => {
          console.log(user)
          this.findPortfolio(user.cash, user.portfolio_items, user.trades)
          this.setUser(user)
        })
    }
  }


  render() {
    return (<>
      <TopNavBar handleLogout={this.handleLogout} appState={this.state} />
      <SwitchBox handleLogin={this.handleLogin} addOrRemoveFromPortfolio={this.addOrRemoveFromPortfolio} updateCash={this.updateCash} cash={this.state.userCash} name={this.state.loggedInUserProfile.first_name} userPortfolio={this.state.userPortfolio} session={this.state.session} setUser={this.setUser} />
    </>
    )
  }
}

export default App;