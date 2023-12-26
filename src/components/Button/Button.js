"use client";

import React from "react";
import { CircularProgress, Button as MuiButton } from "@mui/material";
import styles from "./Button.module.scss";

const Button = React.forwardRef(
  ({ loading, className, text, ...rest }, ref) => {
    return (
      <>
        <MuiButton
          ref={ref}
          className={`${styles.button} ${className}`}
          {...rest}
        >
          {loading ? <CircularProgress size="24px" color="white" /> : text}
        </MuiButton>
      </>
    );
  }
);

export default Button;
