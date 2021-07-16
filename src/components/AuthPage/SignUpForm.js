import { useState } from 'react'
import { useAuth } from '../../auth'

function SignUpForm() {
  const { signUp } = useAuth()
  const [userData, setUserData] = useState({
    email: ``,
    password: ``,
  })

  const handleSubmit = e => {
    e.preventDefault()
    const { email, password } = userData
    signUp(email, password)
  }

  const handleChange = e => {
    const { value, name } = e.target
    const updatedData = { ...userData }
    updatedData[name] = value
    setUserData(updatedData)
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type='text'
          name='email'
          placeholder='email'
        />
        <input
          onChange={handleChange}
          type='password'
          name='password'
          placeholder='Password'
        />
        <button type='submit'>Sign Up</button>
      </form>
    </>
  )
}

export default SignUpForm
