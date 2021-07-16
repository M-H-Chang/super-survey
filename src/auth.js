import React, { useContext, createContext, useState } from "react"
import firebase from 'firebase/app'

// context
const authContext = createContext()

// hook for all consumers of context
const useAuth = () => useContext(authContext)

// hook for single provider of context
function useProvideAuth() {
  const [user, setUser] = useState(null)

  const signUp = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log(`Successfully signed up!`)
        setUser(firebase.auth().currentUser)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  const logIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(`Successfully logged in!`)
        setUser(firebase.auth().currentUser)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  const logOut = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log(`Successfully signed out!`)
        setUser(null)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  return {
    user,
    signUp,
    logIn,
    logOut,
  }
}

// component (provider  of context)
function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export { useAuth, AuthProvider }
