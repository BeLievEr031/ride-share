import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { bookRideCreateMutation, fetchIncomingRideBookingQuery, fetchPassengersBookingQuery, updateBookingRideStatusMutation } from "../http/api"
import { BookingPagination, IncomingRideBookingPagination } from "../types"

export const useBookRideCreateMutation = () => {
    return useMutation({
        mutationKey: ["create-book-ride"],
        mutationFn: bookRideCreateMutation
    })
}


export const usePassengerBookingFetchQuery = (pagination: BookingPagination) => {
    return useQuery({
        queryKey: ["fetch-passengers-booking"],
        queryFn: () => fetchPassengersBookingQuery(pagination)
    })
}


export const useIncomingRideFetchQuery = (pagination: IncomingRideBookingPagination) => {
    return useQuery({
        queryKey: ["fetch-incoming-ride-booking"],
        queryFn: () => fetchIncomingRideBookingQuery(pagination)
    })
}

export const useUpdateBookingRideStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-booking-status", "fetch-passengers-booking"],
        mutationFn: updateBookingRideStatusMutation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-incoming-ride-booking"] })
        }
    })
}