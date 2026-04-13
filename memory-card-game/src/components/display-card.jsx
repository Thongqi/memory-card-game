import { useEffect, useState } from "react";
import "./display-card.css";

export function DisplayCard() {
  const [images, setImages] = useState(null);

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

  // create 9 object with link, id, and coordinates

  return (
    <div className="card-container">
      {images
        ? images.message.map((imagelink, index) => (
            <div key={index} className="card">
              <img src={imagelink}></img>
            </div>
          ))
        : "Loading"}
    </div>
  );
}
