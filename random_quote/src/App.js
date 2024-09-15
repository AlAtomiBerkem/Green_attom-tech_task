import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const url = 'https://dog.ceo/api/breeds/image/random';

export function colorRandom() {
  const colors = ["#14cc8d", "#1481cc", "#cc3114", "#bb14cc", "#14ccbb", "#5f14cc", "#cc8d14"];
  const randomColor= colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}


function App() {
  const [quote, setQuote] = useState({ quoteText: '', quoteAuthor: '' });

  const buttonDogImage = () => {
    axios
      .get(url)
      .then(response => {
        console.log(response.data.quoteAuthor);
        setQuote({
          quoteText: response.data.message,
          quoteAuthor: response.data.status 
        });
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  };

  useEffect(() => {
    buttonDogImage();
  }, []);

  return (
    <section className="container-fluid">
      <h1 className='text-primary'>Random Dog Images!</h1>
      <div className="well">
        <img className='image' src={quote.quoteText} alt='dog'/>
        <p className="author-text">{quote.quoteAuthor}</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={() => {
        colorRandom();
        buttonDogImage();
      }}>New dog image</button>
    </section>
  );
}

export default App;
