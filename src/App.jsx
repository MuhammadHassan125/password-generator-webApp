import React, { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(10);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState(null);



  const PasswordGenerator = useCallback(()=> {
        let pass = "";
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        if(numbers) str += "0123456789";
        if(characters) str += "!@#$%^&*()_+";

        for (let i = 0; i < length; i++) {
          let char = Math.floor(Math.random() * str.length + 1); 
          pass += str.charAt(char);
          setPassword(pass);
        }
  },[length, numbers, characters, setPassword]);

 const passwordRef = useRef();

  const CopyPasswordClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
    window.alert("Password copied to clipboard");
    passwordRef.current?.select()
    passwordRef.current?.focus()
  },[password]);


  useEffect(()=>{
    PasswordGenerator();
  },[numbers, length, characters]);

  return (
    <>
      <h1>Password Generator App</h1>
      <div
        style={{
          width: "70%",
          margin: "0 auto",
          backgroundColor: "#383737",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            style={{ width: "70%", padding: "10px", borderRadius: "10px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
          />
          <button
            onClick={CopyPasswordClipboard}
            style={{ backgroundColor: "blue", color: "white", padding: "10px" }}
          >
            Copy
          </button>
        </div>

        <div style={{ display: "flex" }}>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <h4>Length:{length}</h4>

          <input
          value={numbers}
          type="checkbox"
          onChange={(e) => setNumbers((prev) => !prev)}
          defaultChecked= {false}
          />
          <h4>Numbers</h4>

          
          <input
          value={characters}
          type="checkbox"
          onChange={(e) => setCharacters((prev) => !prev)}
          defaultChecked = {false}
          />
          <h4>Characters</h4>

        </div>
      </div>
    </>
  );
}

export default App;
