import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import SurveyList from './SurveyList'
import SurveyDetail from './SurveyDetail'
import SurveyEditor from './SurveyEditor'

const SurveyControl = () => (
  <Router>
    <Switch>
      <Route exact path='/surveys/new'>
        <SurveyEditor />
      </Route>
      <Route exact path='/surveys/:id/edit'>
        <SurveyEditor />
      </Route>
      <Route exact path='/surveys/:id'>
        <SurveyDetail />
      </Route>
      <Route exact path='/surveys'>
        <SurveyList />
      </Route>
    </Switch>
  </Router>
)

export default SurveyControl
