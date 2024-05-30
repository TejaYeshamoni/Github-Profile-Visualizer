// import React from 'react'

// import CalendarHeatmap from 'react-calendar-heatmap'

// import ReactTooltip from 'react-tooltip'

// import 'react-calendar-heatmap/dist/styles.css'

import './index.css'

const CommitHistory = props => {
  const {quarterCommitCount} = props
  const quarterCommit = {...quarterCommitCount}

  // const quarterCommit = {
  //   '2012-Q1': 0,
  //   '2012-Q2': 90,
  //   '2012-Q3': 2,
  //   '2012-Q4': 16,
  //   '2013-Q1': 43,
  //   '2013-Q2': 0,
  //   '2013-Q3': 1,
  //   '2013-Q4': 0,
  //   '2014-Q1': 0,
  //   '2014-Q2': 0,
  //   '2014-Q3': 0,
  //   '2014-Q4': 0,
  //   '2015-Q1': 0,
  //   '2015-Q2': 0,
  //   '2015-Q3': 0,
  //   '2015-Q4': 0,
  //   '2016-Q1': 0,
  //   '2016-Q2': 0,
  //   '2016-Q3': 0,
  //   '2016-Q4': 0,
  //   '2017-Q1': 0,
  //   '2017-Q2': 0,
  //   '2017-Q3': 0,
  //   '2017-Q4': 0,
  //   '2018-Q1': 0,
  //   '2018-Q2': 0,
  //   '2018-Q3': 0,
  //   '2018-Q4': 0,
  //   '2019-Q1': 0,
  //   '2019-Q2': 0,
  //   '2019-Q3': 0,
  //   '2019-Q4': 55,
  //   '2020-Q1': 440,
  //   '2020-Q2': 533,
  //   '2020-Q3': 498,
  //   '2020-Q4': 626,
  //   '2021-Q1': 369,
  //   '2021-Q2': 350,
  //   '2021-Q3': 595,
  //   '2021-Q4': 360,
  //   '2022-Q1': 149,
  //   '2022-Q2': 269,
  //   '2022-Q3': 303,
  //   '2022-Q4': 268,
  //   '2023-Q1': 212,
  //   '2023-Q2': 93,
  //   '2023-Q3': 56,
  //   '2023-Q4': 90,
  //   '2024-Q1': 141,
  //   '2024-Q2': 9,
  // }

  // Function to convert quarter string to date
  function quarterToDate(quarter) {
    const [year, quarterNumber] = quarter.split('-')
    const month = (parseInt(quarterNumber.slice(1)) - 1) * 3 + 1 // Convert quarter to month
    return new Date(`${year}-${month}-01`) // First day of the quarter
  }

  // Transform quarterCommitCount to the desired format
  //   const sampleDates = Object.entries(quarterCommit).map(([quarter, count]) => ({
  //     date: quarterToDate(quarter),
  //     count,
  //   }))

  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 232) // Past six months from today

  //   const getDiffColor = valueCount => {
  //     if (valueCount < 50) {
  //       return 0
  //     }
  //     if (valueCount < 150) {
  //       return 1
  //     }
  //     if (valueCount < 250) {
  //       return 2
  //     }
  //     if (valueCount < 350) {
  //       return 3
  //     }
  //     return 4
  //   }

  return (
    // <div className="heatmap-cont">
    //   <CalendarHeatmap
    //     className="heatmap"
    //     startDate={startDate}
    //     endDate={today}
    //     values={sampleDates}
    //     classForValue={value => {
    //       if (!value) {
    //         return 'color-empty'
    //       }
    //       return `color-gitlab-${getDiffColor(value.count)}`
    //     }}
    //     tooltipDataAttrs={value => ({
    //       'data-tip': `Commits: ${value.count || 0}`,
    //     })}
    //     showWeekdayLabels
    //     showMonthLabels
    //     gutterSize={4}
    //     showOutOfRangeDays
    //   />
    // </div>
    <></>
  )
}

export default CommitHistory
