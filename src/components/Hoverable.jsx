import React, { useState } from "react";

export default function Hoverable({
  children,
  hoverText,
  hoverTextAfterClick
}) {
  function handleMouseEnter() {
    setIsHovered(true);
  }
  function handleMouseLeave() {
    setIsHovered(false);
    setIsClicked(false);
  }
  function handleClick() {
    setIsClicked(true);
  }
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className="hoverable"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {isHovered && ((hoverText && !isClicked) || (hoverTextAfterClick && isClicked)) && (
        <div className="hoverable__tooltip">
          {isClicked ? hoverTextAfterClick : hoverText}
        </div>
      )}
      {children}
    </div>
  );
}
