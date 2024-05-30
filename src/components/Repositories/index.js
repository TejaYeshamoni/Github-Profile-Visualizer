import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ReposItem from '../ReposItem'
import CommonContext from '../../ReactContext/CommonContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  empty: 'EMPTY',
  noData: 'NODATA',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Repositories extends Component {
  state = {
    reposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositoriesList()
  }

  onSuccessFulResponse = reposList => {
    if (reposList.length > 0) {
      this.setState({reposList, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.empty})
    }
  }

  onFailureResponse = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  getRepositoriesList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const username = Cookies.get('username')

    if (username === undefined) {
      this.setState({apiStatus: apiStatusConstants.noData})
    } else {
      const apiKey = process.env.REACT_APP_GIT_KEY

      const url = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${apiKey}`

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok === true) {
        const formattedReposList = data.map(eachItem => ({
          id: eachItem.id,
          name: eachItem.name,
          description: eachItem.description,
          languages: eachItem.languages,
          stargazersCount: eachItem.stargazers_count,
          forksCount: eachItem.forks_count,
        }))

        this.onSuccessFulResponse(formattedReposList)
      } else {
        this.onFailureResponse()
      }
    }
  }

  changeToHomeRoute = () => {
    const {history} = this.props
    history.push('/')
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {reposList} = this.state

    return (
      <>
        <h1 className="repo-h1">Repositories</h1>
        <ul className="repos-ul-cont">
          {reposList.map(eachItem => (
            <ReposItem key={eachItem.id} reposDetails={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderEmptyView = () => (
    <div className="empty-view">
      <img
        className="home-img"
        src="https://res.cloudinary.com/dkk6a7svu/image/upload/v1713846282/savx8zla5j8zhawxwu8u.png"
        alt="no repositories"
      />
      <p className="home-h1 failure-para empty-p">No Repositories Found!</p>
    </div>
  )

  renderNoDataView = () => (
    <div className="no-data-view">
      <img
        className="home-img no-data-img"
        src="https://res.cloudinary.com/dkk6a7svu/image/upload/v1713866849/gl29oaabb5z4yxoadspg.png"
        alt="empty repositories"
      />
      <h1 className="home-h1 failure-para no-data-h1">No Data Found</h1>
      <p className="home-h1 failure-para no-data-p">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <button
        className="no-data-btn"
        type="button"
        onClick={this.changeToHomeRoute}
      >
        Go to Home
      </button>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="home-img"
        src="https://res.cloudinary.com/dkk6a7svu/image/upload/v1713380049/ik5oau3ijw25xzrqttuo.png"
        alt="failure view"
      />
      <p className="home-h1 failure-para">
        Something went wrong. Please try again
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getRepositoriesList}
      >
        Try again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    const getActiveView = () => {
      switch (apiStatus) {
        case apiStatusConstants.loading:
          return this.renderLoadingView()
        case apiStatusConstants.success:
          return this.renderSuccessView()
        case apiStatusConstants.empty:
          return this.renderEmptyView()
        case apiStatusConstants.noData:
          return this.renderNoDataView()
        case apiStatusConstants.failure:
          return this.renderFailureView()
        default:
          return null
      }
    }

    const repoClassName =
      apiStatus !== apiStatusConstants.success ? 'repo-except' : ''

    return (
      <CommonContext.Consumer>
        {value => {
          const {isHamburgerActive} = value

          return (
            <div className="repo-bg-cont">
              {apiStatus !== apiStatusConstants.loading && (
                <div className="repo-header">
                  <Header />
                </div>
              )}
              {isHamburgerActive === false && (
                <div className={`repo-cont ${repoClassName}`}>
                  {getActiveView()}
                </div>
              )}
            </div>
          )
        }}
      </CommonContext.Consumer>
    )
  }
}

export default Repositories
