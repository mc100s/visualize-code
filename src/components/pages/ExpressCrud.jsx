import React, { useState } from "react";
import pluralize from "pluralize";
import Browser from "../Browser";
import Editor from "../Editor";

function ExpressCrud() {
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

  const [method, setMethod] = useState("get");

  let initialValues1 = [
    "index",
    "Country",
    "countrySchema",
    "name",
    "capital",
    "population",
    "String",
    "String",
    "Number",
    "countries",
    "countries",
    "countries",
    "countries",
    "country-detail",
    "seeds",
    "my-project",
    "France",
    "Paris",
    "67000000",
    "Germany",
    "Berlin",
    "83000000",
    "Portugal",
    "Lisbon",
    "10000000",
    "countryId",
    "country",
    "country-detail",
    "country",
    ""
  ];
  let initialValues2 = [];
  const [values, setValues] = useState(initialValues1);
  // When iValueSelected is equal to 42, then the values[42] is selected (red)
  const [iValueSelected, setIValueSelected] = useState(null);

  const collectionName = pluralize(values[1].toLocaleLowerCase());

  const defaultEditorProps = {
    values: values,
    iValueSelected: iValueSelected,
    onSelect: handleSelect,
    onChange: handleEditorChange
  };

  return (
    <div className="">
      <h1>Simple Express CRUD</h1>
      <h2>Setup</h2>
      <div className="row row--3">
        <Editor {...defaultEditorProps} fileName={`app.js`}>
          {`
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost/$15", { useNewUrlParser: true })
  .then(x => { console.log("Connected to the database '$15'"); })

// ...

app.use("/", require("./routes/$0.js"));

// ...

app.listen(3000, () => { console.log("Server running on port 3000") });
`}
        </Editor>

        <Editor {...defaultEditorProps} fileName={`models/$1.js`}>
          {`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const $2 = new Schema({
  $3: $6, ${addTypeWarning(values[6])}
  $4: $7, ${addTypeWarning(values[7])}
  $5: $8 ${addTypeWarning(values[8])}
});

const $1 = mongoose.model("$1", $2);
module.exports = $1;


// => Define a "${collectionName}" collection
`}
        </Editor>

        <Editor {...defaultEditorProps} fileName={`bin/$14.js`}>
          {`
// To execute this file, open the terminal and type:
// $ node bin/$14.js 
// => It will create or recreate the collection "${collectionName}" with 3 documents

const mongoose = require("mongoose");
const $1 = require("../models/$1");

mongoose
  .connect("mongodb://localhost/$15", { useNewUrlParser: true })
  .then(x => { console.log("Connected to the database '$15'"); })

let array = [
  { $3: "$16", $4: "$17", $5: ${values[8] !== "Number" ? '"' : ""}$18${
            values[8] !== "Number" ? '"' : ""
          } },
  { $3: "$19", $4: "$20", $5: ${values[8] !== "Number" ? '"' : ""}$21${
            values[8] !== "Number" ? '"' : ""
          } },
  { $3: "$22", $4: "$23", $5: ${values[8] !== "Number" ? '"' : ""}$24${
            values[8] !== "Number" ? '"' : ""
          } },
];

$1.deleteMany()
  .then(() => {
    return $1.create(array)
  })
  .then(createdDocuments => {
    console.log(createdDocuments.length + " documents have been created in the collection '${collectionName}'");
    mongoose.connection.close();
  })

`}
        </Editor>
      </div>
      <hr />
      <h2>Read: Get all {collectionName}</h2>
      <div className="row row--3">
        <Editor {...defaultEditorProps} fileName={`routes/$0.js`}>
          {`
const express = require("express");
const $1 = require("../models/$1");

const router = express.Router();

// ...

router.get("/$11", (req, res, next) => {
  $1.find()
    .then($9 => {
      res.render("$12", {
        $10: $9
      });
    });
});

// ...

module.exports = router;
`}
        </Editor>
        <Editor {...defaultEditorProps} fileName={`views/$12.hbs`}>
          {`
<h3>List</h3>
<ul>
  {{#each $10}}
  <li>
    <a href="/$13/{{this._id}}">{{this.$3}}</a>
  </li>
  {{/each}}
</ul>
`}
        </Editor>
        <Browser url={`http://localhost:3000/${values[11]}`}>
          <h3>List</h3>
          <ul>
            <li>
              <a
                onClick={e => e.preventDefault()}
                href="/$13/52cdef7e4bab8bd67529bd00"
              >
                {values[16]}
              </a>
            </li>
            <li>
              <a
                onClick={e => e.preventDefault()}
                href="/$13/52cdef7e4bab8bd67529bd01"
              >
                {values[19]}
              </a>
            </li>
            <li>
              <a
                onClick={e => e.preventDefault()}
                href="/$13/52cdef7e4bab8bd67529bd01"
              >
                {values[22]}
              </a>
            </li>
          </ul>
        </Browser>
      </div>
      <hr />
      <h2>Read: Get one {values[1].toLocaleLowerCase()}</h2>
      <div className="row row--3">
        <Editor {...defaultEditorProps} fileName={`routes/$0.js`}>
          {`
const express = require("express");
const $1 = require("../models/$1");

const router = express.Router();

// ...

router.get("/$13/:$25", (req, res, next) => {
  $1.findById(req.params.$25)
    .then($26 => {
      res.render("$27", {
        $28: $26
      });
    });
});

// ...

module.exports = router;
`}
        </Editor>
        <Editor {...defaultEditorProps} fileName={`views/$27.hbs`}>
          {`
<h3>Detail</h3>
- {{this.$3}} <br />
- {{this.$4}} <br />
- {{this.$5}} <br />
`}
        </Editor>
        <Browser url={`http://localhost:3000/${values[13]}/52cdef7e4bab8bd67529bd00`}>
          <h3>Detail</h3>
          - {values[16]} <br/>
          - {values[17]} <br/>
          - {values[18]} <br/>
        </Browser>
      </div>
      <br />
      <br />
      <br />
      <br />
      {/* <ul>
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
      </ul> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ExpressCrud;
