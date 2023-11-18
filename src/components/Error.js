import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const errorInfo = useRouteError();
  return (
    <div>
      <h1>Oooppppsss!!!!!!</h1>
      <h2>Something went wrong </h2>
      <h3>
        {errorInfo.status}: {errorInfo.statusText}
      </h3>
    </div>
  );
};

export default Error;
