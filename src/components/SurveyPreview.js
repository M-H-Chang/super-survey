import React from "react"
import { string } from "prop-types"
import { Link } from "react-router-dom"

function Survey({
  title,
  question1,
  question2,
  question3,
  id,
}) {
  return (
    <>
      <Link to={`/surveys/${id}`}>
        <h2>{title}</h2>
        <p>{question1}</p>
        <p>{question2}</p>
        <p>{question3}</p>
      </Link>
    </>
  )
}

// const ISurvey = {
//   title: string,
//   question1: string,
//   question2: string,
//   question3: string,
// }

Survey.propTypes = {
  title: string,
  question1: string,
  question2: string,
  question3: string,
  id: string,
}

export default Survey
