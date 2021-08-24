import React from "react";
import "./Home.css";

export default function Home() {
  // const handleKeyPress = (event) => {
  //   console.log('event', event);
  // };

  let input = 'test';

  let handleInput = (e) => {
    console.log('event', e);
    input += e.key;
    console.log('input', input);
  }

  return (
    <main className="Terminal " onKeyDown={handleInput} tabIndex={-1}>
      <div className="TerminalLines">
        {/* <Typical
          steps={["Hello", 1000, "Hello world!", 500]}
          //   loop={Infinity}
          wrapper="p"
          className="TerminalText"
        /> */}
        <span className="Terminal-Text">{input}</span>
        <span className="Cursor" >|</span>
      </div>

      {/* <img src={firBackgroundPicture} alt="Water Droplets on Fir" className="absolute object-cover w-full h-full"/>
            <section class="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
                <h1 className="text-6xl text-green-100 font-bold cursive leading-none lg:leading-snug home-name">Hello there!</h1>
            </section> */}
    </main>
  );
}
