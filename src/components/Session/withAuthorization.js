import * as ROUTES from '../../constants/routes'

import AuthUserContext from './context'
import React from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { withRouter } from 'react-router-dom'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.SIGN_IN)
        }
      })
    }

    componentWillUnmount() {
      this.listener()
    }
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization)
}

export default withAuthorization
