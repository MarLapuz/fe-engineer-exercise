import Image from "next/image";

import { Star, StarOff } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Dog } from "@/lib/definitions";
import { cn } from "@/lib/utils";

import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useLocalStorage } from "@uidotdev/usehooks";

export type DogAttribute = {
  name: string;
  value: string | number;
};

export function DogCard({ dog }: { dog: Dog }) {
  const [favDogs, setFavDogs] = useLocalStorage<Dog[] | undefined>(
    "favDogs",
  );
  const { toast } = useToast();

  const isFavorite = favDogs?.find((d) => d.id === dog.id) !== undefined;

  const attributes: DogAttribute[] = [
    {
      name: "Age",
      value: dog.age,
    },
    {
      name: "Breed",
      value: dog.breed,
    },
    {
      name: "Zip Code",
      value: dog.zip_code,
    },
  ];

  const handleFavoriteToggle = (dog: Dog) => {
    setFavDogs((prev) => {
      if (prev?.find((d) => d.id === dog.id)) {
        return prev.filter((d) => d.id !== dog.id);
      } else {
        return [...(prev ?? []), dog];
      }
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="transition-colors hover:cursor-pointer hover:border-primary">
            <CardContent className="relative flex h-full w-full flex-col  pb-0 pt-6 transition-colors hover:cursor-pointer hover:border-primary">
              <div className="absolute right-2 top-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    handleFavoriteToggle(dog);
                    if (!isFavorite) {
                      toast({
                        title: "Favorited!",
                        description: (
                          <p className="text-xs">
                            <span className="font-bold">{dog.name}</span> was
                            added to your favorites!
                          </p>
                        ),
                      });
                    }
                  }}
                  className={cn(
                    "h-10 w-10 rounded-full border-2 border-white dark:border-card",
                    isFavorite && "bg-yellow-400 hover:bg-yellow-500",
                  )}
                  title={isFavorite ? "Unfavorite" : "Favorite"}
                >
                  {isFavorite ? (
                    <Star className="h-4 w-4 text-white" />
                  ) : (
                    <StarOff className="h-4 w-4 text-gray-400 dark:text-white" />
                  )}
                </Button>
              </div>
              {dog.img ? (
                <Image
                  src={dog.img}
                  alt={dog.name}
                  width={224}
                  height={224}
                  className="mx-auto h-[224px] w-[224px] shrink-0 rounded-[12px] object-cover"
                />
              ) : (
                <div className="h-[224px] w-full shrink-0 rounded-t-[8px] bg-primary bg-gradient-to-r from-cyan-500 to-blue-500" />
              )}

              <div className="flex h-full flex-col p-[16px] text-center">
                <p className="truncated mb-[6px] line-clamp-1 text-body-sm font-[600] text-slate-900 dark:text-white">
                  {dog.name}
                </p>
                <p className="truncated mb-[12px] line-clamp-3 text-body-xs font-[500] text-slate-500 dark:text-gray-400">
                  {dog.breed}
                </p>
              </div>
              <div className="md:hidden">
                <DogAttributes
                  attributes={attributes}
                  className="flex-wrap justify-center"
                />
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="min-w-[240px] rounded-[12px] border border-slate-300 bg-card p-[16px] pb-[24px] text-left shadow-md transition-colors hover:border-primary"
        >
          {dog.img ? (
            <Image
              src={dog.img}
              alt={dog.name}
              width={64}
              height={64}
              className="mb-[16px] h-[64px] w-[64px] rounded-full object-cover"
            />
          ) : (
            <Avatar className="mb-[16px] h-[64px] w-[64px] rounded-full bg-primary bg-gradient-to-r from-cyan-500 to-blue-500" />
          )}

          <h3 className="mb-[8px] text-body-lg font-[600] text-slate-900 dark:text-white">
            {dog.name}
          </h3>
          <p className="mb-[24px] text-body-sm font-[500] text-slate-500 dark:text-gray-400">
            {dog.breed}
          </p>
          <DogAttributes attributes={attributes} className="flex-col" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function DogAttributes({
  attributes,
  className,
}: {
  attributes: DogAttribute[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none mb-[24px] flex items-start gap-[8px]",
        className,
      )}
    >
      {attributes.map((attribute) => (
        <Badge
          key={attribute.name}
          className="flex flex-row items-center justify-between truncate bg-card hover:bg-slate-100 dark:bg-gray-800"
        >
          <span className="text-body-sm font-semibold text-gray-500 dark:text-gray-400">
            {attribute.name}:
          </span>
          <span className="ml-[4px] truncate text-body-sm font-medium text-black dark:text-gray-200">
            {attribute.value}
          </span>
        </Badge>
      ))}
    </div>
  );
}

export function SkeletonDogCard() {
  return (
    <Card className="h-full w-full">
      <CardContent className="relative flex h-full w-full flex-col pb-0 pt-6 ">
        <div className="relative">
          <Skeleton className="aspect-square w-full" />
        </div>
        <div className="flex flex-col items-center space-y-2 p-4">
          <Skeleton className="h-6 w-3/4 bg-gray-700" />
          <Skeleton className="h-4 w-1/2 bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  );
}
