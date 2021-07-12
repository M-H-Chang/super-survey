import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
// import formVisibleReducer from './form-visible-reducer'
// import ticketListReducer from './ticket-list-reducer'

const rootReducer = combineReducers({
  // formVisibleOnPage: formVisibleReducer,
  // masterTicketList: ticketListReducer,
  firestore: firestoreReducer,
})

export default rootReducer
