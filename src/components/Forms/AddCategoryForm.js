import React from 'react'

export const AddCategoryForm = ({
  onChange,
  onAddCategory,
  newCategoryInput
}) => {
  return (
    <form onSubmit={onAddCategory}>
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
