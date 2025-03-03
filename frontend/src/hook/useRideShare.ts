import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { rideShareCreateMutation, rideShareFetchQuery, searchRideShareFetchQuery } from "../http/api"
import { IPagination, ISearch } from "../types";

export const useRideShareCreateMutation = (cb: (data: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-new-ride-share"],
        mutationFn: rideShareCreateMutation,
        onSuccess: () => {
            cb(false);
            queryClient.invalidateQueries({ queryKey: ["fetch-rides"] })
        }
    })
}

export const useRideShareFetchQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["fetch-rides"],
        queryFn: () => rideShareFetchQuery(pagination),
    })
}


export const useRideShareSearchFetchQuery = (data: ISearch) => {
    return useQuery({
        queryKey: ["search-rides"],
        queryFn: () => searchRideShareFetchQuery(data),
    })
}