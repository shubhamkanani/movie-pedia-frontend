"use client";

import React from "react";
import { Dialog, Modal as MuiModal } from "@mui/material";
import styles from "./Modal.module.scss";

const Modal = ({ open, onClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: styles.dialogContent,
      }}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
