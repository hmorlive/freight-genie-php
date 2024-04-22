"use client";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function QuoteForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      freightType: "",
      shippingDate: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      freightType: Yup.string().required("Required"),
      shippingDate: Yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
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

  return (
    <section className="relative w-full flex flex-col items-center justify-center min-h-[60vh] py-10 bg-black">
      <div className="absolute bg-hero h-full bg-cover bg-no-repeat blur w-full"></div>
      <div className="absolute bg-black bg-opacity-70 h-full w-full"></div>
      <form
        className="bg-transparent relative z-10 flex gap-2 flex-col"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-3xl font-semibold text-orange-600">
          Rates in <span className="text-bold text-sky-500">Seconds</span>
        </h1>
        <div className="flex gap-2 flex-col lg:flex-row">
          <label>
            email
            <input type="text" placeholder="Enter your email" />
          </label>
          <label>
            options
            <select
              id="goodsType"
              name="goodsType"
              className="selector"
              onChange={(event) =>
                formik.setFieldValue("goodsType", event.target.value)
              }
              onBlur={formik.handleBlur}
              value={formik.values.goodsType}
            >
              <option value="">Select Goods Type</option>{" "}
              {/* Placeholder option */}
              {goodsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            shipping
            <select id="freightType" name="freightType" className="selector">
                <option value="">Select Freight Type</option>{" "}
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
            <input type="date" />
          </label>
          <button className="btn">Get Rates</button>
        </div>
        <hr className="w-full border-t my-2 border-gray-300" />
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
