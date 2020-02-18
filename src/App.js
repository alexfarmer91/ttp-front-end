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
    token: null,
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
      token: null
    })
    window.location.reload();
  }

  setToken = (obj) => {

    const { token, user_id } = obj

    localStorage.token = token
    localStorage.user_id = user_id

    this.setState({
      token: token,
      loggedInUserId: user_id,
      session: true
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
    // console.log(process.env.REACT_APP_SECRET_KEY)
    if (!!localStorage.user_id) {
      fetch(`http://localhost:3000/users/${localStorage.user_id}`)
        .then(r => r.json())
        .then(user => {
          console.log(user)
          this.findPortfolio(user.cash, user.portfolio_items, user.trades)
          this.setToken(localStorage)
        })
    }
  }


  render() {
    return (<>
      <TopNavBar handleLogout={this.handleLogout} appState={this.state} />
      <SwitchBox userPortfolio={this.state.userPortfolio} session={this.state.session} setToken={this.setToken} />
    </>
    )
  }
}

export default App;
