import React from "react"
import { string, func } from "prop-types"

function Survey({
  title,
  question1,
  question2,
  question3,
  id,
}) {
  return (
    <>
      <div onClick={() => props.whenSurveyClicked(id)}>
        <h2>{title}</h2>
        <p>{question1}</p>
        <p>{question2}</p>
        <p>{question3}</p>
      </div>
    </>
  )
}

Survey.propTypes = {
  title: string,
  question1: string,
  question2: string,
  question3: string,
  id: string,
  whenSurveyClicked: func,
}

export default Survey
