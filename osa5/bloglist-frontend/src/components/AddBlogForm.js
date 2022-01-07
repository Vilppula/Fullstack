import React, { useState } from 'react'

const AddBlogForm = ({ formSubmitter }) => {
  const [titleField, setTitleField] = useState('')
  const [authorField, setAuthorField] = useState('')
  const [urlField, setUrlField] = useState('')


  const authorFieldHandler = async (event) => {
    event.preventDefault()
    setAuthorField(event.target.value)
  }

  const titleFieldHandler = async (event) => {
    event.preventDefault()
    setTitleField(event.target.value)
  }

  const urlFieldHandler = async (event) => {
    event.preventDefault()
    setUrlField(event.target.value)
  }


  const createBlogHandler = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: titleField,
      author: authorField,
      url: urlField
    }
    setTitleField('')
    setAuthorField('')
    setUrlField('')
    formSubmitter(newBlog)
  }
  return(
    <form id='form' onSubmit= {createBlogHandler}>
      <div>title:
        <input type="text"
          value={titleField}
          id="title"
          onChange={titleFieldHandler}
        />
      </div>
      <div>author:
        <input type="text"
          value={authorField}
          id="author"
          onChange={authorFieldHandler}
        />

      </div>
      <div>url:
        <input type="text"
          value={urlField}
          id="url"
          onChange={urlFieldHandler}/>

      </div>
      <button type="submit"><b>create</b></button>
    </form>
  )
}

export default AddBlogForm