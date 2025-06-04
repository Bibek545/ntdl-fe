import React from "react";

const ChildB = (props) => {
  return (
    <div>
      ChildB VALUE: {props.variable1}
      <button onClick={props.hoc}>PRESS ME</button>
    </div>
  );
};

export default ChildB;
