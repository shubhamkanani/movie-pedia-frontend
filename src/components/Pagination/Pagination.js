"use client";

import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";
import { Box, IconButton } from "@mui/material";
import { DOTS, usePagination } from "./usePagination";

// <Box className={styles.container}>
//   <IconButton>
//     <p className={styles.prevNext}>Prev</p>
//   </IconButton>
//   <IconButton>
//     <p className={styles.number}>1</p>
//   </IconButton>
//   <IconButton>
//     <p className={styles.number}>2</p>
//   </IconButton>
//   <IconButton>
//     <p className={styles.prevNext}>Next</p>
//   </IconButton>
// </Box>

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (paginationRange) {
    if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
      return null;
    }
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <ul className={styles.paginationContainer}>
      <IconButton disabled={currentPage === 1} onClick={onPrevious}>
        <p className={styles.prevNext}>Prev</p>
      </IconButton>
      {paginationRange &&
        paginationRange?.length > 0 &&
        paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={index}
                className={`${styles.dots} ${styles.paginationItem}`}
              >
                &#8230;
              </li>
            );
          }

          return (
            // <li
            //   key={index}
            //   className={
            //     (styles.paginationItem,
            //     {
            //       selected: pageNumber === currentPage,
            //     })
            //   }
            //   onClick={() => onPageChange(pageNumber)}
            // >
            //   {pageNumber}
            // </li>
            <IconButton key={index} onClick={() => onPageChange(pageNumber)}>
              <p
                className={`${styles.number} ${
                  pageNumber === currentPage && styles.selected
                }`}
              >
                {pageNumber}
              </p>
            </IconButton>
          );
        })}
      <IconButton disabled={currentPage === lastPage} onClick={onNext}>
        <p className={styles.prevNext}>Next</p>
      </IconButton>
    </ul>
  );
};

export default Pagination;
