import React from "react";
import AceEditor from "react-ace";
import "brace/mode/html";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default function Editor({ language, children }) {
  return (
    <AceEditor
      width="100%"
      mode={language || "javascript"}
      theme="monokai"
      maxLines={30}
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      readOnly={true}
      highlightActiveLine={false}
      tabSize={2}
      value={children}
    />
  );
}
