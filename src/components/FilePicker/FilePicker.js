"use client";

import React, { useEffect, useState } from "react";
import styles from "./FilePicker.module.scss";
import { IconButton, Typography } from "@mui/material";
import { Delete, SaveAlt } from "@mui/icons-material";

const FilePicker = React.forwardRef(
  (
    {
      selectedFile,
      setSelectedFile,
      placeholder,
      error,
      errorMessage,
      onChange,
      handleRemoveImage,
      ...rest
    },
    ref
  ) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
      if (selectedFile) {
        setImageUrl(URL.createObjectURL(selectedFile));
      } else {
        setImageUrl("");
      }
    }, [selectedFile]);

    return (
      <>
        {!selectedFile ? (
          <>
            <label className={styles.container}>
              {!selectedFile && !imageUrl && (
                <>
                  <input
                    type="file"
                    ref={ref}
                    className={styles.file}
                    onChange={onChange}
                    {...rest}
                  />
                  <div className={styles.placeholder}>
                    <>
                      <SaveAlt />
                      {placeholder && <Typography>{placeholder}</Typography>}
                    </>
                  </div>
                </>
              )}
            </label>
            {error && (
              <Typography sx={{ mt: 1 }} color="error">
                {errorMessage}
              </Typography>
            )}
          </>
        ) : (
          <div className={styles.imageContainer}>
            {imageUrl && <img src={imageUrl} className={styles.imagePreview} />}
            {imageUrl && selectedFile && (
              <IconButton
                className={styles.deleteContainer}
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemoveImage();
                }}
              >
                <Delete color="error" />
              </IconButton>
            )}
          </div>
        )}
      </>
    );
  }
);

export default FilePicker;
