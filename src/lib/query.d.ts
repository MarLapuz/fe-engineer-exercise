import { UseQueryOptions } from "@tanstack/react-query";

export type UseQueryGenericOptions<T> = Omit<
  UseQueryOptions<T>,
  "queryKey" | "queryFn"
>;

// eslint-disable-next-line
type AsyncFunction = (...arguments_: any[]) => Promise<unknown>;

export type AsyncReturnType<Target extends AsyncFunction> = Awaited<
  ReturnType<Target>
>;
