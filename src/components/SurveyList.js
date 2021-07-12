import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { func } from "prop-types"
import Survey from "./Survey"

const SurveyList = ({ handleClickSurvey }) => {
  useFirestoreConnect([
    { collection: `surveys` },
  ])

  const surveys = useSelector(state => state.firestore.ordered.surveys)

  return (
    <>
      {isLoaded(surveys)
        ? surveys.map(survey => (
          <Survey
            onClick={handleClickSurvey}
            title={survey.title}
            question1={survey.question1}
            question2={survey.question2}
            question3={survey.question3}
            id={survey.id}
            key={survey.id}
          />
        ))
        : <h3>Loading....</h3>
      }
      <button onClick={handleClickSurvey}>Add Survey</button>
    </>
  )
}

SurveyList.propTypes = {
  handleClickSurvey: func,
}

export default SurveyList
