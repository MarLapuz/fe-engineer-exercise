import { useQuery } from "@tanstack/react-query";

import { searchLocations } from "@/app/api/locations";
import { LocationSearchQueryParams } from "@/lib/definitions";
import { AsyncReturnType, UseQueryGenericOptions } from "@/lib/query";

export function useSearchLocationsQuery(
  params: LocationSearchQueryParams,
  options?: UseQueryGenericOptions<AsyncReturnType<typeof searchLocations>>,
) {
  return useQuery({
    queryKey: ["locations", params] as const,
    queryFn: async () => {
      return await searchLocations(params);
    },
    ...options,
  });
}
