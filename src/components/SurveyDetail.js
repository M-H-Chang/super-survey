import React from "react"
import PropTypes from 'prop-types'
import { useFirestore } from 'react-redux-firebase'

// function SurveyDetail(props) {
//   const { survey, onClickingDelete } = props
function SurveyDetail({ selectedSurveyId }) {
  const firestore = useFirestore()

  if (selectedSurveyId) {
    firestore.get({ collection: `surveys`, doc: selectedSurveyId })
      .then(survey => {
        const firestoreSurvey = {
          title: survey.get(`title`),
          question1: survey.get(`question1`),
          question2: survey.get(`question2`),
          question3: survey.get(`question3`),
          id: survey.id,
        }
        setSelectedSurvey(firestoreSurvey)
      })
  } else {
    return (
      <>
        <h1>Survey Detail</h1>
        <h3>{survey.location} - {survey.names}</h3>
        <p><em>{survey.issue}</em></p>
        <button onClick={props.onClickingEdit}>Edit survey</button>
        <button onClick={() => onClickingDelete(survey.id)}>Close survey</button>

        <hr />
      </>
    )
  }
}

SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
}

export default SurveyDetail
