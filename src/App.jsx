import { useCallback, useState, useEffect } from 'react';
import './App.css';

function App() {
  // States for toggling numbers and characters
  const [num, setNum] = useState(false);
  const [character, setCharacter] = useState(false);

  // State for slider value and generated password
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  // Generate password based on current settings
  const generate = useCallback(() => {
    const str_num = "0123456789";
    const str_char = "~!@#$%^&*()_+<>?,./;'[]{}|";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";

    if (num) str += str_num;
    if (character) str += str_char;

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [num, character, length]);

  // Regenerate password when options change
  useEffect(() => {
    generate();
  }, [num, character, length, generate]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900">
      <div className='bg-cyan-950 w-[500px] p-6 rounded-xl'>
        <p className='text-3xl text-center text-white font-bold mb-6'>
          Random Password Generator
        </p>

        {/* Password display and Copy button */}
        <div className='flex justify-center mb-6'>
          <input
            className='bg-white w-full max-w-md h-10 rounded-l-md px-2 font-semibold'
            type='text'
            value={password}
            readOnly
          />
          <button
            className="w-24 h-10 rounded-r-md text-white font-bold bg-amber-600 hover:bg-amber-500"
            type='button'
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy
          </button>
        </div>

        {/* Controls: Slider + Checkboxes */}
        <div className='flex flex-col sm:flex-row justify-around items-center gap-4 text-white'>

          {/* Length Slider */}
          <div className='flex items-center'>
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <span className='ml-2 text-xl'>Length: {length}</span>
          </div>

          {/* Number Checkbox */}
          <div className='flex items-center'>
            <input
              type="checkbox"
              checked={num}
              onChange={() => setNum((prev) => !prev)}
            />
            <span className='ml-2 text-xl'>Numbers</span>
          </div>

          {/* Special Characters Checkbox */}
          <div className='flex items-center'>
            <input
              type="checkbox"
              checked={character}
              onChange={() => setCharacter((prev) => !prev)}
            />
            <span className='ml-2 text-xl'>Characters</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
