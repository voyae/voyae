import { Suspense } from "react";

import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl p-8 pt-28">
          Loading...
        </main>
      }
    >
      <div className="pt-28">
        <SearchPageClient />
      </div>
    </Suspense>
  );
}