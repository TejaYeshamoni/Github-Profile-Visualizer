import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import {FaStar, FaRegStar} from 'react-icons/fa'
import {RiGitBranchLine} from 'react-icons/ri'
import Header from '../Header'
import Members from '../Members'
import CommonContext from '../../ReactContext/CommonContext'
import './index.css'

const langColors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5']

const getColorClassName = () => {
  const randNum = Math.floor(Math.random() * 5)
  return langColors[randNum]
}

// Function to generate random colors
const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RepositoryItemDetails extends Component {
  state = {reposDetails: {}, apiStatus: apiStatusConstants.initial, colors: []}

  componentDidMount() {
    this.getRepositoryDetails()
  }

  onSuccessFulResponse = (reposDetails, languages) => {
    const colors = languages.map(() => generateRandomColor())

    this.setState({reposDetails, apiStatus: apiStatusConstants.success, colors})
  }

  onFailureResponse = () => {
    this.setState({apiStatus: apiStatusConstants.failure})
  }

  getRepositoryDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {repoName} = params

    const username = Cookies.get('username')

    const apiKey = process.env.REACT_APP_GIT_KEY

    const url = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const contributors = data.contributors.map(eachItem => ({
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        contributions: eachItem.contributions,
      }))
      const formatedLanguages = data.lanuages.map(eachItem => ({
        id: uuidv4(),
        name: eachItem.name,
        value: eachItem.value,
        color: getColorClassName(),
      }))

      const formatedReposDetails = {
        id: data.id,
        name: data.name,
        description: data.description,
        languages: formatedLanguages,
        stargazersCount: data.stargazers_count,
        forksCount: data.forks_count,
        contributors,
        watchersCount: data.watchers_count,
        issuesCount: data.open_issues_count,
      }

      this.onSuccessFulResponse(formatedReposDetails, formatedLanguages)
    } else {
      this.onFailureResponse()
    }
  }

  renderSuccessView = () => {
    const {reposDetails} = this.state
    const {
      //   id,
      name,
      description,
      languages,
      stargazersCount,
      forksCount,
      watchersCount,
      contributors,
      issuesCount,
    } = reposDetails

    const CustomLegend = ({payload}) => (
      <ul className="legend-ul-cont">
        {payload.map(entry => (
          <li
            className="legend-li-cont"
            key={uuidv4()}
            style={{color: '#cbd5e1'}}
          >
            <span
              className="legend-icon"
              style={{
                backgroundColor: entry.color,
                width: '16px',
                height: '16px',
                display: 'inline-block',
                marginRight: '15px',
              }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    )

    const {colors} = this.state

    return (
      <CommonContext.Consumer>
        {value => {
          const {onClickStar, staredList} = value

          const onClickStarIcon = () => {
            onClickStar(name)
          }

          const isStared = staredList.filter(
            eachRepoName => eachRepoName === name,
          )

          return (
            <div className="repos-item-cont repos-details-card">
              <h1 className="repos-item-h1 repos-item-main-h1">{name}</h1>
              <p className="repos-item-p">{description}</p>
              <div className="languages-cont">
                {languages.map(eachItem => (
                  <p
                    className={`languages ${eachItem.color}`}
                    key={eachItem.id}
                  >
                    {eachItem.name}
                  </p>
                ))}
              </div>
              <div className="repos-item-icon-cont">
                <div className="repos-icon-cont">
                  <button
                    type="button"
                    className="star-btn"
                    onClick={onClickStarIcon}
                  >
                    {isStared.length > 0 ? (
                      <FaStar className="star-icon" />
                    ) : (
                      <FaRegStar className="star-icon" />
                    )}
                  </button>
                  <p className="repos-icon-p">{stargazersCount}</p>
                </div>
                <div className="repos-icon-cont">
                  <RiGitBranchLine className="git-icon" />

                  <p className="repos-icon-p">{forksCount}</p>
                </div>
              </div>
              <div className="commit-total-cont">
                <div className="commit-cont">
                  <p className="commit-p">Watchers Counts</p>
                  <p className="commit-value">
                    {watchersCount < 10 ? `0${watchersCount}` : watchersCount}
                  </p>
                </div>
                <div className="commit-cont">
                  <p className="commit-p">Issues Counts</p>
                  <p className="commit-value">
                    {issuesCount < 10 ? `0${issuesCount}` : issuesCount}
                  </p>
                </div>
              </div>
              <h1 className="repos-details-h1">Contributors :</h1>
              <p className="repos-details-p">{contributors.length} Members</p>
              <ul className="members-ul-cont">
                <Members contributors={contributors} />
              </ul>
              <h1 className="repos-details-h1">Languages :</h1>

              <ResponsiveContainer
                className="responsive-cont"
                width="100%"
                height="100%"
              >
                <PieChart className="piechart">
                  <Pie
                    cx="40%"
                    cy="40%"
                    data={languages}
                    startAngle={0}
                    endAngle={360}
                    innerRadius="50%"
                    outerRadius="80%"
                    stroke="#ffffff"
                    strokeWidth={1}
                    dataKey="value"
                  >
                    {languages.map((entry, index) => (
                      <Cell
                        key={entry.id}
                        name={entry.name}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>

                  <Legend
                    iconType="square"
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    content={<CustomLegend />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )
        }}
      </CommonContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
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
        onClick={this.getRepositoryDetails}
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
            <div className="repos-details-bg-cont">
              {apiStatus !== apiStatusConstants.loading && (
                <div className="repos-details-header">
                  <Header />
                </div>
              )}

              {isHamburgerActive === false && (
                <div className={`repos-details-cont ${repoClassName}`}>
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

export default RepositoryItemDetails
