"use client";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function TrackForm() {
  // formik form state
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative z-10 text-white w-fit m-auto items-start flex flex-col"
    >
      <div className="flex w-full gap-2 items-center justify-center flex-col lg:flex-row">
        <label className="w-full">
          email
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className={`email w-full ${
              formik.errors.email && formik.touched.email ? "error" : ""
            }`}
          />
        </label>
        <button type="submit" className="btn-orange mt-auto lg:min-w-fit">
          Find My Quotes
        </button>
      </div>
    </form>
  );
}
