import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import SurveyList from './SurveyList'
import SurveyDetail from './SurveyDetail'
import SurveyEditor from './SurveyEditor'

const SurveyControl = () => (
  <Router>
    <Switch>
      <Route path='/surveys/:id'>
        <SurveyDetail />
      </Route>
      <Route path='/surveys'>
        <SurveyList />
      </Route>
      <Route path='/surveys/:id/edit'>
        <SurveyEditor />
      </Route>
    </Switch>
  </Router>
)

export default SurveyControl
