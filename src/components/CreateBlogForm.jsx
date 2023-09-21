import { useState } from 'react';
import blogService from '../services/blogs';

const FormText = ({ name, value, setValue }) => {
  return (
    <div>
      {name}
      <input
        type="text"
        value={value}
        name="name"
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  )
}

const CreateBlogForm = ({ addBlog, pushSuccess, pushError }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogCreate = async (target) => {
    target.preventDefault();

    //TODO don't even try sending a post request, if one of the fields is empty and inform the user
    if(!title || !author || !url){
      pushError('please input title, author and url');
      return;
    }

    const blog = {
      title: title,
      author: author,
      url: url
    }

    const created = await blogService.create(blog);
    addBlog(created);

    pushSuccess(`added a new blog "${title}" by "${author}"`)

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <form onSubmit={handleBlogCreate}>
      <FormText name="title:" value={title} setValue={setTitle} />
      <FormText name="author:" value={author} setValue={setAuthor} />
      <FormText name="url:" value={url} setValue={setUrl} />
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm;