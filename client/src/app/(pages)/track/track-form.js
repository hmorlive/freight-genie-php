"use client";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function TrackForm( { fetchQuote, error }) {
  // formik form state
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      fetchQuote(values.email)
    },
  });

  return (
    <section className="w-full min-h-[70vh]  flex flex-col items center justify-center relative bg-black">
    <div className="absolute bg-truck h-full bg-cover bg-no-repeat blur w-full"></div>
    <div className="absolute bg-zinc-950 bg-opacity-70 h-full w-full"></div>
    <div className="w-fit m-auto text-white p-4">
      <h1 className="mb-2 relative text-white">
        <span className="text-orange-600">Find</span> and{" "}
        <span className="text-sky-600">Track</span> Your Quotes
      </h1>
    <form
      onSubmit={formik.handleSubmit}
      className="relative z-10 text-white w-ful lg:w-fit m-auto items-start flex flex-col"
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
      {error && <span className="bg-red-700 w-fit rounded-md p-1 border border-red-600 text-xs font-semibold mt-3"><FontAwesomeIcon icon={faInfoCircle} className="mr-2" />No quotes found for this email</span>}
    </form>
    </div>
  </section>
  );
}
