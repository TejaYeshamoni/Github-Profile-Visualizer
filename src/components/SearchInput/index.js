import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const SearchInput = props => {
  const {
    username,
    onChangeSearchInput,
    apiStatus,
    errorMsg,
    getGithubProfile,
  } = props

  const changeUsername = event => {
    onChangeSearchInput(event.target.value)
  }

  const errorBorderClassName = apiStatus === 'FAILURE' ? 'error-border' : ''

  const searchGithubProfile = () => {
    getGithubProfile()
  }

  return (
    <div className="search-total-cont">
      <div className="search-cont">
        <input
          value={username}
          type="search"
          placeholder="Enter github username"
          className={`search-input ${errorBorderClassName}`}
          onChange={changeUsername}
        />
        <button
          data-testid="searchButton"
          type="button"
          className="search-btn"
          onClick={searchGithubProfile}
        >
          {1 === '1' && ''}

          <HiOutlineSearch />
        </button>
      </div>
      {apiStatus === 'FAILURE' && <p className="error-para">{errorMsg}</p>}
    </div>
  )
}

export default SearchInput
