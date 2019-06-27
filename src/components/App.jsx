import React, { useState } from "react";
import Browser from "./Browser";
import Editor from "./Editor";

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
        <Editor>{`// File app.js
// ...

app.get("/", (req,res,next) => {
  res.render("index")
})

// ...`}</Editor>

        <Editor language="html">{`{{!-- File views/index.hbs --}}

<form action="/${values[0]}" method="${method.toUpperCase()}">
  <input type="text" name="${values[1]}" /><br />
  <input type="text" name="${values[2]}" /><br />
  <button>Submit</button>
</form>`}</Editor>
        <Browser url="http://localhost:3000/">
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
        </Browser>
      </div>
      <hr />
      <h2>Step 2: handle the form submission</h2>
      <div className="row row--3">
        <Editor>{`// File app.js
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

// ...`}</Editor>

        <Editor language="html">{`{{!-- File views/result.hbs --}}

You typed 2 values: 
<ul>
  <li>{{${values[5]}}}</li>
  <li>{{${values[6]}}}</li>
</ul>`}</Editor>

        <Browser
          url={
            method === "get"
              ? `http://localhost:3000/${values[0]}?${values[1]}=${values[3]}&${
                  values[2]
                }=${values[4]}`
              : `http://localhost:3000`
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
