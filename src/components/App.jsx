import React, { useState } from "react";
import Browser from "./Browser";
import Editor from "./Editor";

function App() {
  const [method, setMethod] = useState("get");

  let initialValues1 = [
    "target",
    "favoriteFruit",
    "favoriteVeg",
    "apple",
    "carrot",
    "x",
    "y",
    "index",
    "result",
    "text"
  ];
  let initialValues2 = [
    "login",
    "username",
    "password",
    "steve",
    "jobs",
    "username",
    "password",
    "index",
    "login",
    "password"
  ];
  const [values, setValues] = useState(initialValues1);
  // When iValueSelected is equal to 42, then the values[42] is selected (red)
  const [iValueSelected, setIValueSelected] = useState(null);

  function handleChange(newValue, i) {
    setValues(values.map((value, j) => (i === j ? newValue : value)));
  }

  function handleSelect(i) {
    setIValueSelected(i);
  }

  function handleEditorChange(newValue, iValue) {
    let copyValues = [...values];
    copyValues[iValue] = newValue;
    setValues(copyValues);
  }

  return (
    <div className="App">
      <h1>GET and POST requests with Express</h1>
      Method:{" "}
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option value="get">GET</option>
        <option value="post">POST</option>
      </select>
      <br />
      Examples:{" "}
      <button onClick={() => setValues(initialValues1)}>
        Fruits and vegetables
      </button>{" "}
      <button
        onClick={() => {
          setValues(initialValues2);
          setMethod("post");
        }}
      >
        Username and password
      </button>
      <br/>
      <p>You can choose different options and change the code to see the effects!</p>
      {/* {values.map((value, i) => (
        <div key={i}>
          Value {i}:{" "}
          <input
            type="text"
            value={values[i]}
            onChange={e => handleChange(e.target.value, i)}
          />{" "}
          <br />
        </div>
      ))} */}
      <hr />
      {/* ----- Step 1 ----- */}
      <h2>Step 1: display the form</h2>
      <div className="row row--3">
        <Editor
          fileName="app.js"
          values={values}
          iValueSelected={iValueSelected}
          onSelect={handleSelect}
          onChange={handleEditorChange}
        >
          {`
// ...

app.get("/", (req,res,next) => {
  res.render("$7")
})

// ...`}
        </Editor>

        <Editor
          fileName={`views/$7.hbs`}
          values={values}
          iValueSelected={iValueSelected}
          onSelect={handleSelect}
          onChange={handleEditorChange}
        >
          {`
<form action="/$0" method="${method.toUpperCase()}">
  <input type="text" name="$1" /><br />
  <input type="$9" name="$2" /><br />
  <button>Submit</button>
</form>`}
        </Editor>
        <Browser url="http://localhost:3000/">
          <input
            type="text"
            value={values[3]}
            onChange={e => handleChange(e.target.value, 3)}
          />
          <br />
          <input
            type={values[9]}
            value={values[4]}
            onChange={e => handleChange(e.target.value, 4)}
          />
          <br />
          <button>Submit</button>
        </Browser>
      </div>
      <hr />
      {/* ----- Step 2 ----- */}
      <h2>Step 2: handle the form submission</h2>
      <div className="row row--3">
        <Editor
          fileName="app.js"
          values={values}
          iValueSelected={iValueSelected}
          onSelect={handleSelect}
          onChange={handleEditorChange}
        >
          {`
// ...

app.${method}("/$0", (req,res,next) => {
  console.log(req.${method === "get" ? "query" : "body"}.$1) // => "${
            values[3]
          }"
  console.log(req.${method === "get" ? "query" : "body"}.$2) // => "${
            values[4]
          }"
  res.render("$8", {
    $5: req.${method === "get" ? "query" : "body"}.$1},
    $6: req.${method === "get" ? "query" : "body"}.$2},
  })
})

// ...`}
        </Editor>

        <Editor
          fileName={`views/$8.hbs`}
          values={values}
          iValueSelected={iValueSelected}
          onSelect={handleSelect}
          onChange={handleEditorChange}
        >
          {`
You typed 2 values: 
<ul>
  <li>{{$5}}}</li>
  <li>{{$6}}}</li>
</ul>`}
        </Editor>

        <Browser
          url={
            `http://localhost:3000/${values[0]}` +
            (method === "get"
              ? `?${values[1]}=${values[3]}&${values[2]}=${values[4]}`
              : ``)
          }
        >
          You typed 2 values:
          <ul>
            <li>{values[3]}</li>
            <li>{values[4]}</li>
          </ul>
        </Browser>
      </div>
    </div>
  );
}

export default App;
