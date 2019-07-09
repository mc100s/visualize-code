import React, { useState } from "react";
import pluralize from "pluralize";
import dashify from "dashify";
import Browser from "../Browser";
import Editor from "../Editor";
import Hoverable from "../Hoverable";
import Multiplication from "../examples/Multiplication";
import Square from "../examples/Square";

function ExpressCrud() {
  function handleSelect(i) {
    setIValueSelected(i);
  }
  function handleEditorChange(newValue, iValue) {
    let copyValues = [...values];
    copyValues[iValue] = newValue;
    setValues(copyValues);
  }
  function addTypeWarning(value) {
    let possibleValues = [
      "String",
      "Number",
      "Date",
      "Boolean",
      "Schema.Types.ObjectId",
      "Schema.Types.Mixed",
      "Array",
      "[String]",
      "[Number]"
    ];
    if (
      possibleValues.includes(value) ||
      (value.startsWith("[") && value.endsWith("]"))
    )
      return "";
    else
      return `// Warning: the possible types values are: ${possibleValues.join(
        ", "
      )}, ... (more info here: https://mongoosejs.com/docs/schematypes.html)`;
  }
  function quickChangeForModel(e) {
    let newModelValue = e.target.value;
    let lowerValue =
      newModelValue.toLocaleLowerCase()[0] + newModelValue.substr(1);
    let copyValues = [...values];
    copyValues[1] = newModelValue;
    copyValues[2] = lowerValue + "Schema";
    copyValues[9] = pluralize(lowerValue);
    copyValues[10] = pluralize(lowerValue);
    copyValues[11] = dashify(pluralize(lowerValue));
    copyValues[12] = dashify(pluralize(lowerValue));
    copyValues[13] = pluralize(lowerValue);
    copyValues[27] = dashify(lowerValue) + "-detail";
    copyValues[25] = lowerValue + "Id";
    copyValues[26] = lowerValue;
    copyValues[28] = lowerValue;
    copyValues[29] = "add-" + dashify(lowerValue);
    copyValues[30] = "add-" + dashify(lowerValue);
    copyValues[31] = "add-" + dashify(lowerValue);
    copyValues[35] = lowerValue;
    copyValues[36] = "edit-" + dashify(lowerValue);
    copyValues[37] = "delete-" + dashify(lowerValue);
    copyValues[38] = "edit-" + dashify(lowerValue);
    copyValues[39] = "edit-" + dashify(lowerValue);
    copyValues[40] = lowerValue;
    copyValues[41] = lowerValue + "Id";
    copyValues[42] = lowerValue;
    copyValues[43] = lowerValue + "Id";
    copyValues[47] = lowerValue;
    copyValues[48] = lowerValue + "Id";
    copyValues[49] = lowerValue;

    // copyValues[16] = France
    // copyValues[17] = Paris
    // copyValues[18] = 67000000
    // copyValues[19] = Germany
    // copyValues[20] = Berlin
    // copyValues[21] = 83000000
    // copyValues[22] = Portugal
    // copyValues[23] = Lisbon
    // copyValues[24] = 10000000
    setValues(copyValues);
  }
  function quickChangeForField(nField, e) {
    let copyValues = [...values];
    copyValues[nField + 2] = e.target.value;
    copyValues[nField + 31] = e.target.value;
    copyValues[nField + 43] = e.target.value;
    setValues(copyValues);
  }
  function quickChangeForValue(iValue, e) {
    let copyValues = [...values];
    copyValues[iValue] = e.target.value;
    setValues(copyValues);
  }

  let initialValues1 = [
    "Multiplication",
    "x",
    "y",
    "6",
    "7",
    "9",
    "10",
    "Multiplication",
    "Multiplication",
    "Square",
    "style",
    "Square",
    "color",
    "red",
    "#008000",
    "rgb(0,0,255)",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];
  const [values, setValues] = useState(initialValues1);
  // When iValueSelected is equal to 42, then the values[42] is selected (red)
  const [iValueSelected, setIValueSelected] = useState(null);

  const defaultEditorProps = {
    values: values,
    iValueSelected: iValueSelected,
    onSelect: handleSelect,
    onChange: handleEditorChange
  };

  return (
    <div className="">
      <h1>React Props</h1>
      <p>For a good architecture, 1 component = 1 file.</p>
      <hr />
      {/* ---------- Example 1 ---------- */}
      <h2>Example 1: Simple {values[0]} component with 2 props</h2>
      <div className="row row--3">
        <Editor {...defaultEditorProps} fileName={`src/index.js`}>
          {`
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Render the App component into the tag with the id "root"
ReactDOM.render(<App />, document.getElementById("root"));
`}
        </Editor>

        <Editor {...defaultEditorProps} fileName={`src/index.css`}>
          {`
.$7 {
  border: 1px solid black;
  padding: 5px;
  margin: 10px 0;
}
`}
        </Editor>

        <Editor {...defaultEditorProps} fileName={`src/App.jsx`}>
          {`
import React from "react";
import $0 from "./$8";

// The App component takes no props
// To render it, you can type: <App />
export default function App() {
  return (
    <div className="App">
      <$0 $1={$3} $2={$4} />
      <$0 $1={$5} $2={$6} />
    </div>
  )
}
`}
        </Editor>

        <Editor {...defaultEditorProps} fileName={`src/$8.jsx`}>
          {`
import React from "react";

// The ${values[0]} component takes 2 props x and y
// To render it, you can type: <${values[0]} x={my1stNumber} y={my2ndNumber} />
export default function $0(props) {
  return (
    <div className="$7">
      {props.$1} * {props.$2} = {props.$1 * props.$2}
    </div>
  );
}
`}
        </Editor>
        <Browser
          url={`http://localhost:3000/`}
          devTool={`
<div class="App">
  <div class="${values[7]}">${values[3]} * ${values[4]} = ${values[3] * values[4]}</div>
  <div class="${values[7]}">${values[5]} * ${values[6]} = ${values[5] * values[6]}</div>
</div>
        `}
        >
          <Multiplication x={values[3]} y={values[4]} />
          <Multiplication x={values[5]} y={values[6]} />
        </Browser>
      </div>
      <hr/>
      {/* ---------- Example 2 ---------- */}
      <h2>Example 2: Simple {values[9]} component with 1 props and inline styling</h2>
      <div className="row row--2">
        <Editor {...defaultEditorProps} fileName={`src/index.js`}>
          {`
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Render the App component into the tag with the id "root"
ReactDOM.render(<App />, document.getElementById("root"));
`}
        </Editor>

        <Editor {...defaultEditorProps} fileName={`src/App.jsx`}>
          {`
import React from "react";
import $9 from "./$11";

// The App component takes no props
// To render it, you can type: <App />
export default function App() {
  return (
    <div className="App">
      <$9 $12={"$13"} />
      <$9 $12={"$14"} />
      <$9 $12={"$15"} />
    </div>
  )
}
`}
        </Editor>

        <Editor {...defaultEditorProps} fileName={`src/$11.jsx`}>
          {`
import React from "react";

// The ${values[9]} component takes 1 props ${values[12]}
// To render it, you can type: <${values[9]} ${values[12]}={"myColor"} />
export default function $9(props) {
  let $10 = {
    height: 100,
    width: 100,
    backgroundColor: props.$12
  };
  return (
    <div style={$10}></div>
  );
}
`}
        </Editor>
        <Browser
          url={`http://localhost:3000/`}
          devTool={`
<div class="App">
  <div style="height: 100px; width: 100px; background-color: ${values[13]};"></div>
  <div style="height: 100px; width: 100px; background-color: ${values[14]};"></div>
  <div style="height: 100px; width: 100px; background-color: ${values[15]};"></div>
</div>
        `}
        >
          <Square color={values[13]} />
          <Square color={values[14]} />
          <Square color={values[15]} />
        </Browser>
      </div>
      <hr />
      <hr />
      <hr />
      <hr />
      <ul>
        <li>
          <pre style={{ margin: 0 }}>$i => ${iValueSelected}</pre>
        </li>
        {values.map((value, i) => (
          <li key={i}>
            <pre style={{ margin: 0 }}>
              ${i} => {value}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpressCrud;
