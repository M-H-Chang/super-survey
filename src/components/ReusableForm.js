import React from "react"
import { func, string } from "prop-types"

function ReusableForm({ onSubmit, buttonText }) {
  return (
    <>
      <form onSubmit>
        <input
          type='text'
          name='title'
          placeholder='Survey Title'
        />
        <input
          type='text'
          name='question1'
          placeholder='Survey Question 1.'
        />
        <input
          type='text'
          name='question2'
          placeholder='Survey Question 2.'
        />
        <button type='submit'>{buttonText}</button>
      </form>
    </>
  )
}

ReusableForm.propTypes = {
  onSubmit: func,
  buttonText: string,
}
export default ReusableForm
