"use client";

import React from "react";
import styles from "./login.module.scss";
import { Button, TextInput } from "../../components";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../services/login";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setCookie } from "../../utils/cookies.utils";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (values, { setSubmitting }) => {
    const { rememberMe } = values;
    const res = await login({
      ...values,
    });
    setSubmitting(false);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      setCookie("token", `Bearer ${res?.data?.token}`);
      if (rememberMe) {
        localStorage.setItem("token", `Bearer ${res?.data?.token}`);
      } else {
        localStorage.clear();
      }
      router.push("/movies");
    } else {
      toast.error(res?.data?.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.center}>Sign in</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <Grid
                container
                sx={{ mt: 4 }}
                rowGap={3}
                justifyContent={"center"}
              >
                <Grid item xs={12}>
                  <TextInput
                    fullWidth
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email}
                    errorMessage={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    fullWidth
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={errors.password && touched.password}
                    errorMessage={errors.password}
                  />
                </Grid>
                <Grid item xs={12} className={styles.rememberMe}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disableRipple
                        sx={{
                          "&:hover": { bgcolor: "transparent" },
                        }}
                      />
                    }
                    label="Remember me"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    text="Login"
                    variant="contained"
                    loading={isSubmitting}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
