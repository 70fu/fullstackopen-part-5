import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, showDelete, handleBlogUpdate, handleBlogRemove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);
  const handleLike = async (e) => {
    console.log('like button pressed for blog', blog);
    const updated = await blogService.update({ ...blog,likes:blog.likes+1 });
    handleBlogUpdate(updated);
  }

  const handleRemove = async (e) => {
    console.log('Remove button pressed for blog',blog);
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      await blogService.remove(blog);
      handleBlogRemove(blog);
    }
  }

  if(showDetails){
    return (<div className='blog'>
      {blog.title} {blog.author}<button onClick={toggleDetails}>hide</button> <br/>
      {blog.url} <br/>
      likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
      {blog.user.name}
      {showDelete && <><br/><button onClick={handleRemove}>remove</button></>}
    </div>
    )
  }
  else{
    return (
      <div className='blog'>
        {blog.title} {blog.author} <button onClick={toggleDetails}>view</button>
      </div>
    );
  }
}

export default Blog