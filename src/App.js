import React, { createContext, useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Home from "./Components/Home/Home";
export const MyContext = createContext();

function App() {
  const [chance, setChance] = useState();
  const [guess, setGuess] = useState("-");
  return (
    <MyContext.Provider value={[chance, setChance, guess, setGuess]}>
      <div className="App py-sm-0 py-3 d-flex align-items-sm-center align-items-start justify-content-center">
        <Container className="cont">
          <Home />
        </Container>
      </div>
    </MyContext.Provider>
  );
}

export default App;
