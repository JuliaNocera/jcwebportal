import React, { Component } from 'react'

import { withFirebase } from '../Firebase'

class TestData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      testDataInput: '',
      testDataFromFB: [],
      error: ''
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.testDataList().on('value', snapshot => {
      const testDataAsArray = Object.values(snapshot.val())
      console.log({ testDataAsArray })
      this.setState({ testDataFromFB: testDataAsArray })
    })
  }

  componentWillUnmount() {
    this.listener()
  }

  onSubmit = event => {
    const { testDataInput } = this.state

    var newPostKey = this.props.firebase.testDataList().push().key

    var updates = {}
    updates['/testData/' + newPostKey] = testDataInput

    this.props.firebase
      .ref()
      .update(updates)
      .catch(error => {
        console.log({ error })
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { error, testDataInput, testDataFromFB } = this.state
    console.log({ state: this.state })
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name='testDataInput'
            value={testDataInput}
            onChange={this.onChange}
            type='text'
            placeholder='test input save'
          />
          <button type='submit'>Save</button>
          {error && <div>{error}</div>}
        </form>
        {testDataFromFB && TestDataList(testDataFromFB)}
      </div>
    )
  }
}

const TestDataList = testDataList => {
  return testDataList.map(val => <div>{val}</div>)
}

export default withFirebase(TestData)
