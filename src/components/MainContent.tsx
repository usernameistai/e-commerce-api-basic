import { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { Bell, Menu, ShoppingCart, Tally3 } from 'lucide-react';
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
        className='xl:w-[55rem] mr-[8rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] 
        p-5 bg-inherit'
      >
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="relative mb-5 mt-5">

              <nav className='flex gap-5 justify-between w-[44vw]'>
                <div className="flex justify-start">
                  <h1 className="text-2xl font-bold ml-1 mb-3 flex font-Inter items-center">
                    <ShoppingCart className="mr-2 mt-0 text-indigo-300" size={30}/>
                    <span className="text-indigo-500">e</span> 
                    <span className="text-blue-200">-</span>
                    <span className="text-tcolor">T'ai</span> 
                    <span className="text-indigo-500 ml-1">Store </span>
                  </h1>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="ml-4 mr-36 -mt-1 px-4 py- rounded-full flex items-center 
                      bg-indigo-500 text-white shadow-lg overflow-hidden
                      hover:bg-indigo-100 hover:text-zinc-800"
                  >
                    <Tally3 className='mr-1'/>
                    {filter === 'all' 
                      ? 'Filter' 
                      : filter.charAt(0).toLowerCase() + filter.slice(1)
                    }
                  </button>
                </div>
                <div className='flex justify-end gap-2'>
                  <a href="#" className='relative mt-[0.6rem]'>
                    <Bell />
                    <span className='block size-2 bg-red-500 rounded-full absolute 
                    top-0 right-0'></span>
                  </a>
                  <ThemeSwitch />
                  <div 
                    className='flex items-center bg-secondary justify-center pl-1 pr-3 py-1 
                    rounded-full hover:text-zinc-500 lg:bg-transparent'>
                    <label 
                      htmlFor="toggle-sidebar" 
                      className='cursor-pointer block ml-2 lg:hidden'
                    >
                      <Menu />
                    </label>
                  </div>
                </div>
              </nav>
              
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

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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