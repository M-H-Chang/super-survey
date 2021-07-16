import firebase from 'firebase/app'

function AuthPage() {
  function SignUp(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log(`Successfully signed up!`)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={SignUp}>
        <input
          type='text'
          name='email'
          placeholder='email'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
        />
        <button type='submit'>Sign Up</button>
      </form>

      <h1>Sign In</h1>
      <form onSubmit={logIn}>
        <input
          type='text'
          name='email'
          placeholder='Email'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
        />
        <button type='submit'>Log In</button>
      </form>
    </>
  )
}
