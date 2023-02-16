import React, { useEffect } from "react";
import { useState } from "react";

function Form({ data, submit, reset }) {
  let [header, options] = data;
  const [formData, setFormData] = useState({ [header]: [] });
  let targetObject = formData[header];

  function makeInputOptions(options) {
    return options.map((e) => (
      <option key={e} value={e}>
        {e}
      </option>
    ));
  }

  function handleChange(e) {
    if (!targetObject.includes(e.target.value)) {
      setFormData({ [header]: [...targetObject, e.target.value] });
    } else {
      setFormData({
        [header]: targetObject.filter((item) => item !== e.target.value),
      });
    }
  }

  useEffect(() => {
    submit(formData);
  }, [formData]);

  useEffect(() => {
    if (reset) {
      setFormData({ [header]: [] });
    }
  }, [reset]);

  return (
    <div className="selectListBox">
      <h3> {header} </h3>
      <div>
        <select
          name="selectList"
          value={targetObject}
          onChange={handleChange}
          multiple={true}
          children={makeInputOptions(options)}
        />
      </div>
    </div>
  );
}

export default Form;
