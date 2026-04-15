import { useEffect, useState, useRef } from "react";
import "./display-card.css";

export function DisplayCard({
  selected,
  setSelected,
  highestScore,
  setHighestScore,
}) {
  const [cards, setCards] = useState(null);
  const containerRef = useRef();
  const cardposition = null
  const containerCenter = null
  const [movetoCenter, setMovetoCenter] = useState(false)

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

  // get position of card after finish rendering
  useEffect(()=> {
    if (!containerRef.current || !cards) return;

    cardposition = getPosition(containerRef)

    if (cardposition) setCards((prevCards) => 
      prevCards.map((card, index) => (
        {...card, lastposition: cardposition[index]}
      )))

    containerCenter = getCenter(containerRef)
  }, [])

  function handleClick(id) {
    // move card to center
    setMovetoCenter(true);

    setCards(shuffle(cards));

    // if the item is selected before, then reset score, and save the current score as highest score
    if (selected.includes(id)) {
      selected.length > highestScore ? setHighestScore(selected.length) : null;
      setSelected([id]);
    } else {
      setSelected([...selected, id]);
    }

    // settimeout and move to new position
  }

  // calculate how much x and y need to be move in for each card in roder to reach center
  const calculatemove =  cardposition ? cardposition.map((card) => ({
    x: card.x + containerCenter.centerx,
    y: card.y + containerCenter.centery
  })) : null

  return (
    <div className="card-container" ref={containerRef}>
      {cards
        ? cards.map((card, index) => (
            <Card
              key={card.id}
              imagelink={card.src}
              handleClick={() => handleClick(card.id)}
              movetoCenter={movetoCenter}
              x = {calculatemove[index].x}
              y = {calculatemove[index].y}
            ></Card>
          ))
        : "Loading"}
    </div>
  );
}

function Card({ index, imagelink, handleClick, movetoCenter, x, y }) {
  return (
    <motion.div key={index} className="card" onClick={handleClick} animate={{x: movetoCenter? x : 0, y: movetoCenter? y : 0} }>
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

function getPosition({containerRef}){


  // convert from htmlcollection to real array in order to map
  const childArray = [...containerRef.current.children]

  return childArray.map((child) => {
        const rect = child.getBoundingClientRect()
        return { 
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }
  })
}

function getCenter({containerRef}){
    const rect = containerRef.current.getBoundingClientRect()

    const childrect = containerRef.current.firstElementChild.getBoundingClientRect()

    const centerx = rect.left + rect.width / 2 - (childrect.width / 2);
    const centery = rect.top + rect.height / 2 - (childrect.height / 2);

    return [centerx, centery]
}