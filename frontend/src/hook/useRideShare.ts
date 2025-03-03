import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { rideShareCreateMutation, rideShareFetchQuery } from "../http/api"
import { IRideQueryParams } from "../types";

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

export const useRideShareFetchQuery = (query: IRideQueryParams) => {
    return useQuery({
        queryKey: ["fetch-rides"],
        queryFn: () => rideShareFetchQuery(query),
        enabled: false
    })
}