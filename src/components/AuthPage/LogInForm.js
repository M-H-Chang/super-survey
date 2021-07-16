import { useState } from 'react'
import { useAuth } from '../../auth'

function LogInForm() {
  const { logIn } = useAuth()
  const [userData, setUserData] = useState({
    email: ``,
    password: ``,
  })

  const handleSubmit = e => {
    e.preventDefault()
    const { email, password } = userData
    logIn(email, password)
  }

  const handleChange = e => {
    const { value, name } = e.target
    const updatedData = { ...userData }
    updatedData[name] = value
    setUserData(updatedData)
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type='text'
          name='email'
          placeholder='Email'
        />
        <input
          onChange={handleChange}
          type='password'
          name='password'
          placeholder='Password'
        />
        <button type='submit'>Log In</button>
      </form>
    </>

  )
}

export default LogInForm
