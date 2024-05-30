import './index.css'

const Members = props => {
  const {contributors} = props

  const membersCount = contributors.length

  const getMembers = () => {
    const hiddenMembers = membersCount > 5 ? membersCount - 5 : 0

    const sliceIndex = membersCount <= 5 ? membersCount : 5
    const slicedMembersList = contributors.slice(0, sliceIndex)

    return (
      <>
        {slicedMembersList.map(eachItem => (
          <li key={eachItem.id}>
            <img
              className="members-img"
              src={eachItem.avatarUrl}
              alt="contributor profile"
            />
          </li>
        ))}
        {hiddenMembers > 0 && (
          <li className="members-count-cont" key="6">
            +{hiddenMembers}
          </li>
        )}
      </>
    )
  }

  return <>{getMembers()}</>
}

export default Members
