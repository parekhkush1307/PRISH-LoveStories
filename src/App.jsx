import { useEffect, useRef, useState } from "react";
import "./App.css";

import ATAPI from "./assets/ATAPI.jpeg";
import KISS from "./assets/OUR_FIRST_KISS.jpeg";
import CAFE from "./assets/INDIAN_CAFE.jpeg";
import DIWALI from "./assets/BEFORE_DIWALI_MEET.jpeg";
import PENDENT from "./assets/PENDENT_DAY.jpeg";
import BDAY from "./assets/YOUR_BIRTHDAY.jpeg";

const cardsData = [
  { img: BDAY, text: "This day and date is my one of the most special and favourite because it was our first time that we clicked our photos and main thing it was you birthdayyyyyyy." },
  { img: PENDENT, text: "This is the best day of my life when I had gave you pendent which was looking so good at you." },
  { img: DIWALI, text: "At this day we planned to go to the Victoria before the diwali and had spend so good time with each other." },
  { img: CAFE, text: "This was the perfect day where we decided to meet at the indian cafe after a very long break." },
  { img: KISS, text: "At this day we have kissed each other so hard that we never wanna move away from each other." },
  { img: ATAPI, text: "At this day we have spent each and every together, and loved each other so much ❤️" },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const startX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e, index) => {
    if (index !== current) return;
    const diff = e.changedTouches[0].screenX - startX.current;
    e.currentTarget.style.transform = `translateX(${diff}px) rotate(${diff / 10}deg)`;
  };

  const handleTouchEnd = (e, index) => {
    if (index !== current) return;
    const diff = e.changedTouches[0].screenX - startX.current;
    const card = e.currentTarget;

    if (Math.abs(diff) > 100) {
      card.classList.add(diff > 0 ? "swiped-right" : "swiped-left");
      createConfetti();
      setTimeout(() => {
        setCurrent((prev) => prev + 1);
      }, 300);
    } else {
      card.style.transform = "";
    }
  };

  useEffect(() => {
    if (current >= cardsData.length) {
      setTimeout(() => setShowFinal(true), 500);
    }
  }, [current]);

  const createConfetti = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "confetti-heart";
        heart.innerHTML = ["💕", "💖", "💗", "💝"][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.top = Math.random() * 30 + "%";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }, i * 50);
    }
  };

  return (
    <>
      {!started && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-heart">💕</div>
            <h1 className="popup-title">Hey You!</h1>
            <button className="popup-btn" onClick={() => setStarted(true)}>
              Tap Here 💝
            </button>
          </div>
        </div>
      )}

      <div className="gallery-wrapper">
        <div className="polaroid-stack">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="polaroid"
              style={{ zIndex: cardsData.length - index }}
              onTouchStart={handleTouchStart}
              onTouchMove={(e) => handleTouchMove(e, index)}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
            >
              <img src={card.img} className="polaroid-image" />
              <div className="polaroid-text">{card.text}</div>
            </div>
          ))}
        </div>

        <div className="instructions">Swipe the memories!! 💕</div>
      </div>

      {showFinal && (
        <div className="final-message show">
          <h2>All done! 💖</h2>
          <p>I can’t stay without you. Please stay with me.</p>
        </div>
      )}
    </>
  );
}
