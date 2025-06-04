import React, { useState } from "react";
import { idGeneratingFunction } from "../utils";

export const Form = ({ addFunc }) => {
  //get input field data as user types

  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addFunc({
      ...form,
      id: idGeneratingFunction(),
    });
  };

  return (
    <form onSubmit={handleOnSubmit} className="row shadow-lg p-5 rounded-pill">
      <div className="col-sm-6">
        <div className="mb-3">
          <input
            name="task"
            type="text"
            className="form-control"
            id="task"
            placeholder="ADD TASK"
            onChange={handleOnChange}
            required
          />
        </div>
      </div>

      <div className="col-sm-2">
        <div className="mb-3">
          <input
            name="hour"
            type="number"
            className="form-control"
            id="hour"
            placeholder="Hour"
            onChange={handleOnChange}
            required
          />
        </div>
      </div>

      <div className="col-sm-2">
        <select
          name="type"
          className="form-select bg-primary-subtle"
          aria-label="Default select example"
          id="type"
          onChange={handleOnChange}
          required
        >
          <option value="" selected>
            -- Select ---
          </option>
          <option value="good">Good</option>
          <option value="bad">Bad</option>
        </select>
      </div>

      <div className="col-sm-2">
        <button className="btn btn-primary">ADD TASK</button>
      </div>
    </form>
  );
};
