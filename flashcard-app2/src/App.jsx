import logo from './logo.svg';
import './App.css';
import flashcardsData from './data/flashcards.json'
import { useState } from 'react';

const App = () => {
  // array destructuring is shorthand for giving a var name to indexed items:
  // const flashcardsStatePair = useState(flashcardsData)
  // const flashcards = flashcardsStatePair[0]
  // const setFlashcards = flashcardsStatePair[1] 
  const [flashcards, setFlashcards] = useState(flashcardsData)

const handleFlipCardClick = (event, selectedIdx) => {
  const updatedCards = flashcards.map((card, i) => {

    if (i === selectedIdx) {
      //use spread to clone data
      return {
        ...card,
        flipped: !card.flipped
      }

      // card.flipped = !card.flipped
    }
    return card
  })
  //if you dont pass in a new array, react wont re-render
  // thats why we cant use '.push'
  setFlashcards(updatedCards)
}

  return (
    <div className='container'>
      <header style={{ textAlign: 'center' }}>
        <h1>Study Flash Cards</h1>
          <hr />
      </header>

      <main className="flex-row flex-wrap">
        {flashcards.map((card, i) => {
          const classes = ["card"]

          if (card.flipped) {
            classes.push("flipped")
          }

          /* key (on line 15) should be an id if avail (e.g. using primary key id as the key property)*/
          return(
            <section key = {i} className= {classes.join(" ")} onClick={event => handleFlipCardClick(event, i)}>
              <h3>{card.Category}</h3>
              <p className='front'>{card.Front}</p>
              <p className='back'>{card.Back}</p>
            </section>
          )
          })} 
      </main>
    </div>
  );
}

export default App;
