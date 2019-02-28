import { AuthUserContext, withAuthorization } from '../Session'

import PasswordChangeForm from '../PasswordChange'
import { PasswordForgetForm } from '../PasswordForget'
import React from 'react'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
)
const condition = authUser => !!authUser

export default withAuthorization(condition)(AccountPage)
