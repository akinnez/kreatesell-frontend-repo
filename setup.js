import React from "react";

// Jest.setup.js
// import '@testing-library/jest-dom'

jest.mock("next/image", () => ({
  __esModule: true,
  default: () => {
    function Image(props) {
      //eslint-disable-next-line @next/next/no-img-element
      return <img src="[jest.find('../utils')]" {...props} />;
    }
    return Image();
  },
}));

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>;
    },
  };
});
