import React from "react"
import { string, func } from "prop-types"

const KC_ENTER = 13
function Survey({
  onClick,
  title,
  question1,
  question2,
  question3,
  id,
}) {
  const handleKeyUp = e => {
    if (e.keyCode === KC_ENTER) onClick(id)
  }

  return (
    <>
      <div
        tabIndex={0}
        role='button'
        onClick={() => onClick(id)}
        onKeyUp={handleKeyUp}
      >
        <h2>{title}</h2>
        <p>{question1}</p>
        <p>{question2}</p>
        <p>{question3}</p>
      </div>
    </>
  )
}

const ISurvey = {
  title: string,
  question1: string,
  question2: string,
  question3: string,
}

Survey.propTypes = {
  title: string,
  question1: string,
  question2: string,
  question3: string,
  id: string,
  onClick: func,
}

export default Survey
