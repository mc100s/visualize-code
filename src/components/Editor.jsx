import React from "react";

export default function Editor({
  fileName,
  children,
  values,
  iValueSelected,
  onChange,
  onSelect
}) {
  function convertStringWith$ToArray(str) {
    let stringContents = str.trim().split(/\$[0-9]+/g);
    let valuesIndexes = (str.match(/\$[0-9]+/g) || []).map(x =>
      Number(x.substring(1))
    );

    let res = [];
    for (let i = 0; i < stringContents.length; i++) {
      res.push(stringContents[i]);
      if (i < stringContents.length - 1) {
        let index = valuesIndexes[i];
        let value = values[index];
        res.push(
          <input
            className="editor__input"
            key={i}
            style={{
              width: (value.length + 0.2) * 7.8,
              color: index === iValueSelected ? "red" : "black"
            }}
            value={value}
            onChange={e => onChange(e.target.value, index)}
            onFocus={e => onSelect(index)}
            onBlur={() => onSelect(null)}
          />
        );
      }
    }

    return res
  }

  return (
    <div className="window window--text-editor">
      <div className="window__header">
        <div className="window__filename">{convertStringWith$ToArray(fileName) || "Untitled"}</div>
        {/* <div className="window__icon window__icon--red" />
        <div className="window__icon window__icon--yellow" />
        <div className="window__icon window__icon--green" /> */}
      </div>
      <div className="window__content window__content--text-editor">
        {convertStringWith$ToArray(children)}
      </div>
    </div>
  );

  // return (
  //   <AceEditor
  //     width="100%"
  //     mode={language || "javascript"}
  //     theme="monokai"
  //     maxLines={30}
  //     fontSize={14}
  //     showPrintMargin={false}
  //     showGutter={true}
  //     readOnly={true}
  //     highlightActiveLine={false}
  //     tabSize={2}
  //     value={children}
  //   />
  // );
}
