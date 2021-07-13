import React from "react"
import { func, string, shape } from 'prop-types'
import { useSelector } from 'react-redux'
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
} from 'react-redux-firebase'
import Survey from "./Survey"

function SurveyDetail({ selectedSurveyId, viewEditor, viewList }) {
  const firestore = useFirestore()

  useFirestoreConnect([
    { collection: `surveys` },
  ])

  const deleteSurvey = () => {
    viewList()
    return firestore.delete({ collection: `surveys`, doc: selectedSurveyId })
  }

  const survey = useSelector(
    state => state.firestore.data.surveys[selectedSurveyId]
  )

  return (
    <>
      {isLoaded(survey)
        ? (
          <>
            <Survey
              onClick={() => viewEditor(selectedSurveyId)}
              title={survey.title}
              question1={survey.question1}
              question2={survey.question2}
              question3={survey.question3}
            />
            <button type='button' onClick={() => deleteSurvey()}>Delete</button>
          </>
        )
        : <h3>Loading....</h3>
      }

    </>
  )
}

SurveyDetail.propTypes = {
  selectedSurveyId: string,
  viewList: func,
}

export default SurveyDetail
