import React, { useState } from "react";
import { useSelector } from "react-redux";

export const Display = ({
  // taskList,
  // badHour,
  handleOnDelete,
  handleOnSwap,
}) => {
  const { taskList , badHour} = useSelector((store) => store.taskStore);

  let goodList = taskList.filter((item) => item.type == "good");
  let badList = taskList.filter((item) => item.type == "bad");
  return (
    <div className="row p-5">
      {/* <!-- good column --> */}
      <div className="col-md">
        {/* <!-- heading row --> */}
        <div className="row">
          <div className="col text-center">
            <h3>GOOD LIST</h3>
            <hr />
          </div>
        </div>

        {/* <!-- task row --> */}
        <div className="row">
          <div className="col">
            <table className="table">
              <tbody id="goodList">
                {goodList.map((task, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{task.task}</td>
                    <td>{task.hour} Hr</td>
                    <td class="text-end">
                      <button
                        class="btn btn-danger"
                        onClick={() => handleOnDelete(task.id)}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>

                      <button
                        class="btn btn-success"
                        onClick={() => {
                          handleOnSwap(task.id);
                        }}
                      >
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <!-- bad column --> */}
      <div className="col-md">
        {/* <!-- heading row --> */}
        <div className="row">
          <div className="col text-center">
            <h3>Bad LIST</h3>
            <hr />
          </div>
        </div>

        {/* <!-- task row --> */}
        <div className="row">
          <div className="col">
            <table className="table">
              <tbody id="badList">
                {badList.map((task, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{task.task}</td>
                    <td>{task.hour} Hr</td>
                    <td class="text-end">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          handleOnSwap(task.id);
                        }}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleOnDelete(task.id);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="alert alert-danger" role="alert">
              You could have saved = {badHour} hrs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
