import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import CommonContext from '../../ReactContext/CommonContext'
import './index.css'

const navLinks = [
  {id: 'HOME', displayText: 'Home', path: '/'},
  {id: 'REPOSITORIES', displayText: 'Repositories', path: '/repositories'},
  {id: 'ANALYSIS', displayText: 'Analysis', path: '/analysis'},
]

class Header extends Component {
  render() {
    return (
      <CommonContext.Consumer>
        {value => {
          const {isHamburgerActive, onClickHamburger} = value

          const hamStatusClassName = isHamburgerActive ? '' : 'ham-status'

          const getActiveTab = () => {
            const {match} = this.props
            const {path} = match

            const activePath = () => {
              switch (path) {
                case '/':
                  return 'HOME'
                case '/repositories':
                  return 'REPOSITORIES'
                case `/repositories/:repoName`:
                  return 'REPOSITORIES'
                case '/analysis':
                  return 'ANALYSIS'
                default:
                  return null
              }
            }

            return activePath()
          }

          return (
            <nav className="navbar">
              <div className="ham-cont">
                <Link to="/" className="route-link">
                  <h1 className="nav-h1">Github Profile Visualizer</h1>
                </Link>
                <button
                  className="hamburger-btn"
                  type="button"
                  onClick={onClickHamburger}
                >
                  {1 === '1' && ''}
                  <GiHamburgerMenu />
                </button>
              </div>
              <ul className={`nav-link-cont ${hamStatusClassName}`}>
                {navLinks.map(eachItem => (
                  <li key={eachItem.id}>
                    <button
                      onClick={onClickHamburger}
                      className="header-btn header-btn-sm"
                      type="button"
                    >
                      <Link
                        to={eachItem.path}
                        className={`route-link ${
                          getActiveTab() === eachItem.id
                            ? 'active-nav-link'
                            : ''
                        }`}
                      >
                        {eachItem.displayText}
                      </Link>
                    </button>
                    <button className="header-btn header-btn-md" type="button">
                      <Link
                        to={eachItem.path}
                        className={`route-link ${
                          getActiveTab() === eachItem.id
                            ? 'active-nav-link'
                            : ''
                        }`}
                      >
                        {eachItem.displayText}
                      </Link>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )
        }}
      </CommonContext.Consumer>
    )
  }
}

export default withRouter(Header)
