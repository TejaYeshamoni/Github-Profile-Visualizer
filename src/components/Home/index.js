import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import Header from '../Header'
import SearchInput from '../SearchInput'
import CommonContext from '../../ReactContext/CommonContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    profile: {},
    apiStatus: apiStatusConstants.initial,
    username: '',
    errorMsg: '',
  }

  componentDidMount() {
    const awtToken = Cookies.get('awt_token')

    if (awtToken !== undefined) {
      const username = awtToken.split('/')[1]
      this.setState({username}, this.getGithubProfile)
    }
  }

  onSuccessFulResponse = profile => {
    // generating authentication token for already searched user
    const {username} = this.state
    Cookies.set('awt_token', `profile/${username}`)

    this.setState({profile, apiStatus: apiStatusConstants.success})
  }

  onFailureResponse = errorMsg => {
    // remove authentication for failure response
    Cookies.remove('awt_token')

    this.setState({apiStatus: apiStatusConstants.failure, errorMsg})
  }

  getGithubProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {username} = this.state
    Cookies.set('username', username)

    const apiKey = ''

    const url = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const formatedProfile = {
        avatarUrl: data.avatar_url,
        bio: data.bio,
        company: data.company,
        followers: data.followers,
        following: data.following,
        id: data.id,
        location: data.location,
        login: data.login,
        name: data.name,
        organizationsUrl: data.organizations_url,
        publicRepos: data.public_repos,
      }

      this.onSuccessFulResponse(formatedProfile)
    } else {
      this.onFailureResponse(data.error_msg)
    }
  }

  onChangeSearchInput = username => this.setState({username})

  renderInitialView = () => {
    const {username} = this.state

    return (
      <>
        <div className="initial-search-cont">
          <SearchInput
            username={username}
            onChangeSearchInput={this.onChangeSearchInput}
            getGithubProfile={this.getGithubProfile}
          />
        </div>
        <h1 className="home-h1">Github Profile Visualizer</h1>
        <img
          className="home-img initial-home-img"
          src="https://res.cloudinary.com/dkk6a7svu/image/upload/v1713374156/kjmz5yxi90xeqhdnjbuy.png"
          alt="github profile visualizer home page"
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {profile, username} = this.state
    const {
      avatarUrl,
      bio,
      company,
      followers,
      following,
      //   id,
      location,
      login,
      name,
      organizationsUrl,
      publicRepos,
    } = profile

    return (
      <>
        <div className="profile-search-cont">
          <SearchInput
            username={username}
            onChangeSearchInput={this.onChangeSearchInput}
            getGithubProfile={this.getGithubProfile}
          />
        </div>
        <img className="avatar-img" src={avatarUrl} alt={name} />
        <h1 className="name">{name}</h1>
        <p className="username">{login}</p>
        <div className="bio-cont">
          <p className="bio">{bio}</p>
        </div>
        <div className="followers-cont">
          <div>
            <p className="para-1">{followers}</p>
            <p className="para-1 para-2">FOLLOWERS</p>
          </div>

          <div className="vr-line">
            <p className="para-1">{following}</p>
            <p className="para-1 para-2">FOLLOWING</p>
          </div>

          <div>
            <p className="para-1">{publicRepos}</p>
            <p className="para-1 para-2">PUBLIC REPOS</p>
          </div>
        </div>
        <div className="company-cont">
          <div>
            <p className="para-1">Company</p>
            <p className="para-3">
              <RiBuildingLine className="home-icon" />
              {company}
            </p>
          </div>
          <div className="location-cont">
            <p className="para-1">Location</p>
            <p className="para-3">
              <IoLocationOutline className="home-icon" />
              {location}
            </p>
          </div>
          <div>
            <p className="para-1">Company Url</p>
            <p className="para-3">
              <IoMdLink className="home-icon" />
              {organizationsUrl}
            </p>
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => {
    const {username, apiStatus, errorMsg} = this.state

    return (
      <>
        <div className="initial-search-cont">
          <SearchInput
            username={username}
            onChangeSearchInput={this.onChangeSearchInput}
            getGithubProfile={this.getGithubProfile}
            apiStatus={apiStatus}
            errorMsg={errorMsg}
          />
        </div>
        <h1 className="home-h1">Github Profile Visualizer</h1>
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
          onClick={this.getGithubProfile}
        >
          Try again
        </button>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    const getActiveView = () => {
      switch (apiStatus) {
        case apiStatusConstants.initial:
          return this.renderInitialView()
        case apiStatusConstants.loading:
          return this.renderLoadingView()
        case apiStatusConstants.success:
          return this.renderSuccessView()
        case apiStatusConstants.failure:
          return this.renderFailureView()
        default:
          return null
      }
    }

    const profileViewClassName =
      apiStatus === apiStatusConstants.success ? 'profile-view-cont' : ''

    return (
      <CommonContext.Consumer>
        {value => {
          const {isHamburgerActive} = value
          return (
            <div className="home-bg-cont">
              {apiStatus === apiStatusConstants.success && (
                <div className="header-sm">
                  <Header />
                </div>
              )}
              {apiStatus !== apiStatusConstants.loading && (
                <div className="header-md">
                  <Header />
                </div>
              )}
              {isHamburgerActive === false && (
                <div className={`home-cont ${profileViewClassName}`}>
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

export default Home
