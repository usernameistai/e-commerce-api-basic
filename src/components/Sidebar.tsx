import { useEffect, useState, type ChangeEvent } from "react";
import { useFilter } from "./FilterContext";
import {  Atom, Brain, Car, ForkKnife, HandHelping, Radiation, Settings, ShoppingCart, TreesIcon, X } from "lucide-react";
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
      <input 
        type='checkbox' 
          id='toggle-sidebar' 
            className='opacity-0 invisible w-0 h-0 absolute top-[-999px] peer'
      />{/* The toggle-sidebar hee can be activated by input htmlFor='toggle-sidebar on another component */}
      <aside 
        className="hidden sidebar sm:block w-[30%] p-5 h-[105vh] bg-gray-50 mr-10 
        font-sans bg-inherit shadow-lg peer-checked:left-0"
      >
        <h1 className="text-2xl font-bold mb-3 flex flex-1 font-Inter">
          <ShoppingCart className="mr-1 mt-0 text-indigo-300" size={30}/>
          <span className="text-indigo-500">e</span> 
          <span className="text-blue-200">-</span>
          <span className="text-tcolor">T'ai</span> 
          <span className="text-indigo-500 ml-1">Store </span>
          <div className='flex items-center justify-between'>
            <label 
              htmlFor='toggle-sidebar' 
                className='size-8 ml-2 flex items-center justify-center rounded-full
                bg-secondary hover:bg-secondary/50 lg:hidden'
            >
              <X />
            </label>
          </div>
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
          <div className="mb-2 ml-2">
            <h2 className="text-xl font-semibold text-tcolor">Categories</h2>
          </div>

          <section className="mb-1 ml-3 border-b">
            {categories.map((category, index) => (
              <label key={index} className="block mb-2 text-indigo-500 rounded-xl font-semibold hover:font-bold">
                <input 
                  type="radio" 
                    name="category" 
                      value={category}
                        onChange={() => handleRadioChangeCategories(category)}
                          className="mx-3 w-[16px] h-[16px] rounded hover:underline"
                            checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))}
          </section>

          {/* Keywords Section */}
          <div className="mb-2 ml-2">
            <h2 className="text-xl font-semibold mb-2 text-tcolor">Keywords</h2>
            <div className="ml-1">
              {keywords.map((keyword, index) => (
                <button 
                  key={index}
                    onClick={() => handleKeywordClick(keyword)}
                      className="block mb-1 px-4 py-2 w-full font-semibold text-left border 
                      border-zinc-500/10 text-zinc-700 rounded shadow-inner 
                      hover:bg-gray-200/60 focus:shadow-none hover:shadow-lg 
                      hover:border-gray-200/60"
                >
                  {keyword.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleResetFilters}
              className="w-full my-1 py-2 bg-indigo-500 font-semibold
              text-white rounded-lg shadow-lg hover:text-indigo-500 
              hover:bg-indigo-100 focus:shadow-none"
          >
            Reset Filters
          </button>

          <div className='my-2 border-t border-b'>
            <a 
              href='https://portfolioawesome-db.netlify.app/'
                target="_blank"
                  className='flex items-center gap-2 my-2 py-2 px-4 transition-all 
                  text-zinc-700 font-semibold rounded-md hover:text-zinc-900
                  hover:bg-zinc-200/60 hover:shadow-lg'
            >
              <Settings/>
              <h3 className='text-lg'>Settings</h3>
            </a>
            <a 
              href='https://helpme-car.herokuapp.com/'
                target="_blank"
                  className='flex items-center gap-2 my-2 py-2 px-4 transition-all 
                  text-zinc-700 font-semibold rounded-md hover:text-zinc-900
                  hover:bg-zinc-200/60 hover:shadow-lg'
            > 
              <HandHelping className="text-primary"/>
              <h3 className='text-lg'>HelpMe-Car</h3>
              <Car className="text-primary"/>
            </a>
            <a 
              href='https://peakyblogger-d362176b187f.herokuapp.com/'
                target="_blank"
                  className='flex items-center gap-2 my-2 py-2 px-4 transition-all 
                  text-zinc-700 font-semibold rounded-md hover:text-zinc-900
                  hover:bg-zinc-200/60 hover:shadow-lg'
            > 
              <TreesIcon className="text-emerald-600"/>
              <h3 className='text-lg'>Peaky Blogger</h3>
              <ForkKnife className="text-emerald-600"/>
            </a>
          </div>

          <a 
            href='https://portfolioawesome-db.netlify.app/'
                target="_blank"
                  className='flex gap-2 bg-yellow-100 p-2 justify-between rounded-lg 
                  cursor-help shadow-lg hover:shadow-xl'
          >
            <div className="flex flex-row gap-2">
              <div className='size-8 overflow-hidden rounded-full'>
                <img src={profile} alt='Jedi' />
              </div>
              <div className="text-tmuted font-semibold">
                <h4 className='text-sm'>David `T'ai` Battye</h4>
                <p className='text-xs'> ICT Manager</p>
              </div>
            </div>
            <div className='flex flex-row text-indigo-500'>
              <Atom />
              <Brain />
              <Radiation />
            </div>
          </a>
        </section>
      </aside>
    </>
  );
};

export default Sidebar;