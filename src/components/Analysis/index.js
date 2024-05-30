import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CommitsPerQuarter from '../CommitsPerQuarter'
import PiechartComponent from '../PiechartComponent'
// import CommitHistory from '../CommitHistory'
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

class Analysis extends Component {
  state = {analysisDetails: {}, apiStatus: apiStatusConstants.success}

  componentDidMount() {
    this.getAnalysisDetails()
  }

  onSuccessFulResponse = analysisDetails => {
    const {publicRepos} = analysisDetails.user
    if (publicRepos > 0) {
      this.setState({analysisDetails, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.empty})
    }
  }

  onFailureResponse = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  getAnalysisDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const username = Cookies.get('username')

    if (username === undefined) {
      this.setState({apiStatus: apiStatusConstants.noData})
    } else {
      const apiKey = process.env.REACT_APP_GIT_KEY

      const url = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=${apiKey}`

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok === true) {
        this.onSuccessFulResponse(data)
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
    const {analysisDetails} = this.state
    const {
      quarterCommitCount,
      langRepoCount,
      langCommitCount,
      repoCommitCount,
    } = analysisDetails

    return (
      <div className="analysis-success-cont">
        <h1 className="analysis-h1">Analysis</h1>
        <CommitsPerQuarter quarterCommitCount={quarterCommitCount} />
        <div className="piechart-analysis-cont">
          <div className="commits-per-lang-cont">
            <h1 className="analysis-h1 analysis-h1-extra">
              Language Per Repos
            </h1>
            <PiechartComponent piechartData={langRepoCount} />
          </div>
          <div className="commits-per-lang-cont">
            <h1 className="analysis-h1 analysis-h1-extra">
              Language Per Commits
            </h1>
            <PiechartComponent piechartData={langCommitCount} />
          </div>
        </div>
        <div className="commits-per-repos-cont">
          <h1 className="analysis-h1 analysis-h1-extra">
            Commits Per Repo (Top 10)
          </h1>
          <PiechartComponent piechartData={repoCommitCount} isLastPie />
        </div>
      </div>
    )
  }

  renderEmptyView = () => (
    <div className="empty-view">
      <img
        className="home-img"
        src="https://res.cloudinary.com/dkk6a7svu/image/upload/v1713846282/savx8zla5j8zhawxwu8u.png"
        alt="no analysis"
      />
      <p className="home-h1 failure-para empty-p">No Analysis Found!</p>
    </div>
  )

  renderNoDataView = () => (
    <div className="no-data-view">
      <img
        className="home-img no-data-img"
        src="https://res.cloudinary.com/dkk6a7svu/image/upload/v1713866849/gl29oaabb5z4yxoadspg.png"
        alt="empty analysis"
      />
      <h1 className="home-h1 failure-para no-data-h1">No Data Found</h1>
      <p className="home-h1 failure-para no-data-p">
        GitHub Username is empty, please provide a valid username for analysis
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
        onClick={this.getAnalysisDetails}
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
                <div className="repo-header analysis-header">
                  <Header />
                </div>
              )}
              {isHamburgerActive === false && (
                <div className={`analysis-cont ${repoClassName}`}>
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

export default Analysis
