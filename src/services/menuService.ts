import { axiosInstance } from "./axios";

export const addMenuItem = async (formData: any, restaurantId: string, token: string) => {
    try {
        const response = await axiosInstance.post(`/menu/items/${restaurantId}`, formData, {
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

export const dishesByRestaurant = async (restaurantId: any, token: string) => {
    try {
        const response = await axiosInstance.get(`/menu/items/${restaurantId}`, {
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

export const dishById = async (dishId: any, token: string) => {
    try {
        const response = await axiosInstance.get(`/menu/item/${dishId}`, {
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
