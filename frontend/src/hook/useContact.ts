import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContact, deleteContact, fetchContact, sendAlert } from "../http/api"
import { IPagination } from "../types"

export const useContactFetchQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["fetch-emergency-contact"],
        queryFn: () => fetchContact(pagination)
    })
}

export const useContactAddMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-emergency-contact"] })
        }
    })
}


export const useContactDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-emergency-contact"] })
        }
    })
}

export const useAlertMutation = () => {
    return useMutation({
        mutationFn: sendAlert,
    })
}