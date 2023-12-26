"use client";

import React from "react";
import { Box, IconButton } from "@mui/material";
import { AddCircleOutlineRounded, Logout } from "@mui/icons-material";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { deleteCookie } from "../../../../../utils/cookies.utils";

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };
  return (
    <Box className={styles.headerContainer}>
      <Box className={styles.content}>
        <h3>My movies</h3>
        <IconButton sx={{ mt: 0.5 }} onClick={() => router.push("/movie-form")}>
          <AddCircleOutlineRounded color="white" />
        </IconButton>
      </Box>
      <button
        className={`${styles.content} ${styles.rightContent}`}
        onClick={handleLogout}
      >
        <h6 className={styles.logoutText}>Logout</h6>
        <Logout color="white" />
      </button>
    </Box>
  );
};

export default Header;
