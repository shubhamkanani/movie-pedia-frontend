"use client";

import React, { useState } from "react";
import { Button, Modal } from "../../../../../components";
import styles from "./MoviePreview.module.scss";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { deleteMovie } from "../../../../../services/movies.service";
import { toast } from "react-toastify";

const MoviePreview = ({ open, onClose, selectedMovie, fetchMovieList }) => {
  const isTablet = window.matchMedia("(max-width: 780px)")?.matches;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDeleteMovie = async () => {
    setLoading(true);
    const res = await deleteMovie(selectedMovie?._id);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      onClose();
      if (fetchMovieList) {
        fetchMovieList();
      }
    } else {
      toast.error(res?.data?.message);
    }
  };
  const getButtons = () => (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Button
          fullWidth
          loading={loading}
          color="error"
          variant="contained"
          text="Delete"
          onClick={handleDeleteMovie}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          text="Edit"
          onClick={() => router.push(`/movie-form?id=${selectedMovie?._id}`)}
        />
      </Grid>
    </Grid>
  );
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.closeIconContainer}>
          <Close color="white" onClick={onClose} />
        </div>
        <div className={styles.contentContainer}>
          {isTablet && getButtons()}
          <div className={styles.leftContainer}>
            <img className={styles.image} src={selectedMovie?.poster} />
          </div>
          <div className={styles.rightContainer}>
            {isTablet ? (
              <>
                <div>
                  <h3 className={styles.title}>
                    {selectedMovie?.title}
                    <span className={styles.publishingYear}>
                      {selectedMovie?.publishingYear}
                    </span>
                  </h3>
                </div>
              </>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h3 className={styles.title}>{selectedMovie?.title}</h3>
                </Grid>
                <Grid item xs={12}>
                  <p className={styles.publishingYear}>
                    {selectedMovie?.publishingYear}
                  </p>
                </Grid>
              </Grid>
            )}
            {!isTablet && getButtons()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MoviePreview;
