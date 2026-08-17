import { Suspense } from "react";

import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl p-8">
          Loading...
        </main>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}