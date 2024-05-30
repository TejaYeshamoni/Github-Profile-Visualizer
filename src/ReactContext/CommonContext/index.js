import {createContext} from 'react'

const CommonContext = createContext({
  isHamburgerActive: false,
  onClickHamburger: () => {},
  staredList: [],
  onClickStar: () => {},
})

export default CommonContext
