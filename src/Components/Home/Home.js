import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MyContext } from "../../App";
import sideImg from "../../imgs/1.png";
import middleImg from "../../imgs/2.png";
import gameStartImg from "../../imgs/3.png";
import looseImg from "../../imgs/loose.png";
import winImg from "../../imgs/win.png";
import Result from "../Result/Result";
import "./Home.css";

const Home = () => {
  const [chance, setChance, guess, setGuess] = useContext(MyContext);
  const [random, setRandom] = useState();
  const [win, setWin] = useState();
  const [img, setImg] = useState(sideImg);
  console.log("chance : ",chance,"random, : ",random,"guess: ",guess,"win : ",win);

  useEffect(() => {
    if (guess === random) {
      setWin("true");
      setImg(winImg)
    }
  }, [guess]);

  // handling chance
  const handleChance = (c) => {
    setChance(c);
    setImg(gameStartImg)
    // generate random number
    const random = Math.trunc(Math.random() * 100);
    setRandom(random);
  };

  // handling guess number
  const handleGuess = (e) => {
    let guess_num = e.target.valueAsNumber;
    if (e.key === "Enter") {
      setGuess(guess_num);
      e.target.value = null;
      // if (chance === 1) {
      //   document.querySelector(".guess-input").disabled = true;
      //   document.querySelector(".guess-input").placeholder = "You are out";
      // }
      if (chance > 1) {
        setChance(chance - 1);
      }
      if (chance === 1) {
        console.log("Your chance is finish");
        setWin("false");
        setImg(looseImg)
        setChance(0);
      }
    }
  };

  // for reset & new game
  const reset = () => {
    setChance();
    setGuess('-');
    setRandom();
    setWin()
    setImg(sideImg)
  }

  return (
    <div>
      <Row className="align-items-center">
        {/* ------------ Left image part ------------ */}
        <Col md={6} className="mb-4 mb-sm-0 d-flex d-sm-block justify-content-center">
          <img src={img} alt="img" className="w-50" />
        </Col>

        {/* right contents */}
        <Col md={6}>
          <div className={`${win ? "d-none" : "box py-2"}`}>
            {/* ------------ First part (home section) ----------------- */}
            <div className={`${chance >= 0 ? "d-none" : "d-flex"} flex-column text-center`}>
              <h1>Guess The Random Number</h1>
              <h5>Between 1 to 100</h5>
              <img src={middleImg} alt="yellow img" className="w-50" />
              <h3>Select Difficulty</h3>
              <Button className="w-50 m-auto mb-2" variant="warning" onClick={() => handleChance(10)}>
                Easy : (10 Chances)
              </Button>
              <Button className="w-50 m-auto" variant="danger" onClick={() => handleChance(5)}>
                Hard : (5 Chances)
              </Button>
            </div>
            {/* ------------ second part (game section) ----------------- */}
            <div
              className={`${
                chance >= 0 && !win ? "d-flex" : "d-none"
              } flex-column text-center`}
            >
              <h1>Your Guess</h1>
              <input
                placeholder="Enter your guess number between 1 - 100"
                type="number"
                className="guess-input my-3"
                onKeyPress={handleGuess}
              />
              {chance === 10 || chance === 5 ? <br /> : guess > random ? <h5 className="text-danger mb-0">Your guess is High <span role="img" aria-label="none"> &#128551;</span></h5> : guess < random ? <h5 className="text-danger mb-0"> Your guess is Low <span role="img" aria-label="none"> &#128580;</span></h5>
               : ''
              }
              <Row className="mt-5">
                <Col xs={8} md={6}>
                  <h5 className="fst-italic">Your Previous Guess : </h5>
                </Col>
                <Col xs={4} md={6}>
                  <h5 className="text-success">{guess}</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={8} md={6}>
                  <h5 className="fst-italic">Remaining Chance : </h5>
                </Col>
                <Col xs={4} md={6}>
                  <h5 className="text-danger">{chance}</h5>
                </Col>
              </Row>
            </div>
          </div>
          {/* 3rd part result */}
          {win === "true" && <Result res={()=>reset()} msg={`Congratulations...!! You win...!! Your ans ${random} is correct`} />}
          {win === "false" && <Result res={()=>reset()} msg={`oops!! You lost..!! Correct ans is ${random}`} />}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
