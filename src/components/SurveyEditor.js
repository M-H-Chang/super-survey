import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, useHistory, Link } from "react-router-dom"
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'

function SurveyEditor() {
  const firestore = useFirestore()
  const history = useHistory()
  const { id: selectedSurveyId } = useParams()

  const [selectedSurvey, setSelectedSurvey] = useState({
    title: ``,
    question1: ``,
    question2: ``,
    question3: ``,
  })

  useFirestoreConnect([{ collection: `surveys` }])

  const survey = useSelector(
    state => state.firestore.data.surveys[selectedSurveyId]
  )

  useEffect(() => {
    if (survey) setSelectedSurvey(survey)
  }, [survey])

  function handleChange(e) {
    console.log(e)

    const { value, name } = e.target
    const updatedSurvey = { ...selectedSurvey }
    updatedSurvey[name] = value
    setSelectedSurvey(updatedSurvey)
  }

  const handleSubmit = e => {
    console.log(e)

    e.preventDefault()
    if (selectedSurveyId) updateSurvey()
    else addNewSurveyToFirestore()
  }

  function addNewSurveyToFirestore() {
    history.push(`/surveys`)
    return firestore.collection(`surveys`).add(selectedSurvey)
  }

  function updateSurvey() {
    history.push(`/surveys`)
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
      <Link to={`/surveys?selected=${selectedSurveyId}`}>
        <button type='button' onClick={() => { }}>Cancel</button>
      </Link>
      <button type='submit'>Done</button>
    </form>
  )
}

export default SurveyEditor
