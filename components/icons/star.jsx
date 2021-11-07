import * as React from "react";

function SvgStar(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="#cb9e0c"
      width="20"
      {...props}
    >
      <path d="M256 403.4L414 499l-42.2-179.8L512 198.5l-183.9-16.2L256 13l-72.1 169.3L0 198.5l140.2 120.7L98 499z" />
    </svg>
  );
}

export default SvgStar;
