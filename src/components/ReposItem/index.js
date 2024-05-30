import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {FaStar, FaRegStar} from 'react-icons/fa'
import {RiGitBranchLine} from 'react-icons/ri'
import CommonContext from '../../ReactContext/CommonContext'

import './index.css'

const langColors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5']

const getColorClassName = () => {
  const randNum = Math.floor(Math.random() * 5)
  return langColors[randNum]
}

const ReposItem = props => (
  <CommonContext.Consumer>
    {value => {
      const {reposDetails} = props

      const {
        name,
        description,
        languages,
        stargazersCount,
        forksCount,
      } = reposDetails

      const formatedLanguages = languages.map(eachItem => ({
        id: uuidv4(),
        name: eachItem.name,
        value: eachItem.value,
      }))

      const {staredList} = value

      const isStared = staredList.filter(eachRepoName => eachRepoName === name)

      return (
        <Link
          to={`/repositories/${name}`}
          className="route-link repos-item-link"
        >
          <li className="repos-item-cont">
            <h1 className="repos-item-h1">{name}</h1>
            <p className="repos-item-p">{description}</p>
            <div className="languages-cont">
              {formatedLanguages.map(eachItem => (
                <p
                  className={`languages ${getColorClassName()}`}
                  key={eachItem.id}
                >
                  {eachItem.name}
                </p>
              ))}
            </div>
            <div className="repos-item-icon-cont">
              <div className="repos-icon-cont">
                {isStared.length > 0 ? (
                  <FaStar className="star-icon" />
                ) : (
                  <FaRegStar className="star-icon" />
                )}
                <p className="repos-icon-p">{stargazersCount}</p>
              </div>
              <div className="repos-icon-cont">
                <RiGitBranchLine className="git-icon" />

                <p className="repos-icon-p">{forksCount}</p>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </CommonContext.Consumer>
)

export default ReposItem
