import { useMutation, useQuery } from "@tanstack/react-query"
import { bookRideCreateMutation, fetchPassengersBookingQuery } from "../http/api"
import { BookingPagination } from "../types"

export const useBookRideCreateMutation = () => {
    return useMutation({
        mutationKey: ["crate-book-ride"],
        mutationFn: bookRideCreateMutation
    })
}


export const usePassengerBookingFetchQuery = (pagination: BookingPagination) => {
    return useQuery({
        queryKey: ["fetch-passengers-booking"],
        queryFn: () => fetchPassengersBookingQuery(pagination)
    })
}