import { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';
import ThemeSwitch from './ThemeSwitch';

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=
    ${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    };
    axios
      .get(url)
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(error => {
        console.error("Error fetching data", error);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts.filter(product => product.category === selectedCategory);
    };

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    };

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    };

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    switch(filter) {
      case "expensive":
        return filteredProducts.sort((x, y) => y.price - x.price);
      case "cheap":
        return filteredProducts.sort((x, y) => x.price - y.price);
      case "popular":
        return filteredProducts.sort((x, y) => y.rating - x.rating);
      default: 
        return filteredProducts;
    };
  };

  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    };
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    };
    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
    };
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    };

    return buttons;
  };

  return (
    <>
      <section 
        className='xl:w-[55rem] mr-[10rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] 
        p-5 bg-inherit'
      >
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="relative mb-5 mt-5">
              <div className='flex justify-between'>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="mr-8 px-4 py-2 rounded-full flex items-center 
                    bg-indigo-500 text-white shadow-lg overflow-hidden
                    hover:bg-indigo-100 hover:text-zinc-800 hover:shadow-none"
                >
                  <Tally3 className='mr-2'/>

                  {filter === 'all' 
                    ? 'Filter' 
                    : filter.charAt(0).toLowerCase() + filter.slice(1)}
                </button>
                <ThemeSwitch />
              </div>
              
              {dropdownOpen && (
                <div className="absolute bg-primary border-gray-300 rounded-lg mt-2 w-full sm:w-40">
                  <button 
                    onClick={() => setFilter('cheap')} 
                      className='block px-4 py-2 w-full text-left hover:bg-gray-200'
                  >
                    Cheap
                  </button>
                  <button 
                    onClick={() => setFilter('expensive')} 
                      className='block px-4 py-2 w-full text-left hover:bg-gray-200'
                  >
                    Expensive
                  </button>
                  <button 
                    onClick={() => setFilter('popular')} 
                      className='block px-4 py-2 w-full text-left hover:bg-gray-200'
                  >
                    Popular
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {/* Bookcard */}
            {filteredProducts.map(product => (
              <BookCard 
                key={product.id}
                  id={product.id}
                    title={product.title}
                      image={product.thumbnail}
                        price={product.price}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
            {/* Previous button */}
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                  className='px-4 py-2 mx-2 rounded-full text-white 
                  bg-indigo-500 shadow-lg font-semibold hover:bg-indigo-100
                   hover:text-zinc-800 hover:shadow-none'
            >
              Previous
            </button>
            {/* 1, 2, 3, 4, 5 ... */}
            <div className="flex flex-wrap justify-center">
              {getPaginationButtons().map(page => (
                <button 
                  key={page} 
                    onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 mx-1 rounded-full 
                      ${page === currentPage ? 'bg-indigo-500 text-white' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>
            {/* Next button */}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                  className='px-4 py-2 mx-2 rounded-full text-white 
                  bg-indigo-500 shadow-lg font-semibold hover:bg-indigo-100
                   hover:text-zinc-800 hover:shadow-none'
            >
              Next
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default MainContent;