"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import styles from "./MovieList.module.scss";
import { MoviePreview } from "../MoviePreview";

const MovieList = ({ movieList, fetchMovieList }) => {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <Box sx={{ mt: 2 }} className={styles.container}>
      {movieList &&
        !!movieList?.length &&
        movieList.map((movie, index) => {
          const { title, publishingYear, poster } = movie;
          return (
            <Box
              className={styles.card}
              onClick={() => {
                setSelectedMovie(movie);
                setOpen(true);
              }}
              title={title}
              key={index}
            >
              <img src={poster} alt="Avatar" style={{ width: "100%" }} />
              <div className={styles.detailsContainer}>
                <p className={styles.title}>{title}</p>
                <span className={styles.publishingYear}>{publishingYear}</span>
              </div>
            </Box>
          );
        })}
      <MoviePreview
        open={open && selectedMovie}
        onClose={() => setOpen(false)}
        selectedMovie={selectedMovie}
        fetchMovieList={fetchMovieList}
      />
    </Box>
  );
};

export default MovieList;
