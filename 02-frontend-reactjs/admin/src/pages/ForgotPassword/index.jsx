import React from 'react'
import CustomInput from '../../components/CustomInput'

function ForgotPassword() {
  return (
    <>
    <div className="py-5" style={{ background: "#fff333", minHeight: "100vh" }}>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center">Forgot Password</h3>
          <p className="text-center">Please enter your email address to get reset password mail</p>
        
          <form action="">
            <CustomInput type="text" label="Email Address" id="email" />
           
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{ background: "#fff333" }}
              type="submit"
            >
              Send Link
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword