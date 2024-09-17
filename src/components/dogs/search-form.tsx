"use client";

import Image from "next/image";
import { useState } from "react";

import {
  ArrowDownAZ,
  ArrowUpAZ,
  Bone,
  Check,
  ChevronsUpDown,
  Loader2,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchMatchDogMutation, useListDogBreedsQuery } from "@/hooks/dogs";
import { useSearchLocationsQuery } from "@/hooks/locations";
import { Dog } from "@/lib/definitions";
import { cn, useDebounce } from "@/lib/utils";

import { ScrollArea } from "../ui/scroll-area";
import { DogAttributes, DogCard } from "./card";
import { useSearchContext } from "./search-context";

export default function DogSearchForm() {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="mb-4 flex flex-col gap-4 max-md:justify-between md:mb-0 md:flex-row">
            <div className="flex items-center justify-between">
              <SortDirectionFilter />
              <div className="md:hidden">
                <FavoritesSheet />
              </div>
            </div>
            <LocationFilter />
            <BreedFilter />
            <div className="hidden md:block">
              <ClearFiltersButton />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <ClearFiltersButton />
            </div>

            <div className="hidden md:mb-1 md:block">
              <FavoritesSheet />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////

function BreedFilter() {
  const { selectedBreeds, setSelectedBreeds, setCurrentPage } =
    useSearchContext();
  const [open, setOpen] = useState(false);

  const { data: breeds } = useListDogBreedsQuery({
    refetchOnWindowFocus: false,
  });

  const handleBreedChange = (breed: string) => {
    setSelectedBreeds((prev) => {
      if (prev.includes(breed)) {
        return prev.filter((value) => value !== breed);
      } else {
        return [...prev, breed];
      }
    });
    setCurrentPage(1); // Reset page when breed changes
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between lg:w-[200px]"
        >
          <p className="line-clamp-1">
            {selectedBreeds.length > 0
              ? selectedBreeds.join(", ")
              : "All Breeds"}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search breeds..." />
          <CommandList>
            <CommandEmpty>No breed found.</CommandEmpty>
            <CommandGroup>
              {breeds?.map((breed) => (
                <CommandItem
                  key={breed}
                  value={breed}
                  onSelect={(currentValue) => {
                    handleBreedChange(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBreeds.includes(breed)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {breed}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////

function SortDirectionFilter() {
  const { sortAscending, setSortAscending } = useSearchContext();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortAscending(!sortAscending)}
            className="h-10 w-10 rounded-full"
            title={sortAscending ? "Sort A to Z" : "Sort Z to A"}
          >
            {sortAscending ? (
              <ArrowDownAZ className="h-4 w-4" />
            ) : (
              <ArrowUpAZ className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="border border-border bg-card">
          <div className="flex flex-col gap-4">
            <p className="text-body-sm font-semibold text-gray-500 dark:text-gray-400">
              Sort Direction: {sortAscending ? "Ascending" : "Descending"}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////

function LocationFilter() {
  const { selectedLocations, setSelectedLocations } = useSearchContext();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  const { data, isLoading } = useSearchLocationsQuery(
    {
      city: debouncedInput,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between md:w-[200px]"
        >
          <p className="line-clamp-1">
            {selectedLocations.length > 0
              ? selectedLocations
                  .map(
                    (location) =>
                      `${location.city}, ${location.state} ${location.zip_code}`,
                  )
                  .join(", ")
              : "All Cities"}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search city..."
            value={input}
            onValueChange={(value) => setInput(value ?? "")}
          />

          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading cities..." : "No city found."}
            </CommandEmpty>
            <CommandGroup>
              {data?.results.map((location) => (
                <CommandItem
                  key={`${location.city}_${location.state}_${location.zip_code}`}
                  value={`${location.city}_${location.state}_${location.zip_code}`}
                  onSelect={(currentValue) => {
                    setSelectedLocations((prev) => {
                      if (
                        prev.find(
                          (l) =>
                            `${l.city}_${l.state}_${l.zip_code}` ===
                            currentValue,
                        )
                      ) {
                        return prev.filter(
                          (l) =>
                            `${l.city}_${l.state}_${l.zip_code}` !==
                            currentValue,
                        );
                      } else {
                        return [...prev, location];
                      }
                    });
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocations.find(
                        (l) => l.zip_code === location.zip_code,
                      )
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {location.city}, {location.state} {location.zip_code}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////

function ClearFiltersButton() {
  const { selectedBreeds, selectedLocations, handleClearFilters } =
    useSearchContext();

  if (selectedBreeds.length === 0 && selectedLocations.length === 0) {
    return null;
  }

  return (
    <Button variant="secondary" onClick={handleClearFilters} className="w-full">
      Clear Filters
    </Button>
  );
}
//////////////////////////////////////////////////////////////////////////////////////////

function FavoritesSheet() {
  const { favDogs } = useSearchContext();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  const { mutateAsync, isPending } = useFetchMatchDogMutation();

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <Star className="mr-2 h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="mr-2 md:hidden lg:block">View Favorites</span> (
          {favDogs.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <ScrollArea className="h-full px-2 md:px-6">
          <SheetHeader className="pt-6">
            <SheetTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
              Favorites
            </SheetTitle>
            <SheetDescription>
              Your favorite dogs will appear here.
            </SheetDescription>
          </SheetHeader>
          <div className="my-8 grid grid-cols-1 gap-4">
            {favDogs.length > 0 ? (
              favDogs.map((dog) => <DogCard key={dog.id} dog={dog} />)
            ) : (
              <p className="text-center text-body-sm font-medium text-gray-500 dark:text-gray-400">
                You have no favorites yet.
              </p>
            )}
          </div>
          {favDogs.length > 0 && (
            <SheetFooter className="mb-6 w-full flex-col !justify-center">
              <Dialog
                open={dialogOpen}
                onOpenChange={async (open) => {
                  if (!matchedDog) {
                    try {
                      const matched = await mutateAsync({
                        ids: favDogs.map((dog) => dog.id),
                      });

                      if (matched) {
                        setMatchedDog(matched);
                        setDialogOpen(true);
                      }
                    } catch (error) {
                      console.error("Failed to find match:", error);
                    }
                  }

                  // Reset the matched dog when the dialog is closed
                  if (!open) {
                    setMatchedDog(null);
                  }

                  setDialogOpen(open);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    className="group relative mb-2 me-2 inline-flex h-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
                    disabled={isPending}
                  >
                    <span className="relative flex items-center gap-2 rounded-md bg-white px-5 py-2.5 transition-all duration-200 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                      <Bone className="h-4 w-4 fill-cyan-500 text-cyan-500 transition-colors duration-200 group-hover:fill-white group-hover:text-white" />
                      {isPending ? "Finding..." : "Find the Furfect Companion!"}
                      {isPending && (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                    </span>
                  </Button>
                </DialogTrigger>
                {matchedDog && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="mb-5">
                      <DialogTitle className="text-center text-xl lg:text-2xl">
                        Congratulations!
                      </DialogTitle>
                      <DialogDescription className="lg:text-md text-center">
                        We found your furfect match!
                      </DialogDescription>
                    </DialogHeader>
                    {matchedDog.img ? (
                      <Image
                        src={matchedDog.img}
                        alt={matchedDog.name}
                        width={180}
                        height={180}
                        className="mx-auto h-[180px] w-[180px] shrink-0 rounded-[12px] object-cover"
                      />
                    ) : (
                      <div className="h-[180px] w-full shrink-0 rounded-t-[8px] bg-primary bg-gradient-to-r from-cyan-500 to-blue-500" />
                    )}

                    <div className="flex h-full flex-col p-[16px] text-center">
                      <p className="truncated mb-[6px] line-clamp-1 text-body-md font-[600] text-slate-900 dark:text-white">
                        {matchedDog.name}
                      </p>
                      <p className="truncated mb-[12px] line-clamp-3 text-body-xs font-[500] text-slate-500 dark:text-gray-400">
                        {matchedDog.breed}
                      </p>
                    </div>
                    <DogAttributes
                      attributes={[
                        {
                          name: "Age",
                          value: matchedDog.age,
                        },
                        {
                          name: "Breed",
                          value: matchedDog.breed,
                        },
                        {
                          name: "Zip Code",
                          value: matchedDog.zip_code,
                        },
                      ]}
                      className="mb-0 flex-wrap justify-center"
                    />
                  </DialogContent>
                )}
              </Dialog>
            </SheetFooter>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
