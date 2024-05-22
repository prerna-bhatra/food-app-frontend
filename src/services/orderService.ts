import { axiosInstance } from "./axios";

export const createOrder = async (formData: any, token: string) => {
    try {
        const response = await axiosInstance.post(`/order/create`, formData, {
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

// 
export const ordersByUserId = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/order/history`, {
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

export const ordersByRestaurantId = async (token: string , restaurantId:number) => {
    try {
        const response = await axiosInstance.get(`/order/manage-orders/${restaurantId}`, {
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

export const orderStatusUpdate = async (token: string , orderId:number ,formData:any ) => {
    try {
        const response = await axiosInstance.post(`/order/order-status/${orderId}`,formData, {
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