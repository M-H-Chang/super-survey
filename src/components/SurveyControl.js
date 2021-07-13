import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withFirestore } from 'react-redux-firebase'
import SurveyList from './SurveyList'
import SurveyDetail from './SurveyDetail'
import SurveyEditor from './SurveyEditor'

const VIEWS = {
  SURVEY_LIST: `SURVEY_LIST`,
  SURVEY_DETAIL: `SURVEY_DETAIL`,
  SURVEY_EDITOR: `SURVEY_EDITOR`,
}

// componentDidMount() {
//   this.waitTimeUpdateTimer = setInterval(() =>
//     this.updateSurveyElapsedWaitTime(),
//     60000
//   );
// }

// componentWillUnmount(){
//   clearInterval(this.waitTimeUpdateTimer);
// }

// updateSurveyElapsedWaitTime = () => {
//   const { dispatch } = this.props;
//   Object.values(this.props.masterSurveyList).forEach(survey => {
//     const newFormattedWaitTime = survey.timeOpen.fromNow(true);
//     const action = a.updateTime(survey.id, newFormattedWaitTime);
//     dispatch(action);
//   });
// }

const SurveyControl = ({ formVisibleOnPage, masterSurveyList }) => {
  const [selectedSurveyId, setSelectedSurveyId] = useState(null)
  const [currentView, setCurrentView] = useState(VIEWS.SURVEY_LIST)

  console.log(`currentView`, currentView)
  console.log(`selectedSurveyId`, selectedSurveyId)

  const viewDetail = id => {
    setSelectedSurveyId(id)
    setCurrentView(VIEWS.SURVEY_DETAIL)
  }
  const viewEditor = (id = null) => {
    setSelectedSurveyId(id)
    setCurrentView(VIEWS.SURVEY_EDITOR)
  }
  const viewList = () => {
    setSelectedSurveyId()
    setCurrentView(VIEWS.SURVEY_LIST)
  }

  return (() => {
    switch (currentView) {
      case VIEWS.SURVEY_DETAIL: return (
        <SurveyDetail
          selectedSurveyId={selectedSurveyId}
          viewEditor={viewEditor}
        />
      )
      case VIEWS.SURVEY_LIST: return (
        <SurveyList
          viewDetail={viewDetail}
          viewEditor={viewEditor}
        />
      )
      case VIEWS.SURVEY_EDITOR: return (
        <SurveyEditor
          selectedSurveyId={selectedSurveyId}
          viewList={viewList}
          viewDetail={viewDetail}
        />
      )
      default: throw new Error(`Unexpected View`)
    }
  })()
}

SurveyControl.propTypes = {
  formVisibleOnPage: PropTypes.bool,
}

export default withFirestore(SurveyControl)
