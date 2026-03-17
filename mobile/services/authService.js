import {api} from './api';


// Service pour le login
export const authService = {
    login: async (data) => {
        
            const response = await api.post('/auth/login',data);
            return response.data.token
        },


// Service pour le register
register:async (data) => {        
            const response = await api.post('/auth/register',data);
            return response.data;
        } 
    }


  