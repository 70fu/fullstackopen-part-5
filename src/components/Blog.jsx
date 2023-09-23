import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);
  const handleLike = (e) => {
    console.log('like button pressed for blog', blog);
  }

  if(showDetails){
    return (<div className='blog'>
      {blog.title} {blog.author}<button onClick={toggleDetails}>hide</button> <br/>
      {blog.url} <br/>
      likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
      {blog.user.name}
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