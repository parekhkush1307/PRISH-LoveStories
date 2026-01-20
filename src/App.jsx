import { useEffect, useRef, useState } from "react";

import ATAPI from "./assets/atapii.jpeg";
import KISS from "./assets/long_kisses.jpeg";
import CAFE from "./assets/cafe.jpeg";
import DIWALI from "./assets/before_diwali.jpeg";
import PENDENT from "./assets/pendent_days.jpeg";
import BDAY from "./assets/birthday.jpeg";

const cardsData = [
  { img: BDAY, text: "This day and date is one of my most special days because it was your birthday and our first photos together ❤️" },
  { img: PENDENT, text: "This is the best day of my life when I gave you that pendent which looked so beautiful on you 💞" },
  { img: DIWALI, text: "At this day we planned to go to Victoria before Diwali and spent such a lovely time together 💝" },
  { img: CAFE, text: "This was the perfect day when we met at Indian Cafe after such a long break 💗" },
  { img: KISS, text: "That day we kissed and stayed close, never wanting to move away from each other 💕" },
  { img: ATAPI, text: "This day we spent every moment together and never wanted to say goodbye 💖" },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.changedTouches[0].screenX;
    startY.current = e.changedTouches[0].screenY;
  };

  const handleTouchMove = (e, index) => {
    if (index !== current) return;

    // 🚫 prevent pull-to-refresh
    e.preventDefault();

    const diffX = e.changedTouches[0].screenX - startX.current;
    const diffY = e.changedTouches[0].screenY - startY.current;

    const limitedX = Math.max(Math.min(diffX, 60), -60);
    const limitedY = Math.max(Math.min(diffY, 120), 0);

    e.currentTarget.style.transform = `
      translateX(${limitedX}px)
      translateY(${limitedY}px)
      rotate(${limitedX / 20}deg)
    `;
  };

  const handleTouchEnd = (e, index) => {
    if (index !== current) return;

    const diffY = e.changedTouches[0].screenY - startY.current;
    const card = e.currentTarget;

    if (diffY > 100) {
      // card exits DOWN
      card.classList.add(
        "transition-all",
        "duration-300",
        "opacity-0",
        "translate-y-[200%]",
        "rotate-[8deg]"
      );

      setTimeout(() => {
        setCurrent((p) => p + 1);
      }, 300);
    } else {
      card.style.transform = "";
    }
  };

  useEffect(() => {
    if (current >= cardsData.length) {
      setTimeout(() => setShowFinal(true), 400);
    }
  }, [current]);

  return (
    <div className="font-['Comic_Sans_MS'] bg-pink-50 min-h-screen overflow-hidden overscroll-none touch-none">
      {/* POPUP */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-300 to-pink-100 z-50 transition-all duration-700 ${
          started ? "opacity-0 scale-150 pointer-events-none" : ""
        }`}
      >
        <div className="text-center animate-[floatIn_1s_ease]">
          <div className="text-7xl animate-[heartbeat_1.5s_ease_infinite] mb-4">💕</div>
          <h1 className="text-5xl text-white font-bold drop-shadow mb-8">
            Hey You!
          </h1>
          <button
            onClick={() => setStarted(true)}
            className="px-12 py-5 bg-white text-pink-500 text-2xl font-bold rounded-full shadow-xl active:scale-95 animate-[glow_2s_ease_infinite]"
          >
            Tap Here 💝
          </button>
        </div>
      </div>

      {/* GALLERY */}
      <div className="flex justify-center items-center min-h-screen p-6 relative">
        <div className="relative w-full max-w-[400px] h-[550px]">
          {cardsData.map((card, index) => {
            const offset = index - current;

            return (
              <div
                key={index}
                onTouchStart={handleTouchStart}
                onTouchMove={(e) => handleTouchMove(e, index)}
                onTouchEnd={(e) => handleTouchEnd(e, index)}
                className={`absolute w-full bg-white p-4 pb-16 rounded shadow-2xl cursor-grab transition-all duration-500 ${
                  index !== current ? "pointer-events-none" : ""
                }`}
                style={{
                  zIndex: cardsData.length - index,
                  transform: `
                    translateY(${offset * 14}px)
                    scale(${offset === 0 ? 1 : 0.96})
                  `,
                  opacity: offset < 0 ? 0 : 1,
                }}
              >
                <img
                  src={card.img}
                  className="w-full h-[400px] object-cover rounded"
                />
                <div className="absolute bottom-4 left-4 right-4 text-center font-bold text-gray-700 rotate-[-2deg]">
                  {card.text}
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 text-pink-500 font-bold text-xl animate-bounce">
          Swipe down 💕
        </div>
      </div>

      {/* FINAL MESSAGE */}
      {showFinal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-5xl text-pink-500 font-bold drop-shadow mb-4">
              All done! 💖
            </h2>
            <p className="text-2xl text-gray-600">
              I can’t stay without you. Please stay with me.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
