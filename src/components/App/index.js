import * as ROUTES from '../../constants/routes'

import { Route, BrowserRouter as Router } from 'react-router-dom'

import AccountPage from '../Account'
import AdminPage from '../Admin'
import HomePage from '../Home'
import LandingPage from '../Landing'
import Navigation from '../Navigation'
import PasswordForgetPage from '../PasswordForget'
import React from 'react'
import SignInPage from '../SignIn'
import SignUpPage from '../SignUp'

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
)

export default App
