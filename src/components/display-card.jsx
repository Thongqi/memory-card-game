import { useContext, useEffect, useState } from "react";
import "./display-card.css";
import { motion } from "motion/react";
import { ResetContext } from "../App";
const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const numberofcard = {
  easy: 9,
  medium: 16,
  hard: 25,
  extreme: 49,
};

export function DisplayCard({
  selected,
  setSelected,
  highestScore,
  setHighestScore,
  difficulties,
}) {
  const [cards, setCards] = useState(null);
  const [showingCard, setShowingCard] = useState(null);
  const { reset, setReset } = useContext(ResetContext);

  const getcard = numberofcard[difficulties];

  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/image/random/${getcard}`)
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
  }, [getcard]);

  function handleClick(id) {
    // if the item is selected before, then reset score, and save the current score as highest score
    if (selected.includes(id)) {
      // add blinking effect
      setReset(true);

      selected.length > highestScore ? setHighestScore(selected.length) : null;

      setSelected([id]);

      setTimeout(() => {
        setReset(false);
      }, 1000);
    } else {
      setSelected([...selected, id]);
    }

    setShowingCard(id);

    // remove showing numbering and shuffle card
    setTimeout(() => {
      setShowingCard(null);
      console.log(showingCard);
      setCards(shuffle(cards));
    }, 1000);
  }

  return (
    <div
      className={`card-container ${reset ? "blink" : null}`}
      style={{
        width: `${Math.sqrt(getcard) * (difficulties === "extreme" ? 110 : 210)}px`,
      }}
    >
      {cards
        ? cards.map((card) => (
            <Card
              key={card.id}
              imagelink={card.src}
              handleClick={() => handleClick(card.id)}
              selected={selected}
              showingCard={showingCard}
              cardid={card.id}
              difficulties={difficulties}
            ></Card>
          ))
        : "Loading"}
    </div>
  );
}

function Card({
  cardid,
  imagelink,
  handleClick,
  selected,
  showingCard,
  difficulties,
}) {
  return (
    <motion.div
      key={cardid}
      layout
      transition={spring}
      className="card"
      onClick={handleClick}
      style={{ width: difficulties === "extreme" ? "100px" : "200px" }}
    >
      <div className={showingCard === cardid ? "show" : "hide"}>
        <p>{selected.length}</p>
      </div>
      <img
        src={imagelink}
        style={{ height: difficulties === "extreme" ? "100px" : "200px" }}
      ></img>
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
