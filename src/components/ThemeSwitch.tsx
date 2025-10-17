import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';

const ThemeSwitch = () => {
  const storageKey = 'theme';

  const storedTheme = localStorage.getItem(storageKey);
  const initialDark = storedTheme ? JSON.parse(storedTheme) : false;
  // const [ dark, setDark ] = useState(JSON.parse(localStorage.getItem(storageKey)));
  const [dark, setDark] = useState<boolean>(initialDark);

  // useEffect(() => {
  //   if (dark) { // data theme form index.css
  //     document.firstElementChild.setAttribute("data-theme", "dark");
  //     localStorage.setItem(storageKey, JSON.stringify(true));
  //     return;
  //   } else {
  //     document.firstElementChild.setAttribute("data-theme", "light");
  //     localStorage.setItem(storageKey, JSON.stringify(false));
  //     return;
  //   }
  // }, [dark]); // run each time value of dark changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem(storageKey, JSON.stringify(dark));
  }, [dark]);

  return (
    <>
      <label 
        className='flex items-center gap-3 cursor-pointer bg-secondary rounded-full
        py-2 px-3'
      >
        <input 
          type="checkbox" 
            checked={dark} 
              onChange={event => setDark(event.target.checked)}
                className='opacity-0 w-0 h-0 invisible absolute top-[-999px]
                peer'
        />
        <Sun 
          className='rounded-full p-1 peer-[:not(:checked)]:bg-primary 
          peer-[:not(:checked)]:text-white'
        />
        <Moon 
          className='rounded-full p-1 peer-checked:bg-primary
           peer-checked:text-white'
        />
      </label>
    </>
  );
};

export default ThemeSwitch;