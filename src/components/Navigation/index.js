import * as ROUTES from '../../constants/routes'

import { AuthUserContext } from '../Session'
import { Link } from 'react-router-dom'
import React from 'react'
import SignOutButton from '../SignOut'

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = () => (
  <div className='navigation--list'>
    <div>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </div>
    <div>
      <Link to={ROUTES.HOME}>Home</Link>
    </div>
    <div>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </div>
    <div>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </div>
    <div>
      <Link to={ROUTES.TEST_DATA}>Test Data</Link>
    </div>
    <div>
      <SignOutButton />
    </div>
  </div>
)

const NavigationNonAuth = () => (
  <ul>
    <div>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </div>
    <div>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </div>
  </ul>
)

export default Navigation
