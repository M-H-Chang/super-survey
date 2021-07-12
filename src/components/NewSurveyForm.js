import React from "react"
import { useFirestore } from 'react-redux-firebase'
import { string, func } from "prop-types"
import ReusableForm from "./ReusableForm"

const NewSurveyForm = ({ onNewSurveyCreation }) => {
  const firestore = useFirestore()

  function addSurveyToFirestore(event) {
    event.preventDefault()
    onNewSurveyCreation()
    return firestore.collection(`surveys`).add(
      {
        names: event.target.names.value,
        question1: event.target.question1.value,
        question2: event.target.question2.value,
        question3: event.target.question3.value,
        timeOpen: firestore.FieldValue.serverTimestamp(),
      }
    )
  }

  return (
    <>
      <ReusableForm
        onSubmit={addSurveyToFirestore}
        buttonText='Create'
      />
    </>
  )
}

export default NewSurveyForm
