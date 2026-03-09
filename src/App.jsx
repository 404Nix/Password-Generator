import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  let passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "!@#$%^&*()_+-=[]{}|;':,.<>?/~";

    if (numAllowed) str += num;
    if (charAllowed) str += char;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numAllowed, setPassword]);

  const copyToClicpBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-2xl px-2 py-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-2xl text-center my-5">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            value={password}
            className="outline-none w-full py-1 px-3 bg-white text-black"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClicpBoard}
            className="px-2 py-4 bg-emerald-800 cursor-pointer hover:bg-emerald-500 active:bg-emerald-100"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label> length: {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              className="cursor-pointer"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label> numbers </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className="cursor-pointer"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label> characters </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
