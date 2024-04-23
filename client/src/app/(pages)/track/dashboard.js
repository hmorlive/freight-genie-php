"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ data }) {
  if (!data) return null;

  // get quote style
  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        break;
    }

    return "text-gray-500";
  };
  return (
    <section className="section">
      <h1>My Quote Requests</h1>
      <div className="flex flex-wrap my-4 gap-4 items-center justify-center">
        <div className="w-72 h-72 shadow rounded-md p-4">
          <OrdersByStatusChart data={data} />
        </div>
        <div className="w-72 h-72 shadow rounded-md p-4">
          <OrdersByFreightType data={data} />
        </div>
        <div className="w-72 h-72 shadow rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">My Numbers</h2>
          <div className="flex flex-col gap-2 font-light">
            <span>Quotes: {data.length}</span>
            <span>
              Accepted:{" "}
              {data.filter((quote) => quote.status === "accepted").length}
            </span>
            <span>
              Rejected:{" "}
              {data.filter((quote) => quote.status === "rejected").length}
            </span>
            <span>
              Pending:{" "}
              {
                data.filter(
                  (quote) => quote.status === "pending" || !quote.status
                ).length
              }
            </span>
          </div>
        </div>
        <div className="w-72 h-72 shadow rounded-md p-4 font-light">
          <h2 className="mb-4">Vendors</h2>
          {data.filter((quote) => quote.vendor).length === 0 && (
            <span>No vendors</span>
          )}
          {data.map((quote) => (
            <span key={quote.id}>{quote.vendor}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-2 w-full shadow-md rounded-md">
        <h2 className="text-xl font-normal mb-1 p-4">Requests</h2>
        <div className="bg-white gap-2 p-4 rounded-md text-light md:grid grid-cols-7 hidden font-semibold lowercase items-start">
          <span className="text-xs">ID</span>
          <span className="text-xs">Type</span>
          <span className="text-xs">Goods</span>
          <span className="text-xs">Shipping Date</span>
          <span className="text-xs">From</span>
          <span className="text-xs">To</span>
          <span className="text-xs">Status</span>
        </div>
        <hr className="max-w-full mx-4 border-t border-gray-200" />
        {data.map((quote, index) => (
          <div key={quote.id}>
            <div className="bg-white gap-2 p-4 rounded-md text-light md:grid grid-cols-7 flex flex-col items-start">
              <span className="text-xs font-light">{quote.id}</span>
              <span className="text-xs">type: {quote.goods_type}</span>
              <span className="text-xs">goods: {quote.freight_type}</span>
              <span className="text-xs">{quote.shipping_date}</span>
              <span className="text-xs">{quote.from_location}</span>
              <span className="text-xs">{quote.to_location}</span>
              <span
                className={`uppercase text-xs font-semibold p-1 rounded-md border w-fit ${getStatusStyle(
                  quote.status || "pending"
                )}`}
              >
                {quote.status || "pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OrdersByStatusChart({ data }) {
  const rejected = data.filter((quote) => quote.status === "rejected").length;
  const accepted = data.filter((quote) => quote.status === "accepted").length;
  const pending = data.filter(
    (quote) => quote.status === "pending" || !quote.status
  ).length;

  const chartData = {
    labels: ["Rejected", "Accepted", "Pending"],
    datasets: [
      {
        label: "Quotes",
        data: [rejected, accepted, pending],
        backgroundColor: ["#dc2626", "#16a34a", "#ca8a04"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}

function OrdersByFreightType({ data }) {
  const freightTypes = data.map((quote) => quote.freight_type);
  const freightTypeCount = freightTypes.reduce((acc, type) => {
    if (acc[type]) {
      acc[type] += 1;
    } else {
      acc[type] = 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(freightTypeCount),
    datasets: [
      {
        label: "Quotes",
        data: Object.values(freightTypeCount),
        backgroundColor: ["#dc2626", "#0e7490", "#ca8a04"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
