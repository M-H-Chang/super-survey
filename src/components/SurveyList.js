/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { Link } from "react-router-dom"
import SurveyPreview from "./SurveyPreview"

const SurveyList = ({ viewDetail, viewEditor }) => {
  useFirestoreConnect([
    { collection: `surveys` },
  ])

  const surveys = useSelector(state => state.firestore.ordered.surveys)

  const myFavColor = `red`

  return (
    <main
      css={css`
        div {
          background: #eee;
          cursor: pointer;
          :hover, 
          :focus {
            color: salmon;
          }
        }
        h3 {
          color: ${myFavColor};
        }
      `}
    >
      {isLoaded(surveys)
        ? surveys.map(survey => (
          <SurveyPreview
            onClick={() => viewDetail(survey.id)}
            title={survey.title}
            question1={survey.question1}
            question2={survey.question2}
            question3={survey.question3}
            id={survey.id}
            key={survey.id}
          />
        ))
        : (
          <h3>
            Loading....
          </h3>
        )
      }
      <Link to='/surveys/new'>New</Link>
    </main>
  )
}

export default SurveyList
