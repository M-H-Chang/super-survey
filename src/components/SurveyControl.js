import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
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

const SurveyControl = () => {
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

  return (
    <Router>
      <Switch>
        <Route path='/surveys/:id'>
          <SurveyDetail
            viewEditor={viewEditor}
          />
        </Route>
        <Route path='/surveys'>
          <SurveyList
            viewDetail={viewDetail}
            viewEditor={viewEditor}
          />
        </Route>
        <Route path='/surveys/:id/edit'>
          <SurveyEditor
            viewList={viewList}
            viewDetail={viewDetail}
          />
        </Route>
      </Switch>
    </Router>
  )
}

SurveyControl.propTypes = {
  formVisibleOnPage: PropTypes.bool,
}

export default SurveyControl
