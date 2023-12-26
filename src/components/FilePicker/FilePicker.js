import React, { useState } from "react";
import styles from "./FilePicker.module.scss";
import { Typography } from "@mui/material";
import { SaveAlt } from "@mui/icons-material";

const FilePicker = React.forwardRef(
  ({ placeholder, error, errorMessage, onChange, ...rest }, ref) => {
    const [selectedFile, setSelectedFile] = useState(null);
    return (
      <>
        <label className={styles.container}>
          <input
            type="file"
            ref={ref}
            className={styles.file}
            onChange={(e) => {
              setSelectedFile(e.currentTarget.files[0]);
              onChange(e);
            }}
            {...rest}
          />
          <div className={styles.placeholder}>
            {selectedFile ? (
              <Typography>{selectedFile?.name}</Typography>
            ) : (
              <>
                <SaveAlt />
                {placeholder && <Typography>{placeholder}</Typography>}
              </>
            )}
          </div>
        </label>
        {error && (
          <Typography sx={{ mt: 1 }} color="error">
            {errorMessage}
          </Typography>
        )}
      </>
    );
  }
);

export default FilePicker;
