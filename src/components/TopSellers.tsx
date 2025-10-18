import { useEffect, useState } from 'react';

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
};

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://randomuser.me/api/?results=5`);
        const data = await res.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
      } catch (error) {
        console.error(`Error fetching authors: ${error}`);
      }
    };
    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors(prevAuthor => prevAuthor.map(
      (author, i) => i === index ? {...author, isFollowing: !author.isFollowing } : author)
    );
  };

  return (
    <>
      <div className='bg-gray-100 mx-5 p-2 mt-[5rem] border w-[23rem] rounded bg-inherit'>
        <h2 className="text-xl font-bold mb-4 py-2 px-4 text-zinc-800">Top Sellers</h2>

        <ul className='mb-4'>
          {authors.map((author, index) => (
            <li key={index} className='flex items-center justify-between m-2 ml-4'>
              <section className="flex justify-center items-center">
                <img 
                  src={author.image} 
                    alt={author.name} 
                      className='w-[25%] h-[25%] justify-center rounded-full'
                />
                <span className="ml-4 text-tmuted">{author.name}</span>
              </section>

              <button
                onClick={() => handleFollowClick(index)}
                  className={`py-1 px-3 rounded font-semibold z-10
                  ${author.isFollowing ? 'bg-red-500 text-white' : 'bg-indigo-500 text-white'}`}
              >
                {author.isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TopSellers;