import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
// import Cookies from 'js-cookie'
import Home from './components/Home'
import Repositories from './components/Repositories'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'
import CommonContext from './ReactContext/CommonContext'

import './App.css'

class App extends Component {
  state = {isHamburgerActive: false, staredList: []}

  onClickHamburger = () => {
    this.setState(prevState => ({
      isHamburgerActive: !prevState.isHamburgerActive,
    }))
  }

  onClickStar = repoName => {
    const {staredList} = this.state
    const isAlreadyStared = staredList.filter(
      eachRepoName => eachRepoName === repoName,
    )

    if (isAlreadyStared.length > 0) {
      this.setState(prevState => ({
        staredList: [
          ...prevState.staredList.filter(eachItem => eachItem !== repoName),
        ],
      }))
    } else {
      this.setState(prevState => ({
        staredList: [...prevState.staredList, repoName],
      }))
    }
  }

  render() {
    const {isHamburgerActive, staredList} = this.state

    return (
      <CommonContext.Provider
        value={{
          isHamburgerActive,
          staredList,
          onClickHamburger: this.onClickHamburger,
          onClickStar: this.onClickStar,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/repositories" component={Repositories} />
          <Route
            exact
            path="/repositories/:repoName"
            component={RepositoryItemDetails}
          />
          <Route exact path="/analysis" component={Analysis} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CommonContext.Provider>
    )
  }
}

export default App
