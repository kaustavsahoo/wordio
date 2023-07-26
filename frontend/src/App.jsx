import { useState } from 'react'
import { ToastContainer, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import categories from './data/categories.json'
import Category from './components/Category'
import Game from './components/Game';

function App() {
  console.log(categories);
  const [selected, setSelected] = useState("");

  const handleSelect = (name) => {
    setSelected(name);
  }

  const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }

  return (
    <div className="mx-auto p-5 md:max-w-2xl text-center md:text-left">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        transition={Slide}
        theme="light"
      />
      <h2 className="font-semibold text-6xl text-gray-800 mb-2">wordio</h2> {
        selected ? (
          <Game word={randomElement(categories[selected].words)} />
        ) : (
          <>
            <p className="text-gray-500">Choose a category:</p>
            <div className="grid md:grid-cols-2 text-gray-700">
              {Object.keys(categories).map((name) =>
                <Category key={name} name={name} data={categories[name]} onSelect={handleSelect} />
              )}
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;
