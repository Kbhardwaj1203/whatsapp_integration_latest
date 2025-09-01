import React from "react";
import { FaWhatsapp } from "react-icons/fa";

/*
  Reusable floating WhatsApp button to keep preview consistent across pages
  Props:
  - text: button label
  - size: icon/button size in px
  - movePercent: horizontal movement from right (percentage)
  - radius: border-radius in px
  - background: background (color/gradient)
  - color: text/icon color
  - animation: 'none' | 'glow' | 'emitting' | 'bounce' | 'popular'
  - repeat: number | 'infinite'
  - zIndex: stacking order
*/
const FloatingWhatsAppButton = ({
  text = "Chat with us",
  size = 200,
  movePercent = 1,
  radius = 50,
  background = "linear-gradient(90deg, #25D366 0%, #128C7E 100%)",
  color = "#fff",
  animation = "none",
  repeat = "infinite",
  zIndex = 1000,
}) => {
  const animationStyle =
    animation !== "none"
      ? { animation: `${animation} 1.5s ${repeat === "infinite" ? "infinite" : repeat}` }
      : {};

  const iconSize = Math.max(24, size * 0.4);

  return (
    <>
      <style>{`
        @keyframes glow { 0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.2);} 50% { box-shadow: 0 0 18px 6px rgba(37, 211, 102, 0.4);} 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.2);} }
        @keyframes bounce { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-8px);} }
        @keyframes emitting { 0% { opacity: 1;} 50% { opacity: 0.85;} 100% { opacity: 1;} }
        @keyframes popular { 0% { box-shadow: 0 0 0 0 rgba(33,150,243,0.0);} 70% { box-shadow: 0 0 0 8px rgba(33,150,243,0.12);} 100% { box-shadow: 0 0 0 0 rgba(33,150,243,0.0);} }
      `}</style>
      <div className="fixed bottom-8 z-50" style={{ right: `calc(${movePercent}% + 8px)`, zIndex }}>
        <button
          className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg"
          style={{
            background,
            color,
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            fontWeight: "bold",
            width: `${size}px`,
            height: `${size}px`,
            minWidth: "120px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            borderRadius: `${radius}px`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            transition: "all 0.3s cubic-bezier(.4,2,.3,1)",
            ...animationStyle,
          }}
        >
          <FaWhatsapp size={iconSize} color={color} />
          <span style={{ color }}>{text}</span>
        </button>
      </div>
    </>
  );
};

export default FloatingWhatsAppButton;