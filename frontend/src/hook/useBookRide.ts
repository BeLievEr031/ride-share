import { useMutation } from "@tanstack/react-query"
import { bookRideCreateMutation } from "../http/api"

export const useBookRideCreateMutation = () => {
    return useMutation({
        mutationKey: ["crate-book-ride"],
        mutationFn: bookRideCreateMutation
    })
}