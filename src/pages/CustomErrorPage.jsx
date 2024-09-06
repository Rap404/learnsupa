import React from "react";
import { useRouteError } from "react-router-dom";

const CustomErrorPage = () => {
  const error = useRouteError();
  // console.error(error);
  return (
    <div>
      <h1>Oops!</h1>
      <p>sorry, an unecpected error has occured.</p>
      <p>
        <i>{error?.statusText || error?.message || "Unknown error"}</i>
      </p>
    </div>
  );
};

export default CustomErrorPage;
