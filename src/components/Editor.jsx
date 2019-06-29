import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import copy from "clipboard-copy";
import Hoverable from './Hoverable'

export default function Editor({
  fileName,
  children,
  values,
  iValueSelected,
  onChange,
  onSelect
}) {
  function convertStringWith$ToArray(str, withInput = true) {
    // Part 1: replace $1 or $42 by the an input with the value
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
        if (!withInput) {
          res.push(value);
          console.log("TCL: value", value);
        } else {
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
    }
    // Part 2: wrap the comments with a <span class="comment-text">...</span>
    if (withInput) {
      for (let i = 0; i < res.length; i++) {
        if (typeof res[i] === "string" && res[i].includes('// ')) {
          // let indexOfComments = res[i].indexOf('// ')
          // res.splice(i, 1, res[i].substr(0, indexOfComments), <span class="comment-text">//</span>, res[i].substr(indexOfComments+2))
          // i++

          let match = res[i].match(/\/\/ .*/)
          let indexOfComment = match.index
          let textOfComment = match[0]
          let lengthOfComment = textOfComment.length
          res.splice(i, 1, res[i].substr(0, indexOfComment), <span class="comment-text">{textOfComment}</span>, res[i].substr(indexOfComment+lengthOfComment))
          i++
        }
      }
    }

    return res;
  }
  function handleCopyClick() {
    copy(convertStringWith$ToArray(children, false).join(""));
  }

  return (
    <div className="window window--text-editor">
      <div className="window__header">
        <div className="window__filename">
          {convertStringWith$ToArray(fileName) || "Untitled"}
        </div>
        <div className="window__actions">
          <Hoverable hoverText="Copy" hoverTextAfterClick="Copied!">
            <FontAwesomeIcon icon={faClone} onClick={handleCopyClick} />
          </Hoverable>
        </div>
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
