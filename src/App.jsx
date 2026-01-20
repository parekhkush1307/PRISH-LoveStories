import { useEffect, useRef, useState } from "react";

import ATAPI from "./assets/atapii.jpeg";
import KISS from "./assets/long_kisses.jpeg";
import CAFE from "./assets/cafe.jpeg";
import DIWALI from "./assets/before_diwali.jpeg";
import PENDENT from "./assets/pendent_days.jpeg";
import BDAY from "./assets/birthday.jpeg";

const cardsData = [
  { img: BDAY, text: "This day and date is one of my most special days because it was your birthday and our first photos together ❤️" },
  { img: PENDENT, text: "This is the best day of my life when I gave you that pendent which looked so beautiful on you💞." },
  { img: DIWALI, text: "At this day we planned to go to Victoria before Diwali and spent such a lovely time together💝" },
  { img: CAFE, text: "This was the perfect day when we met at Indian Cafe after such a long break💗." },
  { img: KISS, text: "That day we kissed and stayed close, never wanting to move away from each other💕." },
  { img: ATAPI, text: "This day we spent every moment together and we never wanted to say goodbye💖" },
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
      setTimeout(() => setCurrent((p) => p + 1), 300);
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
    <div className="font-['Comic_Sans_MS'] bg-pink-50 min-h-screen overflow-hidden">
      {/* POPUP */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-300 to-pink-100 z-50 transition-all duration-700 ${
          started ? "opacity-0 scale-150 pointer-events-none" : ""
        }`}
      >
        <div className="text-center animate-floatIn">
          <div className="text-7xl animate-heartbeat mb-4">💕</div>
          <h1 className="text-5xl text-white font-bold drop-shadow mb-8">
            Hey You!
          </h1>
          <button
            onClick={() => setStarted(true)}
            className="px-12 py-5 bg-white text-pink-500 text-2xl font-bold rounded-full shadow-xl animate-glow active:scale-95"
          >
            Tap Here 💝
          </button>
        </div>
      </div>

      {/* GALLERY */}
      <div className="flex justify-center items-center min-h-screen p-6 relative">
        <div className="relative w-full max-w-[400px] h-[550px]">
          {cardsData.map((card, index) => (
            <div
              key={index}
              onTouchStart={handleTouchStart}
              onTouchMove={(e) => handleTouchMove(e, index)}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
              className={`polaroid absolute w-full ${
                index !== current ? "pointer-events-none" : ""
              }`}
              style={{
                zIndex: cardsData.length - index,
                transform: `rotate(${index * (index % 2 ? -2 : 2)}deg) translateY(${index * 10}px)`,
              }}
            >
              <img src={card.img} className="polaroid-image" />
              <div className="polaroid-text">{card.text}</div>
            </div>
          ))}
        </div>

        <div className="instructions">Swipe the memories!! 💕</div>
      </div>

      {/* FINAL MESSAGE */}
      {showFinal && (
        <div className="final-message show">
          <h2>All done! 💖</h2>
          <p>I can’t stay without you. Please stay with me.</p>
        </div>
      )}
    </div>
  );
}
