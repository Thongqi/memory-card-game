import { useEffect, useState } from "react";
import "./display-card.css";
import { DisplayScore } from "./count-score";

export function DisplayCard({selected, setSelected, highestScore, setHighestScore}) {
  const [images, setImages] = useState(null);
  const [cards, setCards] = useState(null)

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://dog.ceo/api/breeds/image/random/9");
    xhr.onload = function () {
      if (xhr.status === 200) {
        setImages(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }, []);

  if (images){
    setCards(images.message.map((link, index) => (
      {id: index + 1, coordinate: null, src: link}
    )))
  }

  function handleClick(id){
    setCards(shuffle(cards))
    
    // if the item is selected before, then reset score, and save the current score as highest score
    if (selected.includes(id)){
        selected.length > highestScore? setHighestScore(selected.length): null
        setSelected(id)
    } else {
      setSelected([...selected, id])
    }
  }
  
  return (
    <div className="card-container">
      {images
        ? cards.map((index, card) => (
        <Card index={index} imagelink={card.link} handleClick={handleClick(card.id)}></Card>
      ))
        : "Loading"}
    </div>
  );
}

function Card({index, imagelink, setCards, cards, handleClick}){
  const position = this.getBoundingClientRect()

  setCards(cards => [...cards, {id: index, key: index, coordinate: position, src: imagelink}])
  
  return (
    <div key={index} className="card" onClick={handleClick}>
      <img src={imagelink}></img>
    </div>
  )
}

function shuffle(array){
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array
}