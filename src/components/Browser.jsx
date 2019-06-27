import React from "react";

export default function Browser({ url, children }) {
  return (
    <div className="window">
      <div className="window__header">
        <div className="window__icon window__icon--red" />
        <div className="window__icon window__icon--yellow" />
        <div className="window__icon window__icon--green" />
      </div>
      <div className="window__sub-header">
        <input type="text" className="window_link" value={url} readOnly />
      </div>
      <div className="window__content">{children}</div>
    </div>
  );
}
