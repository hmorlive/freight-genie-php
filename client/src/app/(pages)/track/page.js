import TrackForm from "./track-form";

export default function Track() {
  return (
    <section className="w-full min-h-[70vh]  flex flex-col items center justify-center relative">
      <div className="absolute bg-truck h-full bg-cover bg-no-repeat blur w-full"></div>
      <div className="absolute bg-zinc-950 bg-opacity-70 h-full w-full"></div>
      <div className="w-fit m-auto text-white bg-black">
        <h1 className="mb-2 relative text-white">
          <span className="text-orange-600">Find</span> and{" "}
          <span className="text-sky-600">Track</span> Your Quotes
        </h1>
        <TrackForm />
      </div>
    </section>
  );
}
