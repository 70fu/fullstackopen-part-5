import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container;
  let handleBlogUpdateMock;
  let handleBlogRemoveMock;
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user:{
      username:'simon',
      name:'nomis',
      id:'1234567890'
    }
  };

  beforeEach(() => {
    handleBlogUpdateMock=jest.fn();
    handleBlogRemoveMock=jest.fn();
    container = render(<Blog blog={blog} showDelete={true} handleBlogRemove={handleBlogRemoveMock} handleBlogUpdate={handleBlogUpdateMock} />).container;
  });

  test('renders title and author only in hidden mode', () => {
    const blogDiv = container.querySelector('.blog');
    expect(blogDiv).toHaveTextContent(`${blog.title} ${blog.author}`);
    expect(blogDiv).not.toHaveTextContent(blog.url);
    expect(blogDiv).not.toHaveTextContent(blog.user.name);
    expect(blogDiv).not.toHaveTextContent(`likes ${blog.likes}`);
  })
})