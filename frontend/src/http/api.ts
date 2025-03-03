import api from ".";
import { IRideQueryParams, IShareRide } from "../types";

export const rideShareCreateMutation = (data: IShareRide) => api.post("/ride", data)
export const rideShareDeleteMutation = (data: IShareRide) => api.post("/ride", data)
export const rideShareFetchQuery = (query: IRideQueryParams) => api.get(`/ride?${query}`)