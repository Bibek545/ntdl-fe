import React, { useState } from "react";
import ChildA from "./ChildA";
import ChildB from "./ChildB";

const PropsVariable = () => {
  // var variable1 = 1;

  let [variable1, setVariable1] = useState(1);

  const handleOnClick = () => {
    const tempVar = variable1;
    setVariable1(tempVar + 1);
  };

  return (
    <div>
      Parent Component
      <button onClick={handleOnClick}>PRESS ME</button>
      <div style={{ display: "flex" }}>
        <ChildA variable1={variable1} hoc={handleOnClick} />
        <ChildB variable1={variable1} hoc={handleOnClick} />
      </div>
    </div>
  );
};

export default PropsVariable;
