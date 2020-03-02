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

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      userCash: 0,
      userPortfolio: [],
      transactionHistory: [],
      session: false,
      loggedInUserId: null,
      loggedInUserProfile: {}
    })
    window.location.reload();
  }

  setUser = (obj) => {

    const { user_id } = obj
    localStorage.user_id = user_id

    this.setState({
      loggedInUserId: user_id,
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
    if (!!localStorage.user_id) {
      fetch(`https://limitless-reef-85588.herokuapp.com/users/${localStorage.user_id}`)
        .then(r => r.json())
        .then(user => {
          console.log(user)
          this.findPortfolio(user.cash, user.portfolio_items, user.trades)
          this.setUser(localStorage)
        })
    }
  }


  render() {
    return (<>
      <TopNavBar handleLogout={this.handleLogout} appState={this.state} />
      <SwitchBox cash={this.state.userCash} userPortfolio={this.state.userPortfolio} session={this.state.session} setUser={this.setUser} />
    </>
    )
  }
}

export default App;
