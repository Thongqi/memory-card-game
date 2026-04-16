import { useEffect, useState } from "react";
import "./display-card.css";
import { motion } from "motion/react";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

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
              selected={selected}
            ></Card>
          ))
        : "Loading"}
    </div>
  );
}

function Card({ index, imagelink, handleClick, selected }) {
  return (
    <motion.div
      key={index}
      layout
      transition={spring}
      className="card"
      onClick={handleClick}
    >
      <div>
        <p>{selected.length + 1}</p>
      </div>
      <img src={imagelink}></img>
    </motion.div>
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

function getPosition(containerRef) {
  // convert from htmlcollection to real array in order to map
  const childArray = [...containerRef.current.children];

  return childArray.map((child) => {
    const rect = child.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
  });
}

function getCenter(containerRef) {
  const rect = containerRef.current.getBoundingClientRect();

  const childrect =
    containerRef.current.firstElementChild.getBoundingClientRect();

  const centerx = rect.left + rect.width / 2 - childrect.width / 2;
  const centery = rect.top + rect.height / 2 - childrect.height / 2;

  return [centerx, centery];
}
