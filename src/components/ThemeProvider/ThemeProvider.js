"use client";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const MyThemeProvider = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2BD17E",
      },
      background: {
        main: "#093545",
      },
      success: {
        main: "#2BD17E",
      },
      error: {
        main: "#EB5757",
      },
      white: {
        main: "#fff",
      },
    },
    breakpoints: {
      st: "720px",
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MyThemeProvider;
