import React from "react"
import { func, string, shape } from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams, Link, useHistory } from "react-router-dom"
import {
  useFirestore,
  useFirestoreConnect,
  isLoaded,
} from 'react-redux-firebase'

function SurveyDetail() {
  const history = useHistory()

  const firestore = useFirestore()

  const { id: selectedSurveyId } = useParams()

  useFirestoreConnect([
    { collection: `surveys` },
  ])

  const deleteSurvey = () => {
    history.push(`/surveys`)
    return firestore.delete({ collection: `surveys`, doc: selectedSurveyId })
  }

  const survey = useSelector(
    state => state.firestore.data.surveys[selectedSurveyId]
  )

  const { title, question1, question2, question3 } = survey

  return (
    <>
      {isLoaded(survey)
        ? (
          <>
            <Link to={`/surveys/${selectedSurveyId}/edit`}>
              <h2>{title}</h2>
              <p>{question1}</p>
              <p>{question2}</p>
              <p>{question3}</p>
            </Link>
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
