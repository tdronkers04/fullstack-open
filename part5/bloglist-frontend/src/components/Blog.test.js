import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'test123',
  author: 'john smith',
  url: 'http://www.test.com',
  likes: 1
}

test('hidden div renders blog title', () => {
  const { container } = render(<Blog blog={blog}/>)
  const hiddenDiv = container.querySelector('.hiddenState')
  expect(hiddenDiv).toHaveTextContent('test123')
})

test('visible div renders title, author, url and likes', () => {
  const { container } = render(<Blog blog={blog}/>)
  const visDiv = container.querySelector('.visibleState')
  expect(visDiv).toHaveTextContent('test123')
  expect(visDiv).toHaveTextContent('john smith')
  expect(visDiv).toHaveTextContent('http://www.test.com')
  expect(visDiv).toHaveTextContent('1')
})

test('clicking the like button twuice calls event handler twice', () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} putLike={mockHandler}/>)
  const button = screen.getByText('like')

  userEvent.click(button) // 1
  userEvent.click(button) // 2

  expect(mockHandler.mock.calls).toHaveLength(2)
})
