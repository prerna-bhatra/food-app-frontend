import { axiosInstance } from "./axios";

export const registerRestaurent = async (formData: any ,token:string) => {
    try {
        const response = await axiosInstance.post(`/restaurant/register`, formData, {
            headers:{
                'Authorization': `Bearer ${token}`,            }
        });
        console.log({ response });
        return response;

    } catch (error) {
        console.error('Error during signup:', error);
        return {error}
    }
}

export const myRestaurants = async (token:string) => {
    try {
        const response = await axiosInstance.get(`/restaurant/myRestaurants`, {
            headers:{
                'Authorization': `Bearer ${token}`,            }
        });
        console.log({ response });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error :', error);
        return {error}
    }
}


export const myRestaurantById = async (token:string , restaurantId:number) => {
    try {
        const response = await axiosInstance.get(`/restaurant/myRestaurantById/${restaurantId}`, {
            headers:{
                'Authorization': `Bearer ${token}`,            }
        });
        console.log({ response });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error :', error);
        return {error}
    }
}

export const imageOrDocumentUploadRestaurant = async (token:string , formData:any) => {

    console.log({formData});
    
    try {
        const response = await axiosInstance.post(`/restaurent/upload`,formData, {
            headers:{
                'Authorization': `Bearer ${token}`,            }
        });
        console.log({ response });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during :', error);
        return {error}
    }
}

export const verificationDetailsAddOrUpdate = async (token:string , formData:any , restaurentId:number) => {    
    try {
        const response = await axiosInstance.post(`/restaurent/verification-details/${restaurentId}`,formData, {
            headers:{
                'Authorization': `Bearer ${token}`,            }
        });
        console.log({ response });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during :', error);
        return {error}
    }
}

