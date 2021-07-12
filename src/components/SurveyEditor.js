import React, { useState } from "react"
import { func, string, shape } from 'prop-types'
import { useFirestore } from 'react-redux-firebase'

function SurveyEditor({ survey, onEditSurvey }) {
  const firestore = useFirestore()

  const [newSurvey, setNewSurvey] = useState(
    survey || {
      title: ``,
      question1: ``,
      question2: ``,
      question3: ``,
    }
  )

  function handleChange(e) {
    const { value, id } = e.target
    const updatedState = { ...newSurvey }
    updatedState[id] = value
    setNewSurvey(updatedState)
  }

  function updateSurvey() {
    onEditSurvey()
    return firestore.update(
      { collection: `Surveys`, doc: Survey.id },
      newSurvey
    )
  }

  return (
    <form>
      <input
        id='title'
        onChange={handleChange}
        type='text'
        name='title'
        placeholder='Survey Title'
        defaultValue={survey.title}
      />
      <input
        id='question1'
        onChange={handleChange}
        type='text'
        name='question1'
        placeholder='Survey Question 1.'
        defaultValue={survey.question1}
      />
      <input
        id='question2'
        onChange={handleChange}
        type='text'
        name='question2'
        placeholder='Survey Question 2.'
        defaultValue={survey.question2}
      />
      <input
        id='question3'
        onChange={handleChange}
        type='text'
        name='question3'
        placeholder='Survey Question 3.'
        defaultValue={survey.question3}
      />
      <button onClick={handleClickSurvey}>Update Survey</button>
      <button onClick={handleClickSurvey}>Cancel</button>
    </form>
  )
}

const ISurvey = {
  title: string,
  question1: string,
  question2: string,
  question3: string,
}

SurveyEditor.propTypes = {
  Survey: shape(ISurvey),
  onEditSurvey: func,
}

export default SurveyEditor
