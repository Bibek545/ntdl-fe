import React from "react";

const ChildC = (props) => {
  return (
    <div>
      ChildC VALUE: {props.variable1}
      <button onClick={props.hoc}>PRESS ME</button>
    </div>
  );
};

export default ChildC;
