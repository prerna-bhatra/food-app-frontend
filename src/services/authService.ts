import { axiosInstance } from "./axios";

export const login = async (formData: any) => {

    try {
        const response = await axiosInstance.post(`/auth/login`, formData);
        console.log({ response });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during signup:', error);
        return error
    }
}

export const signup = async (formData: any) => {

    try {
        const response = await axiosInstance.post(`/auth/signup`, formData);
        console.log({ response });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during signup:', error);
        return error
    }
}


export const verifyOTP = async (formData: any) => {

    console.log({formData});
    
    try {
        const response = await axiosInstance.post(`/auth/verify-otp`, formData);
        console.log({ response });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during otp sending:', error);
        return error
    }
}
