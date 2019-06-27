import React from "react";

export default function Browser({ url, children }) {
  return (
    <div className="browser">
      <div className="browser__header">
        <div className="browser__icon browser__icon--red" />
        <div className="browser__icon browser__icon--yellow" />
        <div className="browser__icon browser__icon--green" />
      </div>
      <div className="browser__sub-header">
        <input type="text" className="browser_link" value={url} readOnly />
      </div>
      <div className="browser__content">{children}</div>
    </div>
  );
}
