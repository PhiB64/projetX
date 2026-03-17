import {api} from "./api";

export const locationService = {
    // on met à jour les infos de localisation
    updateLocation: async (latitude, longitude) => {

        const response = await api.put('/users/location', { latitude, longitude });
        return response.data;
    
        },



}