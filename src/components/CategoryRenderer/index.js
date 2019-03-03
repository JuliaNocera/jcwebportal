import React, { Component } from 'react'

import { withFirebase } from '../Firebase'

class CategoryRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subCategories: [],
      newEntryInput: ''
    }
  }

  componentDidMount() {
    const { category } = this.props
    this.listener = this.props.firebase.ref(category).on('value', snapshot => {
      if (snapshot.val()) {
        const subCategories = Object.values(snapshot.val())
        this.setState({ subCategories })
      }
    })
  }

  componentWillUnmount() {
    this.listener()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    e.preventDefault()
  }

  onAddEntry = e => {
    const { newEntryInput } = this.state
    const { category } = this.props
    console.log({ newEntryInput })
    this.props.firebase.updateAtLocation({
      input: newEntryInput,
      onSuccess: () => this.setState({ newEntryInput: '' }),
      onError: error => this.setState({ error }),
      refLocation: category
    })
    e.preventDefault()
  }

  render() {
    const { subCategories, newEntryInput } = this.state
    const { category } = this.props

    return (
      <div>
        <h1>{category}</h1>
        <div>
          select sub-categories:
          <div>{subCategories}</div>
        </div>
        <div>
          ... or add new category
          <AddEntry
            newEntryInput={newEntryInput}
            onChange={this.onChange}
            onAddEntry={this.onAddEntry}
          />
        </div>
      </div>
    )
  }
}

const AddEntry = ({ newEntryInput, onChange, onAddEntry }) => {
  return (
    <form onSubmit={onAddEntry}>
      <input
        value={newEntryInput}
        onChange={onChange}
        type='text'
        name={'newEntryInput'}
        placeholder='entry'
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default withFirebase(CategoryRenderer)
