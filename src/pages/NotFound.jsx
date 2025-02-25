import React from "react";
import NotFoundImage from "../assets/pnf.jpg";

export const NotFound = () => {
  return (
    <div>
      <img src={NotFoundImage} alt="Not Found" />
      <p>Please select another movie</p>
    </div>
  );
};
