import React, { useState } from "react";
import pluralize from "pluralize";
import dashify from "dashify";
import Browser from "../Browser";
import Editor from "../Editor";
import Hoverable from "../Hoverable";

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
    "add-country",
    "add-country",
    "add-country",
    "name",
    "capital",
    "population",
    "createdCountry",
    "edit-country",
    "delete-country",
    "edit-country",
    "edit-country",
    "country",
    "countryId",
    "country",
    "countryId",
    "name",
    "capital",
    "population",
    "createdCountry",
    "countryId",
    "countryDeleted",
    "",
    "",
    ""
  ];
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
      <p>
        This is an example of a simple Express app doing CRUD operations on 1
        model named "{values[1]}".
      </p>
      <p>Feel free to change the name of the variables and see .</p>
      <p>Technologies used:</p>
      <ul>
        <li>Express</li>
        <li>MongoDB</li>
        <li>Mongooose</li>
        <li>Handlebars</li>
      </ul>
      <p>
        If you want a quick tool to generate CRUD operations for your, you can
        modify the following values:
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Model name (should be capitalized and singular)</td>
            <td>
              <input
                type="text"
                value={values[1]}
                onChange={quickChangeForModel}
              />
            </td>
          </tr>
          <tr>
            <td>Database name</td>
            <td>
              <input
                type="text"
                value={values[15]}
                onChange={e => quickChangeForValue(15, e)}
              />
            </td>
          </tr>
          <tr>
            <td>Field 1</td>
            <td>
              <input
                type="text"
                value={values[3]}
                onChange={e => quickChangeForField(1, e)}
              />
            </td>
          </tr>
          <tr>
            <td>Field 2</td>
            <td>
              <input
                type="text"
                value={values[4]}
                onChange={e => quickChangeForField(2, e)}
              />
            </td>
          </tr>
          <tr>
            <td>Field 3</td>
            <td>
              <input
                type="text"
                value={values[5]}
                onChange={e => quickChangeForField(3, e)}
              />
            </td>
          </tr>
          <tr>
            <td>Type field 1</td>
            <td>
              <input
                type="text"
                value={values[6]}
                onChange={e => quickChangeForValue(6, e)}
              />
            </td>
          </tr>
          <tr>
            <td>Type field 2</td>
            <td>
              <input
                type="text"
                value={values[7]}
                onChange={e => quickChangeForValue(7, e)}
              />
            </td>
          </tr>
          <tr>
            <td>Type field 3</td>
            <td>
              <input
                type="text"
                value={values[8]}
                onChange={e => quickChangeForValue(8, e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h2>Setup</h2>
      <div className="row row--3">
        <Editor {...defaultEditorProps} fileName={`app.js`}>
          {`
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

mongoose
  .connect("mongodb://localhost/$15", { useNewUrlParser: true })
  .then(x => { console.log("Connected to the database '$15'"); })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

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

<a href="/$29">Add a new item</a>
`}
        </Editor>
        <Browser url={`http://localhost:3000/${values[11]}`}>
          <h3>List</h3>
          <ul>
            {[0, 1, 2].map(n => (
              <li key={n}>
                <Hoverable
                  hoverTextAfterClick={
                    "Redirect to http://localhost:3000/" +
                    values[13 + n * 3] +
                    "/52cdef7e4bab8bd67529bd0" +
                    n
                  }
                >
                  <button className="link-button">{values[16 + n * 3]}</button>
                </Hoverable>
              </li>
            ))}
          </ul>
          <Hoverable
            hoverTextAfterClick={
              "Redirect to http://localhost:3000/" + values[29]
            }
          >
            <button className="link-button">Add a new item</button>
          </Hoverable>
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

- {{$28.$3}} <br />
- {{$28.$4}} <br />
- {{$28.$5}} <br />
<br />

<a href="/$36/{{$28._id}}">Edit item</a><br />
<a href="/$37/{{$28._id}}">Delete item</a>

`}
        </Editor>
        <Browser
          url={`http://localhost:3000/${values[13]}/52cdef7e4bab8bd67529bd00`}
        >
          <h3>Detail</h3>- {values[16]} <br />- {values[17]} <br />-{" "}
          {values[18]} <br />
          <br />
          <Hoverable
            hoverTextAfterClick={`Redirect to http://localhost:3000/${
              values[36]
            }/52cdef7e4bab8bd67529bd00`}
          >
            <button className="link-button">Edit item</button>
          </Hoverable>
          <br />
          <Hoverable
            hoverTextAfterClick={`Delete the item and redirect to http://localhost:3000/${
              values[12]
            }`}
          >
            <button className="link-button">Delete item</button>
          </Hoverable>
        </Browser>
      </div>
      <hr />
      <h2>Create: Add one {values[1].toLocaleLowerCase()}</h2>
      <div className="row row--3">
        <Editor {...defaultEditorProps} fileName={`routes/$0.js`}>
          {`
const express = require("express");
const $1 = require("../models/$1");

const router = express.Router();

// ...

// Route to display a form
router.get("/$29", (req, res, next) => {
  res.render("$30");
});

// Route to handle the form
router.post("/$31", (req, res, next) => {
  $1.create({
    $3: req.body.$32,
    $4: req.body.$33,
    $5: req.body.$34,
  })
    .then($35 => {
      // Redirect to the detail page of the item
      res.redirect("/$13/" + $35._id);
    });
});

// ...

module.exports = router;
`}
        </Editor>
        <Editor {...defaultEditorProps} fileName={`views/$30.hbs`}>
          {`
<h3>Add a new item</h3>

<form action="/$31" method="post">
  <input type="text" name="$32"><br>
  <input type="text" name="$33"><br>
  <input type="text" name="$34"><br>
  <button>Add</button>
</form>
`}
        </Editor>
        <Browser url={`http://localhost:3000/${values[29]}`}>
          <h3>Add a new item</h3>

          <input type="text" />
          <br />
          <input type="text" />
          <br />
          <input type="text" />
          <br />
          <Hoverable
            hoverTextAfterClick={`Add the item and go to its detail page`}
          >
            <button>Add</button>
          </Hoverable>
        </Browser>
      </div>
      <hr />
      <h2>Update: Edit one {values[1].toLocaleLowerCase()}</h2>
      <div className="row row--3">
        <Editor {...defaultEditorProps} fileName={`routes/$0.js`}>
          {`
const express = require("express");
const $1 = require("../models/$1");

const router = express.Router();

// ...

// Route to display a form
router.get("/$36/:$41", (req, res, next) => {
  $1.findById(req.params.$41)
    .then($42 => {
      res.render("$38", { 
        $40: $42
      });
    })
});

// Route to handle the form
router.post("/$39/:$43", (req, res, next) => {
  $1.findByIdAndUpdate(req.params.$43, {
    $3: req.body.$44,
    $4: req.body.$45,
    $5: req.body.$46,
  })
    .then($47 => {
      // Redirect to the detail page of the item
      res.redirect("/$13/" + $47._id);
    });
});

// ...

module.exports = router;
`}
        </Editor>
        <Editor {...defaultEditorProps} fileName={`views/$38.hbs`}>
          {`
<h3>Edit the item</h3>

<form action="/$39/{{$40._id}}" method="post">
  <input type="text" name="$44" value="{{$40.$3}}"><br>
  <input type="text" name="$45" value="{{$40.$4}}"><br>
  <input type="text" name="$46" value="{{$40.$5}}"><br>
  <button>Edit</button>
</form>
`}
        </Editor>
        <Browser
          url={`http://localhost:3000/${values[36]}/52cdef7e4bab8bd67529bd00`}
        >
          <h3>Edit the item</h3>

          <input type="text" readOnly value={values[16]} />
          <br />
          <input type="text" readOnly value={values[17]} />
          <br />
          <input type="text" readOnly value={values[18]} />
          <br />
          <Hoverable
            hoverTextAfterClick={`Edit the item and go to its detail page`}
          >
            <button>Edit</button>
          </Hoverable>
        </Browser>
      </div>
      <hr />
      <h2>Delete: Remove one {values[1].toLocaleLowerCase()}</h2>
      <div className="row row--3">
        <Editor {...defaultEditorProps} fileName={`routes/$0.js`}>
          {`
const express = require("express");
const $1 = require("../models/$1");

const router = express.Router();

// ...

router.get("/$37/:$48", (req, res, next) => {
  $1.findByIdAndDelete(req.params.$48)
    .then($49 => {
      // Redirect to the list after deleting
      res.redirect("/$11");
    })
});

// ...

module.exports = router;
`}
        </Editor>
      </div>
      <hr />
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
    </div>
  );
}

export default ExpressCrud;
