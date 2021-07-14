/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { Link, useLocation } from "react-router-dom"
import queryString from 'query-string'
import SurveyPreview from "./SurveyPreview"

const KC_ENTER = 13

const SurveyList = () => {
  const { search } = useLocation()
  const selectedIdFromSearch = queryString.parse(search).selected

  useFirestoreConnect([
    { collection: `surveys` },
  ])

  const [selectedSurveyId, setSelectedSurveyId] = useState(selectedIdFromSearch)

  const surveys = useSelector(state => state.firestore.ordered.surveys)

  console.log(queryString.parse(search))

  const myFavColor = `red`

  return (
    <main
      css={css`
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 10px;
        align-items: center;
        /* > a ~ a {
          margin-top: 10px;
        } */
        > div {
          transition-property: all;
          padding: 10px;
          background: #eee;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          width: 100%;
          max-width: 500px;
          h2 {
            font-size: 30px;
          }
          &.selected {
            max-height: 2000px;
          }
          &.unselected { // > div.unselected
            max-height: 60px;
            :link,
            :visited, 
            :active {
              color: black;
            }
            :hover, 
            :focus {
              color: salmon;
              transform: scale(1.02);
              transition-property: height;
              transition: 0.2s;
              transition-timing-function: ease-out;
            }
          }
        }
        h3 {
          color: ${myFavColor};
        }
      `}
    >
      {isLoaded(surveys)
        ? surveys.map(survey => {
          const { title, question1, question2, question3, id } = survey

          return (

            <div
              className={selectedSurveyId === id ? `selected` : `unselected`}
              key={id}
              tabIndex={0}
              role='button'
              onClick={() => setSelectedSurveyId(id)}
              onKeyUp={
                e => { if (e.keyCode === KC_ENTER) setSelectedSurveyId(id) }
              }
            >
              <h2>{title}</h2>
              {
                selectedSurveyId === id
                && <>
                  <p>{question1}</p>
                  <p>{question2}</p>
                  <p>{question3}</p>
                  <Link to={`/surveys/${selectedSurveyId}/edit`}>
                    edit
                  </Link>
                </>
              }
            </div>

          )
        })
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
