"use client";

import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Box, Grid, useTheme } from "@mui/material";
import styles from "./MovieForm.module.scss";
import { Button, FilePicker, TextInput } from "../../../components";
import { useFormik } from "formik";
import {
  addMovie,
  getMovieById,
  updateMovie,
} from "../../../services/movies.service";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { validationSchema } from "./const";

const MovieForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formValues, setFormValues] = useState({
    title: "",
    publishingYear: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      return router.push("/login");
    }
  }, []);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      fetchMovieById(id);
    }
  }, [searchParams]);

  const fetchMovieById = useCallback(async (id) => {
    setLoading(true);
    const res = await getMovieById(id);
    setLoading(false);
    if (res?.status !== 200) {
      toast.error(res?.data?.message);
      return;
    }
    setFormValues({
      title: res?.data?.movie?.title,
      publishingYear: res?.data?.movie?.publishingYear,
      image: res?.data?.movie?.poster,
    });
  }, []);

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setFieldValue("title", formValues?.title);
    formik.setFieldValue("publishingYear", formValues?.publishingYear);
    const base64String = formValues?.image;
    if (base64String) {
      const base64WithoutHeader = base64String.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );
      const blob = new Blob([Buffer.from(base64WithoutHeader, "base64")], {
        type: "image/jpeg",
      });
      const file = new File([blob], "image.png", { type: "image/png" });
      if (file) {
        setSelectedFile(file);
        formik.setFieldValue("image", file);
      }
    }
  }, [formValues]);

  function handleSubmit(values, { setSubmitting }) {
    setLoading(true);
    const { title, publishingYear, image } = values;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishingYear", publishingYear);
    formData.append("file", image);

    const id = searchParams.get("id");
    if (id) {
      handleUpdateMovie(id, values);
      return;
    }

    addMovie(formData)
      .then((res) => {
        setLoading(false);
        if (res?.status === 201) {
          toast.success(res?.data?.message);
          router.push("/movies");
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        toast.error("An error occurred.");
        setLoading(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const handleUpdateMovie = async (id, values) => {
    setLoading(true);
    const { title, publishingYear, image } = values;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishingYear", publishingYear);
    formData.append("file", image);
    const res = await updateMovie(id, formData);
    setLoading(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      router.push("/movies");
    } else {
      toast.error(res?.data?.message);
    }
  };

  const handleClear = () => {
    router.push("/movies");
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
    >
      <Box className={styles.header}>
        {id ? <h3>Edit</h3> : <h3>Create a new movie</h3>}
      </Box>
      <Box
        sx={{
          mt: 10,
          [theme.breakpoints.down("sm")]: {
            mt: 1,
          },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box className={styles.form}>
            <Box className={styles.leftContent}>
              <FilePicker
                name="image"
                accept="image/*"
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                onChange={(event) => {
                  setSelectedFile(event?.currentTarget?.files[0]);
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
                handleRemoveImage={() => {
                  setSelectedFile(null);
                  formik.setFieldValue("image", null);
                }}
                placeholder="Drop an image here"
                error={formik.errors.image && formik.touched.image}
                errorMessage={formik.errors.image}
              />
            </Box>
            <Box className={styles.rightContent}>
              <Box>
                <TextInput
                  name="title"
                  placeholder="Title"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  error={formik.errors.title && formik.touched.title}
                  errorMessage={formik.errors.title}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextInput
                  name="publishingYear"
                  placeholder="Publishing year"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.publishingYear}
                  error={
                    formik.errors.publishingYear &&
                    formik.touched.publishingYear
                  }
                  errorMessage={formik.errors.publishingYear}
                />
              </Box>
              <Box sx={{ mt: 5 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box>
                      <Button
                        text="Cancel"
                        variant="outlined"
                        fullWidth
                        onClick={handleClear}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Button
                        type="submit"
                        text={id ? "Update" : "Submit"}
                        variant="contained"
                        loading={loading}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default MovieForm;
