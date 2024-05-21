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
// export const ordersByUserId = async (token: string) => {
//     try {
//         const response = await axiosInstance.get(`/restaurant/my-restaurants`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             }
//         });
//         return { data: response.data, status: response.status }

//     } catch (error) {
//         console.error('Error :', error);
//         return { error }
//     }
// }

// // 
// export const ordersByRestaurantId = async (token: string) => {
//     try {
//         const response = await axiosInstance.get(`/restaurant/my-restaurants`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             }
//         });
//         return { data: response.data, status: response.status }

//     } catch (error) {
//         console.error('Error :', error);
//         return { error }
//     }
// }