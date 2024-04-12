import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  function inputChange(e) {
    setLength(e.target.value);
  }
  const copyText = () => {
    inputRef.current?.select();

    navigator.clipboard.writeText(inputRef.current.value);
  };

  const passWordGen = useCallback(() => {
    let pass = "";
    let alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) alphabets += "0123456789";
    if (charAllowed) alphabets += "!$%&|[](){}:;.,*+-#@<>~";

    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * alphabets.length);
      pass += alphabets[random];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);
  useEffect(() => {
    passWordGen();
  }, [passWordGen]);

  return (
    <div className="border  w-full max-w-md mx-auto shadow-md rounded-lg bg-gray-800 text-black-500 px-4 py-3 my-8 ">

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
        ref={inputRef}
        className="outline-none w-full py-1 px-3 text-black"        type="text"
        readOnly
        value={password}
      />
      <button 
     className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'

      onClick={copyText}>Copy</button>
      </div>


      <div className="flex   text-sm gap-x-2">
       <div className="flex items-center gap-x-1"> 
        <input
          onChange={inputChange}
          type="range"
          id="typeinp"
          value={length}
          min="0"
          max="100"
          step="1"
          className='cursor-pointer'
        />
        <label htmlFor="typeinp"> {length}</label>
        </div>


        <div className="flex items-center gap-x-1"><label htmlFor="numberInput">number</label>
        <input
          type="checkbox"
          id="numberInput"
          checked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        /></div>

       <div className="flex items-center gap-x-1">
       <label htmlFor="charInput">char</label>
        <input
          type="checkbox"
          checked={charAllowed}
          id="charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        />
       </div>
      </div>
    </div>
  );
}
