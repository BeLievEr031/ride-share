import { useQuery } from "@tanstack/react-query"
import { fetchHistory } from "../http/api"
import { IHistory } from "../types"

export const useHistoryFetchQuery = (data: IHistory) => {
    return useQuery({
        queryKey: ["fetch-histories"],
        queryFn: () => fetchHistory(data)
    })
}