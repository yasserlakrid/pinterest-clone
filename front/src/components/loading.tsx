
import { useEffect, useState } from "react";
import "./loading.css";

const colors = [
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#F43F5E", // Rose
];

export default function Loader() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="frame">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`
            ${i === 0 ? "firstContainer" : ""}
            ${i === 1 ? "secondContainer" : ""}
            ${i === 2 ? "thirdContainer" : ""}
            ${activeIndex === i ? "animated" : ""}
          `}
        >
          <div
            style={{
              backgroundColor: colors[activeIndex],
              transition: "500ms",
            }}
          />
        </div>
      ))}
    </div>
  );
}