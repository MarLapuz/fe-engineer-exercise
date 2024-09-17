"use client";

import AuthForm from "@/components/auth/form";
import { DogSearch } from "@/components/dogs/dog-search";
import { SearchProvider } from "@/components/dogs/search-context";

import { useAuthContext } from "./providers";

export default function Root() {
  const { isAuthenticated } = useAuthContext();

  return (
    <main className="flex-1">
      {!isAuthenticated ? (
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Fetch
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Help a lucky dog find their forever home today!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <AuthForm />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full">
          <div className="flex h-64 items-center justify-center bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">
            <div className="text-center text-white">
              <h1 className="mb-4  text-lg font-bold drop-shadow-lg md:text-2xl lg:text-4xl">
                Find Your Perfect Companion
              </h1>
              <p className="text-sm drop-shadow-md md:text-lg lg:text-xl">
                Search through our extensive database of adorable dogs.
              </p>
            </div>
          </div>
          <div className="container mx-auto -mt-8 max-w-4xl p-4">
            <SearchProvider>
              <DogSearch />
            </SearchProvider>
          </div>
        </section>
      )}
    </main>
  );
}
