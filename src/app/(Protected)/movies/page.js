"use client";

import { Box, CircularProgress, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header, MovieList } from "./components";
import { Button, Pagination } from "@/components";
import { getMovieList } from "@/services/movies.service";
import styles from "./movies.module.scss";
import { useRouter } from "next/navigation";

const rowsPerPage = 10;

const Movies = () => {
  const theme = useTheme();
  const router = useRouter();
  const [allMovies, setAllMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchMovieList();
  }, []);

  const fetchMovieList = async () => {
    setLoading(true);
    const result = await getMovieList();
    setLoading(false);
    setAllMovies(result?.data?.data);
    const startRecord = currentPage * rowsPerPage;
    setMovieList(
      result?.data?.data?.slice(startRecord, rowsPerPage + startRecord)
    );
    setTotalRecords(result?.data?.data?.length || 0);
  };
  if (!movieList?.length && !loading) {
    return (
      <Box className={styles.emptyListContainer}>
        <Box className={styles.container}>
          <h3>Your movie list is empty</h3>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              text="Add a new movie"
              variant="contained"
              onClick={() => router.push("/movie-form")}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  const handleChangePage = (page) => {
    debugger;
    setCurrentPage(Number(page - 1) || 0);
    const startRecord = (page - 1) * rowsPerPage;
    const data = allMovies.slice(startRecord, startRecord + rowsPerPage);
    setMovieList(data || []);
  };
  return (
    <Box
      sx={{
        mt: 10,
        px: 10,
        [theme.breakpoints.down("sm")]: {
          px: 2,
          mt: 3,
        },
      }}
    >
      <Header />
      {loading ? (
        <Box className={styles.loadingContainer}>
          <Box className={styles.loading}>
            <CircularProgress />
          </Box>
        </Box>
      ) : (
        <MovieList movieList={movieList || []} />
      )}
      <Box sx={{ my: 10, display: "flex", justifyContent: "center" }}>
        <Pagination
          currentPage={Number(currentPage) + 1}
          totalCount={Number(totalRecords) || 0}
          pageSize={rowsPerPage}
          onPageChange={(page) => handleChangePage(page)}
        />
      </Box>
    </Box>
  );
};

export default Movies;
