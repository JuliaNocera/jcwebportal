import React, { Component } from 'react'

import { AddCategoryForm } from '../Forms'
import { withFirebase } from '../Firebase'

class CategoryRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: null,
      subCategories: [],
      newCategoryInput: ''
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
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  onAddEntry = e => {
    e.preventDefault()
    const { newCategoryInput } = this.state
    const { category } = this.props
    this.props.firebase.updateAtLocation({
      input: newCategoryInput,
      onSuccess: () => this.setState({ newCategoryInput: '' }),
      onError: error => this.setState({ error }),
      refLocation: category
    })
  }

  onSelectCategory = (category, e) => {
    console.log({ category })
    e.preventDefault()
  }

  render() {
    const { subCategories, newCategoryInput, selectedCategory } = this.state
    const { category } = this.props

    return (
      <div>
        <h1>{category}</h1>
        <div>
          select sub-categories:
          <CategoryList
            categories={subCategories}
            onSelectCategory={this.onSelectCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div>
          ... or add new category
          <AddCategoryForm
            newCategoryInput={newCategoryInput}
            onChange={this.onChange}
            onAddCategory={this.onAddEntry}
          />
        </div>
      </div>
    )
  }
}

const CategoryList = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className='CategoryList'>
      {categories &&
        categories.map(category => (
          <CategoryButton
            key={category}
            category={category}
            onClick={onSelectCategory}
            isSelected={selectedCategory === category}
          />
        ))}
    </div>
  )
}

const CategoryButton = ({ category, onClick, isSelected }) => {
  return (
    <div
      onClick={e => onClick(category, e)}
      className={isSelected ? 'CategoryButton selected' : 'CategoryButton '}
    >
      {category}
    </div>
  )
}

export default withFirebase(CategoryRenderer)
