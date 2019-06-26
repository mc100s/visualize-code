import React, { useState } from "react";
import AceEditor from "react-ace";

import "brace/mode/html";
import "brace/mode/javascript";
import "brace/theme/monokai";

function App() {
  const [method, setMethod] = useState("get");
  const [values, setValues] = useState([
    "target",
    "favoriteFruit",
    "favoriteVeg",
    "apple",
    "carrot",
    "x",
    "y"
  ]);

  function handleChange(newValue, i) {
    setValues(values.map((value, j) => (i === j ? newValue : value)));
  }

  return (
    <div className="App">
      <h1>GET and POST requests with Express</h1>
      Method:{" "}
      <select onChange={e => setMethod(e.target.value)}>
        <option value="get">GET</option>
        <option value="post">POST</option>
      </select>
      {values.map((value, i) => (
        <div key={i}>
          Value {i}:{" "}
          <input
            type="text"
            value={values[i]}
            onChange={e => handleChange(e.target.value, i)}
          />{" "}
          <br />
        </div>
      ))}
      <hr />
      <h2>Step 1: display the form</h2>
      <div className="row row--3">
        {/* <AceEditor
          mode="java"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        /> */}
        <AceEditor
          width="100%"
          mode="javascript"
          theme="monokai"
          maxLines={30}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          readOnly={true}
          highlightActiveLine={false}
          tabSize={2}
          value={`// File app.js
// ...

app.get("/", (req,res,next) => {
  res.render("index")
})

// ...`}
        />
        
        <AceEditor
          width="100%"
          mode="html"
          theme="monokai"
          maxLines={30}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          readOnly={true}
          highlightActiveLine={false}
          tabSize={2}
          value={`{{!-- File views/index.hbs --}}

<form action="/${values[0]}" method="${method.toUpperCase()}">
  <input type="text" name="${values[1]}" /><br />
  <input type="text" name="${values[2]}" /><br />
  <button>Submit</button>
</form>`}
        />
        <div className="browser">
          <div className="browser__header">
            <div className="browser__icon browser__icon--red" />
            <div className="browser__icon browser__icon--yellow" />
            <div className="browser__icon browser__icon--green" />
          </div>
          <div className="browser__sub-header">
            <input
              type="text"
              className="browser_link"
              value="http://localhost:3000/"
            />
          </div>
          <div className="browser__content">
            <input
              type="text"
              value={values[3]}
              onChange={e => handleChange(e.target.value, 3)}
            />
            <br />
            <input
              type="text"
              value={values[4]}
              onChange={e => handleChange(e.target.value, 4)}
            />
            <br />
            <button>Submit</button>
          </div>
        </div>
      </div>
      <hr />
      <h2>Step 2: handle the form submission</h2>
      <div className="row row--3">

      <AceEditor
          width="100%"
          mode="javascript"
          theme="monokai"
          maxLines={30}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          readOnly={true}
          highlightActiveLine={false}
          tabSize={2}
          value={`// File app.js
// ...

app.${method}("/${values[0]}", (req,res,next) => {
  console.log(req.${method === "get" ? "query" : "body"}.${values[1]}) // => "${
            values[3]
          }"
  console.log(req.${method === "get" ? "query" : "body"}.${values[2]}) // => "${
            values[4]
          }"
  res.render("result", {
    ${values[5]}: req.${method === "get" ? "query" : "body"}.${values[1]},
    ${values[6]}: req.${method === "get" ? "query" : "body"}.${values[2]},
  })
})

// ...`}
        />


        <AceEditor
          width="100%"
          mode="html"
          theme="monokai"
          maxLines={30}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          readOnly={true}
          highlightActiveLine={false}
          tabSize={2}
          value={`{{!-- File views/result.hbs --}}

You typed 2 values: 
<ul>
  <li>{{${values[5]}}}</li>
  <li>{{${values[6]}}}</li>
</ul>`}
        />
      

        <div className="browser">
          <div className="browser__header">
            <div className="browser__icon browser__icon--red" />
            <div className="browser__icon browser__icon--yellow" />
            <div className="browser__icon browser__icon--green" />
          </div>
          <div className="browser__sub-header">
            <input
              type="text"
              className="browser_link"
              value={
                method === "get"
                  ? `http://localhost:3000/${values[0]}?${values[1]}=${
                      values[3]
                    }&${values[2]}=${values[4]}`
                  : `http://localhost:3000`
              }
            />
          </div>
          <div className="browser__content">
            You typed 2 values:
            <ul>
              <li>{values[3]}</li>
              <li>{values[4]}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
