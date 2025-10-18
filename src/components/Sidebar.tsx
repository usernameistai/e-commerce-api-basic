import { useEffect, useState, type ChangeEvent } from "react";
import { useFilter } from "./FilterContext";
import {  Atom, Brain, Car, ForkKnife, HandHelping, Radiation, Settings, ShoppingCart, TreesIcon } from "lucide-react";
import profile from '../assets/profile.jpg';

interface Product {
  category: string;
};
interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    // keyword, 
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]); // annotate with string of array
  const [keywords] = useState<string[]>([
    "apple", "watch", "Fashion", "trend", "shoes", "shirt"
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await res.json(); // get json data from response
        // console.log(data); new Set returns only unique values
        const uniqueCategories = Array.from(
          new Set(data.products.map(product => product.category))
        );
        // console.log(uniqueCategory)
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    }
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <>
      <div className="hidden sm:block w-[27.5%] p-5 h-[105vh] bg-gray-50 mr-10 font-sans bg-inherit shadow-lg">
        <h1 className="text-2xl font-bold mb-3 flex flex-1 font-Inter">
          <ShoppingCart className="mr-1 mt-0 text-indigo-300" size={30}/>
          <span className="text-indigo-500">e</span> 
          <span className="text-blue-200">-</span>
          <span className="text-tcolor">Commerce</span> 
          <span className="text-indigo-500 ml-1">Store </span>
          
        </h1>

        <section>
          <input 
            type="text" 
              className="border-2 rounded px-2 py-2 w-full md:mb-1 sm:mb-0 bg-inherit" 
                placeholder="Search Product"
                  value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
          />

          <div className="flex justify-center mt-1 items-center gap-2">
            <input 
              type="text"
                className="border-2 rounded px-5 py-2 mb-3 w-full bg-inherit"
                  placeholder="Min"
                    value={minPrice ?? ""}
                      onChange={handleMinPriceChange}
            />
            <input 
              type="text"
                className="border-2 rounded px-5 py-2 mb-3 w-full bg-inherit"
                  placeholder="Max"
                    value={maxPrice ?? ""}
                      onChange={handleMaxPriceChange}
            />
          </div>

          {/* Categories Section */}
          <div className="mb-3 ml-2">
            <h2 className="text-xl font-semibold mb-3 text-zinc-800">Categories</h2>
          </div>

          <section className="mb-5 ml-3">
            {categories.map((category, index) => (
              <label key={index} className="block mb-2 text-indigo-500 font-semibold">
                <input 
                  type="radio" 
                    name="category" 
                      value={category}
                        onChange={() => handleRadioChangeCategories(category)}
                          className="mr-2 w-[16px] h-[16px]"
                            checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))}
          </section>

          {/* Keywords Section */}
          <div className="mb-2 ml-2">
            <h2 className="text-xl font-semibold mb-2 text-zinc-800">Keywords</h2>
            <div className="ml-1">
              {keywords.map((keyword, index) => (
                <button 
                  key={index}
                    onClick={() => handleKeywordClick(keyword)}
                      className="block mb-1 px-4 py-2 w-full text-left border 
                      rounded hover:bg-gray-200 shadow-inner hover:shadow-lg
                      text-zinc-700 font-semibold"
                >
                  {keyword.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleResetFilters}
              className="w-full mb-2 py-2 bg-indigo-500 font-semibold
               hover:text-indigo-500 hover:bg-indigo-100 text-white 
               rounded-lg shadow-lg hover:shadow-none mt-2"
          >
            Reset Filters
          </button>

          <div className='my-2 border-t border-b'>
            <a 
              href='https://portfolioawesome-db.netlify.app/'
                target="_blank"
                  className='flex items-center gap-2 my-2 py-2 px-4 transition-all 
                  text-zinc-700 font-semibold rounded-md hover:text-zinc-900
                  hover:bg-zinc-100'
            >
              <Settings/>
              <h3 className='text-lg'>Settings</h3>
            </a>
            <a 
              href='https://helpme-car.herokuapp.com/'
                target="_blank"
                  className='flex items-center gap-2 my-2 py-2 px-4 transition-all 
                  text-zinc-700 font-semibold rounded-md hover:text-zinc-900
                  hover:bg-zinc-100'
            > 
              <HandHelping className="text-primary"/>
              <Car className="text-primary"/>
              <h3 className='text-lg'>HelpMe-Car</h3>
            </a>
            <a 
              href='https://peakyblogger-d362176b187f.herokuapp.com/'
                target="_blank"
                  className='flex items-center gap-2 my-2 py-2 px-4 transition-all 
                  text-zinc-700 font-semibold rounded-md hover:text-zinc-900
                  hover:bg-zinc-100'
            > 
              <TreesIcon className="text-emerald-600"/>
              <ForkKnife className="text-emerald-600"/>
              <h3 className='text-lg'>Peaky Blogger</h3>
            </a>
          </div>

          <div className='flex gap-2 bg-yellow-100 p-2 justify-between rounded bg-inherit'>
            <div className="flex flex-row gap-2">
              <div className='size-8 overflow-hidden rounded-full'>
                <img src={profile} alt='Jedi' />
              </div>
              <div className="text-tmuted">
                <h4 className='text-sm'>David `T'ai` Battye</h4>
                <p className='text-xs'> ICT Manager</p>
              </div>
            </div>
            <div className='flex flex-row text-indigo-500'>
              <Atom /><Brain /><Radiation />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Sidebar;