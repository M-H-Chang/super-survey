import React, { useState } from "react"
import { func, string } from 'prop-types'
import { useFirestore } from 'react-redux-firebase'

function SurveyEditor({ selectedSurveyId, viewList }) {
  const firestore = useFirestore()

  const [selectedSurvey, setSelectedSurvey] = useState({
    title: ``,
    question1: ``,
    question2: ``,
    question3: ``,
  })

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
  }

  function handleChange(e) {
    const { value, name } = e.target
    const updatedSurvey = { ...selectedSurvey }
    updatedSurvey[name] = value
    setSelectedSurvey(updatedSurvey)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (selectedSurveyId) updateSurvey()
    else addNewSurveyToFirestore()
  }
  // or
  // const handleSubmit
  // = selectedSurveyId ? e => updateSurvey() : e => addNewSurveyToFirestore()
  //

  function addNewSurveyToFirestore() {
    viewList()
    return firestore.collection(`surveys`).add(selectedSurvey)
  }

  function updateSurvey() {
    viewList()
    return firestore.update(
      {
        collection: `surveys`,
        doc: selectedSurveyId,
      },
      selectedSurvey
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* onSubmit={handleSubmit} === onSubmit={e => handleSubmit(e)} */}
      <input
        onChange={handleChange}
        type='text'
        name='title'
        placeholder='Survey Title'
        defaultValue={selectedSurvey.title}
      />
      <input
        onChange={handleChange}
        type='text'
        name='question1'
        placeholder='Survey Question 1.'
        defaultValue={selectedSurvey.question1}
      />
      <input
        onChange={handleChange}
        type='text'
        name='question2'
        placeholder='Survey Question 2.'
        defaultValue={selectedSurvey.question2}
      />
      <input
        onChange={handleChange}
        type='text'
        name='question3'
        placeholder='Survey Question 3.'
        defaultValue={selectedSurvey.question3}
      />
      <button type='button' onClick={viewList}>Cancel</button>
      <button type='submit'>Done</button>
    </form>
  )
}

// const ISurvey = {
//   title: string,
//   question1: string,
//   question2: string,
//   question3: string,
// }

SurveyEditor.propTypes = {
  selectedSurveyId: string,
  viewList: func,
  viewDetail: func,
}

export default SurveyEditor
