"use client";

import { Box, Grid, useTheme } from "@mui/material";
import React from "react";
import styles from "./MovieList.module.scss";
import { useRouter } from "next/navigation";

const MovieList = ({ movieList }) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box
      sx={{
        mt: 4,
        [theme.breakpoints.down("sm")]: {
          mt: 1,
        },
      }}
      className={styles.container}
    >
      {movieList &&
        !!movieList?.length &&
        movieList.map(({ _id, title, publishingYear, poster }, index) => (
          <Box
            className={styles.card}
            onClick={() => router.push(`/movie-form?id=${_id}`)}
          >
            <img src={poster} alt="Avatar" style={{ width: "100%" }} />
            <div className={styles.detailsContainer}>
              <h6>
                <b>{title}</b>
              </h6>
              <span>{publishingYear}</span>
            </div>
          </Box>
        ))}
    </Box>
  );
};

export default MovieList;
