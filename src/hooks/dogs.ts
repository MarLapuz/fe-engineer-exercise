import { useMutation, useQuery } from "@tanstack/react-query";

import {
  fetchDogs,
  fetchMatchDog,
  FetchMatchDogRequest,
  listDogBreeds,
  searchDogs,
} from "@/app/api/dogs";
import { DogSearchQueryParams } from "@/lib/definitions";
import { AsyncReturnType, UseQueryGenericOptions } from "@/lib/query";

import { useToast } from "./use-toast";

export function useSearchDogsQuery(
  params: DogSearchQueryParams,
  options?: UseQueryGenericOptions<AsyncReturnType<typeof searchDogs>>,
) {
  return useQuery({
    queryKey: ["dogs", params] as const,
    queryFn: async () => {
      return await searchDogs(params);
    },
    ...options,
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//

export function useListDogBreedsQuery(
  options?: UseQueryGenericOptions<AsyncReturnType<typeof listDogBreeds>>,
) {
  return useQuery({
    queryKey: ["breeds"] as const,
    queryFn: async () => {
      return await listDogBreeds();
    },
    ...options,
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export function useFetchDogsQuery(
  ids: string[],
  options?: UseQueryGenericOptions<AsyncReturnType<typeof fetchDogs>>,
) {
  return useQuery({
    queryKey: ["dogs", ids] as const,
    queryFn: async () => {
      return await fetchDogs(ids);
    },
    ...options,
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export function useFetchMatchDogMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["find-match"],
    mutationFn: async (request: FetchMatchDogRequest) => {
      return await fetchMatchDog(request);
    },
    onError: (error) => {
      console.error("Failed to find match:", error);
      toast({
        title: "Failed to find the furfect companion",
        description:
          "An error occurred while finding the furfect companion. Please try again.",
        variant: "destructive",
      });
    },
  });
}
