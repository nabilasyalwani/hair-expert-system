"use client";
import { Suspense } from "react";
import ResultPage from "./ResultPageInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPage />
    </Suspense>
  );
}
