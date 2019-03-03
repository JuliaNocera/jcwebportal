import React, { Component } from 'react'

import CategoryRenderer from '../CategoryRenderer'
import { withFirebase } from '../Firebase'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      newCategoryInput: '',
      selectedCategory: null
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase
      .ref('categories')
      .on('value', snapshot => {
        if (snapshot.val()) {
          const categories = Object.values(snapshot.val())
          this.setState({ categories: categories })
        }
      })
  }

  componentWillUnmount() {
    this.listener()
  }

  onUpdateSuccess = () => {
    this.setState({ newCategoryInput: '' })
  }

  onUpdateError = error => {
    this.setState({ error })
  }

  createNewCategory = e => {
    const { newCategoryInput } = this.state

    this.props.firebase.updateAtLocation({
      input: newCategoryInput,
      onSuccess: this.onUpdateSuccess,
      onError: this.onUpdateError,
      refLocation: 'categories'
    })

    e.preventDefault()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    e.preventDefault()
  }

  onSelectCategory = category => {
    this.setState({ selectedCategory: category })
  }

  render() {
    const { categories, newCategoryInput, selectedCategory } = this.state
    console.log({ selectedCategory })
    return (
      <React.Fragment>
        <h1>Landing</h1>
        <h3>Select category</h3>
        <CategoryList
          categories={categories}
          onSelectCategory={this.onSelectCategory}
          selectedCategory={selectedCategory}
        />
        <div>Or Create a new Category</div>
        <NewCategoryForm
          onChange={this.onChange}
          newCategoryInput={newCategoryInput}
          onSubmit={this.createNewCategory}
        />

        <hr />
        <hr />

        {selectedCategory && (
          <CategoryRenderer
            category={selectedCategory}
            categoryPath={`categories/${selectedCategory}`}
          />
        )}
      </React.Fragment>
    )
  }
}

const NewCategoryForm = ({ onChange, onSubmit, newCategoryInput }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={newCategoryInput}
        onChange={onChange}
        type='text'
        name={'newCategoryInput'}
        placeholder='category name'
      />
      <button type='submit'>Submit</button>
    </form>
  )
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
      onClick={() => onClick(category)}
      className={isSelected ? 'CategoryButton selected' : 'CategoryButton '}
    >
      {category}
    </div>
  )
}

export default withFirebase(Landing)
