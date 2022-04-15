import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<CreateBlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  userEvent.type(titleInput, 'test title...' )
  userEvent.type(authorInput, 'test author...' )
  userEvent.type(urlInput, 'test url...' )
  userEvent.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title...' )
  expect(createBlog.mock.calls[0][0].author).toBe('test author...' )
  expect(createBlog.mock.calls[0][0].url).toBe('test url...' )
})