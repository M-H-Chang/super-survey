import React from "react"
import ReactDOM from "react-dom"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import "./main.scss"
import { AuthProvider } from './auth'
import App from "./components/App"
import rootReducer from './reducers/index'
import firebase from "./firebase"
import 'firebase/auth'

// import reportWebVitals from "./reportWebVitals"

const store = createStore(rootReducer)

const rrfProps = {
  firebase,
  config: {
    userProfile: `users`,
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById(`root`)
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
