import { DogSearch } from "@/components/dogs/dog-search";
import { SearchProvider } from "@/components/dogs/search-context";

export default async function Home() {

  return (
    <main className="flex-1">
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
    </main>
  )
}
