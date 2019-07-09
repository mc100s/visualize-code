import React from "react";

// The Multiplication component takes 2 props x and y => to render it: <Multiplication x={.....} y={.....} />
export default function Multiplication(props) {
  return (
    <div className="Multiplication">
      {props.x} * {props.y} = {props.x * props.y}
    </div>
  );
}
