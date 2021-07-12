import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { func } from "prop-types"
import Survey from "./Survey"

const SurveyList = ({ handleClickSurvey }) => {
  useFirestoreConnect([
    { collection: `surveys` },
  ])

  const surveys = useSelector(state => state.firestore.ordered.surveys)

  if (isLoaded(surveys)) {
    return (
      <>
        {surveys.map(survey => (
          <Survey
            onClick={handleClickSurvey}
            title={survey.title}
            question1={survey.question1}
            question2={survey.question2}
            question3={survey.question3}
            id={survey.id}
            key={survey.id}
          />
        ))}
      </>
    )
  }
  return (
    <>
      <h3>Loading....</h3>
    </>
  )
}

SurveyList.propTypes = {
  handleClickSurvey: func,
}

export default SurveyList
