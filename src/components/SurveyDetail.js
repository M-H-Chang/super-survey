import React from "react"
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import Survey from "./Survey"

function SurveyDetail({ selectedSurveyId, viewEditor }) {
  useFirestoreConnect([
    { collection: `surveys` },
  ])

  const survey = useSelector(state => state.firestore.data.surveys[selectedSurveyId])

  return (
    <>
      {isLoaded(survey)
        ? <Survey
            onClick={() => viewEditor(selectedSurveyId)}
            title={survey.title}
            question1={survey.question1}
            question2={survey.question2}
            question3={survey.question3}
        />
        : <h3>Loading....</h3>
      }
    </>
  )
}

SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
}

export default SurveyDetail
