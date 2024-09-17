"use client";

import DogSearchForm from "@/components/dogs/search-form";
import { useFetchDogsQuery, useSearchDogsQuery } from "@/hooks/dogs";

import { DogCard, SkeletonDogCard } from "./card";
import Pagination from "./pagination";
import { useSearchContext } from "./search-context";

export function DogSearch() {
  const { queryParams, itemsPerPage } = useSearchContext();

  const { data } = useSearchDogsQuery(queryParams, {
    refetchOnWindowFocus: false,
  });

  const { data: dogs, isLoading } = useFetchDogsQuery(data?.resultIds ?? [], {
    refetchOnWindowFocus: false,
  });

  const totalPages = Math.ceil((data?.total ?? 0) / itemsPerPage) || 1;

  return (
    <div className="flex flex-col gap-8">
      <DogSearchForm />
      <h5 className="text-right text-gray-500 dark:text-gray-400">
        {(data?.total ?? 0).toLocaleString()} dog{data?.total === 1 ? "" : "s"}{" "}
        found.
      </h5>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading || data === undefined ? (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <SkeletonDogCard key={i} />
            ))}
          </>
        ) : (
          dogs?.map((dog) => <DogCard key={dog.id} dog={dog} />)
        )}
      </div>
      {data?.total === 0 && (
        <p className="text-center text-body-md italic text-gray-500 dark:text-gray-400">
          Unfortunately, we couldn&apos;t find any dogs matching your search.
        </p>
      )}{" "}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
