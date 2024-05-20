import { axiosInstance } from "./axios";

export const registerRestaurent = async (formData: any, token: string) => {
    try {
        const response = await axiosInstance.post(`/restaurant/register`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response;

    } catch (error) {
        console.error('Error during signup:', error);
        return { error }
    }
}

export const myRestaurants = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/restaurant/my-restaurants`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error :', error);
        return { error }
    }
}

export const myRestaurantById = async (token: string, restaurantId: number) => {
    try {
        const response = await axiosInstance.get(`/restaurant/my-restaurant/${restaurantId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error :', error);
        return { error }
    }
}

export const restaurantById = async (token: string, restaurantId: number) => {
    try {
        const response = await axiosInstance.get(`/restaurant/search/${restaurantId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error :', error);
        return { error }
    }
}

export const searchByDishName = async (token: string, dishName: string) => {
    try {
        const response = await axiosInstance.get(`/restaurant/search-by-dishname?dishName=${dishName}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error :', error);
        return { error }
    }
}

export const searchMenuOrRestaurant = async (token: string, searchString: string) => {
    try {
        const response = await axiosInstance.get(`/restaurant/search-item?searchString=${searchString}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error :', error);
        return { error }
    }
}


export const imageOrDocumentUploadRestaurant = async (token: string, formData: any) => {

    console.log({ formData });

    try {
        const response = await axiosInstance.post(`/restaurant/upload`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during :', error);
        return { error }
    }
}

export const verificationDetailsAddOrUpdate = async (token: string, formData: any, restaurentId: number) => {
    try {
        const response = await axiosInstance.post(`/restaurant/verification-details/${restaurentId}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during :', error);
        return { error }
    }
}

export const updateRestaurantRegistration = async (token: string, formData: any, restaurentId: number) => {
    try {
        const response = await axiosInstance.post(`/restaurant/update-registration-details/${restaurentId}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return { data: response.data, status: response.status }

    } catch (error) {
        console.error('Error during :', error);
        return { error }
    }
}

