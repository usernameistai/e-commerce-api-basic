import { MessageCircle, ThumbsUp } from 'lucide-react';

const PopularBlogs = () => {
  const blogs = [
    {
      title: "This is not just a blog title and I used to write Sherlock Holmes",
      author: "Sir Arthur Conan Doyle",
      likes: 1111111111,
      comments: 2222222,
    },
    {
      title: "Here be Dragons!!",
      author: "Oi",
      likes: 7777777,
      comments: 55555,
    },
    {
      title: "What is going on in my life",
      author: "T'ai",
      likes: 55555,
      comments: 333,
    },
  ];
  return (
    <>
      <div className='bg-gray-100 p-5 w-[23rem] mt-4 border ml-5 bg-inherit rounded'>
        <h2 className="text-xl font-bold mb-5 text-zinc-800">Popular Blogs</h2>
        <ul>
          {blogs.map((blog, index) => (
            <li key={index} className='mb-4 border-b pb-2 ml-2'>
              <div className="flex justify-between items-center">
                <span className="font-semibold mb-2 text-tmuted">{blog.title}</span>
              </div>
              <span className="text-gray-600">Published by {blog.author}</span>
              <div className="flex items-center mt-2">
                <MessageCircle size={16} className='text-yellow-500'/>
                <span className="text-gray-500 mr-5 ml-1"> {blog.likes}</span>
                <ThumbsUp size={16} className='text-green-500'/>
                <span className="text-gray-500 mr-2 ml-2">{blog.comments}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PopularBlogs;