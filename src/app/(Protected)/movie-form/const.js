import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  publishingYear: Yup.number()
    .typeError("Publishing year must be a number")
    .required("Publishing year is required")
    .test(
      "len",
      "Publishing year must be exactly 4 digits",
      (val) => val && val.toString().length === 4
    ),
  image: Yup.mixed().required("Image is required"),
});
