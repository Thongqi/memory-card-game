import { useEffect, useState, useRef } from "react";
import "./display-card.css";

export function DisplayCard({
  selected,
  setSelected,
  highestScore,
  setHighestScore,
}) {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/9")
      .then((response) => response.json())
      .then((data) =>
        setCards(
          data.message.map((link, index) => ({
            id: index + 1,
            src: link,
          })),
        ),
      )
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  function handleClick(id) {
    setCards(shuffle(cards));

    // if the item is selected before, then reset score, and save the current score as highest score
    if (selected.includes(id)) {
      selected.length > highestScore ? setHighestScore(selected.length) : null;
      setSelected([id]);
    } else {
      setSelected([...selected, id]);
    }
  }

  return (
    <div className="card-container">
      {cards
        ? cards.map((card) => (
            <Card
              key={card.id}
              imagelink={card.src}
              handleClick={() => handleClick(card.id)}
              setCards={setCards}
            ></Card>
          ))
        : "Loading"}
    </div>
  );
}

function Card({ index, imagelink, setCards, handleClick }) {
  // const elementRef = useRef(null);

  // const position = elementRef.current ? this.getBoundingClientRect() : null;

  // setCards((cards) =>
  //   cards.map((card, i) =>
  //     i === index ? { ...card, coordinate: position } : null,
  //   ),
  // );
  return (
    <div key={index} className="card" onClick={handleClick}>
      <img src={imagelink}></img>
    </div>
  );
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
