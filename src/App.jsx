import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import Form from "./components/dropdown";

let inputs = {
  "Cell Types": ["C_1001", "C_1002", "Pr_2003", "Pr_2005"],
  "Fill Amount": ["20", "30", "40", "50"],
  Pressure: ["50", "100"],
  "Resting Schedule": ["5", "6", "10"],
  "Formation Protocol": ["FM_P1", "FM_P2", "FM_P3"],
};

function combinations(variants) {
  return (function recurse(keys) {
    if (!keys.length) return [{}];
    let result = recurse(keys.slice(1));
    return variants[keys[0]].reduce(
      (acc, value) =>
        acc.concat(
          result.map((item) => Object.assign({}, item, { [keys[0]]: value }))
        ),
      []
    );
  })(Object.keys(variants));
}

function App() {
  const [formData, setFormData] = useState({
    "Cell Types": [],
    "Fill Amount": [],
    Pressure: [],
    "Resting Schedule": [],
    "Formation Protocol": [],
  });
  const [pairData, setPairData] = useState([]);
  const [reset, setReset] = useState(false);

  function createPairs() {
    setReset(false);
    setPairData([...pairData, ...combinations(formData)]);
  }
  function resetForms() {
    setReset(true);
    // setPairData([]);
  }
  function resetList() {
    setPairData([]);
  }

  function getFormData(e) {
    let key = Object.keys(e)[0];
    let vals = Object.values(e)[0];
    setFormData({ ...formData, [key]: vals });
  }

  useEffect(() => {
    console.log("pair data", pairData);
  }, [pairData]);

  return (
    <div className="App">
      <h2> Requests</h2>
      <div className="outer">
        <div className="innerRow">
          {Object.entries(inputs).map((e) => (
            <Form key={e} data={e} reset={reset} submit={getFormData} />
          ))}
        </div>
        <div className="controls">
          <button onClick={createPairs}> Create Pairs </button>
          <button onClick={resetForms}> Reset </button>
        </div>
      </div>

      <div>
        <div className="outputTable">
          <h2> Output </h2>
          <table>
            <thead>
              <tr>
                <th scope="col"> # </th>
                <th scope="col"> Cell Types </th>
                <th scope="col"> Fill Amount </th>
                <th scope="col"> Pressure </th>
                <th scope="col"> Resting Schedule </th>
                <th scope="col"> Formation Protocol </th>
              </tr>
            </thead>

            <tbody>
              {pairData.map((item, index) => (
                <tr>
                  <td> {index + 1}</td>
                  <td> {item["Cell Types"]}</td>
                  <td> {item["Fill Amount"]}</td>
                  <td> {item["Pressure"]}</td>
                  <td> {item["Resting Schedule"]}</td>
                  <td> {item["Formation Protocol"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="resetList" onClick={resetList}>
            {" "}
            Reset Table{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
