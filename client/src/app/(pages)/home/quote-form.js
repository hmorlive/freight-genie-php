"use client";
import { submitQuoteRequest } from "@/app/api-calls";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function QuoteForm() {
  // get the current date
  const formatDate = (date) => {
    const d = new Date(date);  
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  

  // set the freight and goods options
  const freightOptions = [
    { value: "ftl", label: "Full Truckload (FTL)" },
    { value: "ltl", label: "Less Than Truckload (LTL)" },
    { value: "partial", label: "Partial Truckload" },
    { value: "intermodal", label: "Intermodal" },
  ];
  const goodsOptions = [
    { value: "general", label: "General Merchandise" },
    { value: "perishable", label: "Perishable Goods" },
    { value: "hazardous", label: "Hazardous Materials" },
    { value: "fragile", label: "Fragile Items" },
    { value: "oversized", label: "Oversized Loads" },
  ];

  // formik form state
  const formik = useFormik({
    initialValues: {
      email: "",
      freightType: "",
      goodsType: "",
      from: "",
      to: "",
      shippingDate: formatDate(new Date()),
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      freightType: Yup.string()
        .oneOf(freightOptions.map((option) => option.value))
        .required("Required"),
      goodsType: Yup.string()
        .oneOf(goodsOptions.map((option) => option.value))
        .required("Required"),
      from: Yup.string().length(5, "Invalid zip code").required("Required"),
      to: Yup.string().length(5, "Invalid zip code").required("Required"),
      shippingDate: Yup.date().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await submitQuoteRequest(values);
        console.log(response);
      } catch (error) {
        
      }
    },
  });


  return (
    <section className="relative w-full flex flex-col items-center justify-center min-h-[60vh] py-10 bg-black text-white">
      <div className="absolute bg-hero h-full bg-cover bg-no-repeat blur w-full"></div>
      <div className="absolute bg-black bg-opacity-70 h-full w-full"></div>
      <form
        className="bg-transparent relative z-10 flex gap-2 flex-col"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-4xl font-semibold text-orange-600 mb-2">
          Rates in <span className="text-bold text-sky-500">Seconds</span>
        </h1>
        <div className="flex gap-2 flex-col lg:flex-row">
          <label>
            email
            <input
              type="text"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                `email ${formik.errors.email && formik.touched.email ? "error" : ""}`
              }
            />
          </label>
          <label>
            goods type
            <select
              id="goodsType"
              name="goodsType"
              className={
                formik.errors.goodsType && formik.touched.goodsType ? "error" : ""
              }
              onChange={formik.handleChange
              }
              onBlur={formik.handleBlur}
              value={formik.values.goodsType}
              
            >
              <option value="" disabled>
                Select Goods Type
              </option>{" "}
              {/* Placeholder option */}
              {goodsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            freight type
            <select
              id="freightType"
              name="freightType"
              value={formik.values.freightType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.freightType && formik.touched.freightType ? "error" : ""
              }
            >
              <option value="" disabled>
                Select Freight Type
              </option>{" "}
              {/* Placeholder option */}
              {freightOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            on
            <input
              type="date"
              id="shippingDate"
              name="shippingDate"
              value={formik.values.shippingDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          <label>
            from
            <input
              type="text"
              placeholder="Origin Zip"
              id="from"
              name="from"
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                `zip ${formik.errors.from && formik.touched.from ? "error" : ""}`
              }
            />
          </label>
          <label>
            to
            <input
              type="text"
              placeholder="Destination Zip"
              id="to"
              name="to"
              value={formik.values.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                `zip ${formik.errors.to && formik.touched.to ? "error" : ""}`
              }
            />
          </label>
          <button type="submit" className="btn-orange mt-auto">
            Get Rates
          </button>
        </div>
        <Disclaimer />
      </form>
    </section>
  );
}

function Disclaimer() {
  return (
    <section className="w-full flex items-center justify-center text-xs">
      <p className="text-white text-center text-xs">
        By requesting a quote, you agree to our{" "}
        <a href="/terms" className="font-bold text-sky-400">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="font-bold text-sky-400">
          Privacy
        </a>
      </p>
    </section>
  );
}
