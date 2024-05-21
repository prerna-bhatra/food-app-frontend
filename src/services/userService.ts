import { axiosInstance } from "./axios";

export const createUserAddress = async (formData: any, token: string) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.post(`/user/address`, formData, {
            headers
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during signup:', error);
        return error
    }
}

export const userSavedAddress = async ( token: string) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.get(`/user/address`, {
            headers
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during signup:', error);
        return error
    }
}

export const updateUserName = async (data:any , token: string) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.post(`/user/profile`, data,{
            headers
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during signup:', error);
        return error
    }
}