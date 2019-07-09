import React from "react";

export default function Square(props) {
  let style = {
    height: 100,
    width: 100,
    backgroundColor: props.color
  };
  return <div className="Square" style={style}></div>;
}
