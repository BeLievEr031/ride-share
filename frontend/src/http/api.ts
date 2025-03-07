import api from ".";
import { BookingPagination, BookingStatusUpdate, IBook, IContact, IEmail, IHistory, IncomingRideBookingPagination, IPagination, ISearch, IShareRide } from "../types";

export const rideShareCreateMutation = (data: IShareRide) => api.post("/ride", data)
export const rideShareDeleteMutation = (data: IShareRide) => api.post("/ride", data)

export const rideShareFetchQuery = (pagination: IPagination) => api.get(`/ride/get-all?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&clerkId=${pagination.clerkId!}`)


export const searchRideShareFetchQuery = (data: ISearch) => api.get(`/ride/search?from=${data.from}&to=${data.to}&date=${data.date}`)

export const bookRideCreateMutation = (data: IBook) => api.post("/ride-book", data);
export const fetchPassengersBookingQuery = (pagination: BookingPagination) => api.get(`/ride-book/get-all?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&passengerId=${pagination.passengerId!}`);

export const fetchIncomingRideBookingQuery = (pagination: IncomingRideBookingPagination) => api.get(`/ride-book/incoming-rides?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&driverId=${pagination.driverId!}`);

export const updateBookingRideStatusMutation = (data: BookingStatusUpdate) => api.put('/ride-book/update-status', data)


export const createPaymentOrder = (data: { id: string }) => api.post(`/payment/create-order`, data)


export const createContact = (data: IContact) => api.post("/contact", data)

export const fetchContact = (pagination: IPagination) => api.get(`/contact?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&userId=${pagination.userId!}`)

export const deleteContact = (id: string) => api.delete(`/contact/${id}`)

export const sendAlert = (data: IEmail) => api.post("/contact/alert", data)


export const fetchHistory = (data: IHistory) => api.get(`/ride-book/history?driverId=${data.driverId ? data.driverId : ""}&passengerId=${data.passengerId ? data.passengerId : ""}`)


