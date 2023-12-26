"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Header, MovieList } from "./components";
import { Button, Pagination, TextInput, Select } from "../../../components";
import { getMovieList } from "../../../services/movies.service";
import { useRouter } from "next/navigation";
import { Search } from "@mui/icons-material";

import styles from "./movies.module.scss";

const rowsPerPage = 10;

const Movies = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [recordCount, setRecordCount] = useState(0);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    fetchMovieList(currentPage);
  }, []);

  const fetchMovieList = async (newPage) => {
    setLoading(true);
    const payload = {
      name: searchTerm,
      publishingYear: selectedItem,
      page: newPage,
      limit: rowsPerPage,
    };
    const result = await getMovieList(payload);
    setLoading(false);
    setMovieList(result?.data?.data);
    setTotalRecords(result?.data?.totalCount);
    setRecordCount(result?.data?.recordCount);
  };

  if (!movieList?.length && !loading && !recordCount) {
    // debugger;
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
    setCurrentPage(page);
    fetchMovieList(page);
  };

  return (
    <Box
      sx={{
        mt: 10,
        px: 15,
        [theme.breakpoints.down("sm")]: {
          px: 2,
          mt: 3,
        },
      }}
      className={styles.container}
    >
      <Header />

      <Box
        sx={{
          mt: 10,
          [theme.breakpoints.down("sm")]: {
            mt: 1,
          },
        }}
      >
        <Grid container>
          <Grid item lg={6} xs={9}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextInput
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            xs={3}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {isSm ? (
              <Box className={styles.searchIcon}>
                <Search onClick={() => fetchMovieList(1)} />
              </Box>
            ) : (
              <Button
                sx={{ ml: 1 }}
                variant="contained"
                startIcon={<Search />}
                text="Search"
                onClick={() => fetchMovieList(1)}
              />
            )}
          </Grid>
        </Grid>
        {loading ? (
          <Box className={styles.loadingContainer}>
            <Box className={styles.loading}>
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <MovieList
            movieList={movieList || []}
            fetchMovieList={() => fetchMovieList(currentPage)}
          />
        )}
      </Box>
      <Box sx={{ my: 10, display: "flex", justifyContent: "center" }}>
        <Pagination
          currentPage={Number(currentPage)}
          totalCount={Number(totalRecords) || 0}
          pageSize={rowsPerPage}
          onPageChange={(page) => handleChangePage(page)}
        />
      </Box>
    </Box>
  );
};

export default Movies;
