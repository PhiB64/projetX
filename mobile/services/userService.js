import {api} from './api';

export const userService = {

    // on met à jour les infos de localisation

    update: async (location) => {
        return api.put('/users/location', location);
    },

// on met récupère les utilisateurs actifs

getActiveUsers : async () => {
const response = await api.get('/users/active');

return response.data;
    },
};

