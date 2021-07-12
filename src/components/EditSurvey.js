import React from "react"
import { func, string, shape } from 'prop-types'
import { useFirestore } from 'react-redux-firebase'
import ReusableForm from "./ReusableForm"

function SurveyEditor({ Survey, onEditSurvey }) {
  const firestore = useFirestore()

  const [newSurvey, setNewSurvey] = useState({
    title: ``,
    question1: ``,
    question2: ``,
    question3: ``,
  })

  function handleEditSurveyFormSubmission(event) {
    event.preventDefault()
    onEditSurvey()
    const propertiesToUpdate = {
      title,
      question1,
      question2,
      question3,
    }
    return firestore.update(
      { collection: `Surveys`, doc: Survey.id },
      propertiesToUpdate
    )
  }

  return (
    <>
      <ReusableForm
        formSubmissionHandler={handleEditSurveyFormSubmission}
      />
      <button onClick={handleClickSurvey}>Update Survey</button>
      <button onClick={handleClickSurvey}>Cancel</button>
    </>
  )
}

SurveyEditor.propTypes = {
  Survey: shape(ISurvey),
  onEditSurvey: func,
}

const ISurvey = {
  title: string,
  question1: string,
  question2: string,
  question3: string,
}

export default SurveyEditor
