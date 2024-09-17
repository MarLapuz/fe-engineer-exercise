"use client";

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Dog, DogSearchQueryParams, Location } from "@/lib/definitions";

type SearchContextValue = {
  selectedBreeds: string[];
  setSelectedBreeds: Dispatch<SetStateAction<string[]>>;
  sortAscending: boolean;
  setSortAscending: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  favDogs: Dog[];
  setFavDogs: Dispatch<SetStateAction<Dog[]>>;
  selectedLocations: Location[];
  setSelectedLocations: Dispatch<SetStateAction<Location[]>>;
  queryParams: DogSearchQueryParams;
  itemsPerPage: number;
  handleClearFilters: () => void;
};

const SearchContext = createContext<SearchContextValue>({
  selectedBreeds: [],
  setSelectedBreeds: () => {},
  sortAscending: true,
  setSortAscending: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  favDogs: [],
  setFavDogs: () => {},
  selectedLocations: [],
  setSelectedLocations: () => {},
  queryParams: {
    breeds: [],
    size: 20,
    from: "0",
    sort: "name:asc",
    zipCodes: [],
  },
  itemsPerPage: 20,
  handleClearFilters: () => {},
});

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [favDogs, setFavDogs] = useState<Dog[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const itemsPerPage = 20;

  const handleClearFilters = useCallback(() => {
    setSelectedBreeds([]);
    setSortAscending(true);
    setCurrentPage(1);
    setSelectedLocations([]);
  }, []);

  const value = useMemo(
    () => ({
      selectedBreeds,
      setSelectedBreeds,
      sortAscending,
      setSortAscending,
      currentPage,
      setCurrentPage,
      favDogs,
      setFavDogs,
      selectedLocations,
      setSelectedLocations,
      queryParams: {
        breeds: selectedBreeds,
        size: itemsPerPage,
        from: String((currentPage - 1) * itemsPerPage),
        sort: `name:${sortAscending ? "asc" : "desc"}`,
        zipCodes: selectedLocations.map((location) => location.zip_code),
      },
      itemsPerPage,
      handleClearFilters,
    }),
    [
      selectedBreeds,
      setSelectedBreeds,
      sortAscending,
      setSortAscending,
      currentPage,
      setCurrentPage,
      favDogs,
      setFavDogs,
      selectedLocations,
      setSelectedLocations,
      handleClearFilters,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
