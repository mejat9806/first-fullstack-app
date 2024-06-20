import { useQuery } from "@tanstack/react-query";
import searchApi, { searchResult } from "./searchApi";

const useSearch = ({ search }: { search: string | null }) => {
  const { data: searchData, isLoading: loadingSearch } = useQuery<searchResult>(
    {
      queryKey: ["search", search],
      queryFn: async () => {
        if (search) {
          const response = await searchApi({ search });
          return response.data; // Ensure the correct data type is returned
        } else {
          throw new Error("No search query detected");
        }
      },

      enabled: !!search,
      refetchOnWindowFocus: false,
      staleTime: 300000,
      gcTime: Infinity,
    },
  );

  return { loadingSearch, searchData };
};

export default useSearch;
