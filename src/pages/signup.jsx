import React from 'react'
import Header from '../components/Header'
import SigninSignupComponent from '../components/SignupSignin'

const signup = () => {
  return (
    <div>
     <Header />
     <div className='wrapper'>
      <SigninSignupComponent />
     </div>
    </div>
  )
}

export default signup
