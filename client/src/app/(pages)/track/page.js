import { Suspense } from "react";
import Interactive from "./interactive";

export default function Track() {
  return (
    <Suspense>
      <Interactive />
    </Suspense>
  );
}
