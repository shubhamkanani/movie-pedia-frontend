import React from "react";
import styles from "./TextInput.module.scss";
import { Typography } from "@mui/material";

const TextInput = React.forwardRef(
  ({ error, errorMessage, fullWidth, className, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={`${styles.input} ${
            fullWidth && styles.fullWidth
          } ${className}`}
          {...rest}
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
      </>
    );
  }
);

export default TextInput;
