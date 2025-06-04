import React from "react";
import ChildC from "./ChildC";

const ChildA = (props) => {
  return (
    <div>
      ChildA VALUE : {props.variable1}
      <button onClick={props.hoc}>PRESS ME</button>
      <ChildC variable1={props.variable1} hoc={props.hoc} />
    </div>
  );
};

export default ChildA;
