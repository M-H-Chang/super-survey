import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withFirestore } from 'react-redux-firebase'
import SurveyList from './SurveyList'
import SurveyDetail from './SurveyDetail'
import SurveyEditor from './SurveyEditor'
import * as a from "../actions"

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
  const [selectedSurvey, setSelectedSurvey] = useState(null)
  const [currentView, setCurrentView] = useState(VIEWS.SURVEY_LIST)

  const viewDetail = id => {
    setSelectedSurvey(id)
    setCurrentView(VIEWS.SURVEY_DETAIL)
  }
  const viewEditor = id => {
    setSelectedSurvey(id)
    setCurrentView(VIEWS.SURVEY_EDITOR)
  }
  const viewList = () => {
    setSelectedSurvey()
    setCurrentView(VIEWS.SURVEY_LIST)
  }

  // handleAddingNewSurveyToList = () => {
  //   const { dispatch } = this.props
  //   const action = a.toggleForm()
  //   dispatch(action)
  // }

  // handleEditingSurveyInList = () => {
  //   this.setState({
  //     editing: false,
  //     selectedSurvey: null,
  //   })
  // }

  // handleChangingSelectedSurvey = id => {
  //   this.props.firestore.get({ collection: `surveys`, doc: id }).then(survey => {
  //     const firestoreSurvey = {
  //       names: survey.get(`names`),
  //       location: survey.get(`location`),
  //       issue: survey.get(`issue`),
  //       id: survey.id,
  //     }
  //     this.setState({ selectedSurvey: firestoreSurvey })
  //   })
  // }

  // handleDeletingSurvey = id => {
  //   this.props.firestore.delete({ collection: `surveys`, doc: id })
  //   this.setState({ selectedSurvey: null })
  // }

  return (() => {
    switch (currentView) {
      case VIEWS.SURVEY_DETAIL: return (
        <SurveyDetail
          survey={selectedSurvey}
          onClickingDelete={undefined}
          onClickingEdit={undefined}
        />
      )
      case VIEWS.SURVEY_LIST: return (
        <SurveyList
          surveyList={masterSurveyList}
          onSurveySelection={undefined}
        />
      )
      case VIEWS.SURVEY_EDITOR: return (
        <SurveyEditor
          survey={selectedSurvey}
          viewList={viewList}
          viewDetail={viewDetail}
          onEditSurvey={this.handleEditingSurveyInList}
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
