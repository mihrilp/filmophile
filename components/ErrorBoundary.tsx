import React from "react";

function ErrorBoundary({ code, message }: KnownError) {
  return (
    <div className="errContainer">
      <p className="errContainer__code">{code} Error </p>
      <p className="errContainer__title">Sorry! Something went wrong.</p>
      <p className="errContainer__message">{message} </p>
    </div>
  );
}

export default ErrorBoundary;
