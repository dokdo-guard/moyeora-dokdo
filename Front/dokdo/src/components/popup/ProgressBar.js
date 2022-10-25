import React from "react";
const ProgressBar = (progress) => {
  return (
    <div>
      <div style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
