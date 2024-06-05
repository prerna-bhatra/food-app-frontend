import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { FaSpinner, FaTrash } from 'react-icons/fa';
import { addMenuItem, dishesByRestaurant } from '../services/menuService';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

interface DishFormData {
    dishes: {
        name: string;
        price: number | null;
        image: string;
    }[];
}

const AddMenu: React.FC = () => {
    const { token } = useSelector((state: any) => state.auth);
    const location = useLocation();

    const [addLoading, setAddLoading] = useState(false)

    const { control, handleSubmit, formState: { errors }, register, setValue } = useForm<DishFormData>({
        defaultValues: {
            dishes: [{ name: '', price: null }],
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'dishes',
    });

    console.log({ fields });

    useEffect(() => {
        existingMenu()
    }, []);

    const existingMenu = async () => {
        const response: any = await dishesByRestaurant(location.state.resId, token);
        console.log({ response });

        if (response.error) {
            toast.error(response.error.message)
        }

        if (response.status === 200) {
            console.log({ dis: response?.data?.dishes });

            setValue('dishes', response?.data?.dishes.map((dish: any) => ({
                name: dish.dishname,
                price: dish.price,
                image: dish.dishImage
            })));
        }
        else {
            toast.error(response.message)
        }
    }

    const onSubmit: SubmitHandler<DishFormData> = async (data) => {
        setAddLoading(true)
        const formData = new FormData();
        data.dishes.forEach((dish, index) => {
            console.log({ dish, im: dish.image });

            formData.append(`dishes[${index}].name`, dish.name);
            formData.append(`dishes[${index}].price`, dish.price?.toString() || '');
            if (typeof (dish.image) === "string") {
                formData.append(`documents[${index}]`, dish.image || '');
            }
            else {
                formData.append(`documents[${index}]`, dish.image[0] || '');

            }
        });

        const response: any = await addMenuItem(formData, location.state.resId, token);
        setAddLoading(false)
        if (response.error) {
            toast.error(response.error.message)
        }

        if (response.status === 200) {
            existingMenu()
            toast.success("Succefully Uploaded document")
        }
        else {
            toast.error(response.message)
        }

    };

    const isEdit = true; // Assuming this is your edit mode flag

    return (
        <div className=" mt-4 border p-4 rounded">
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {fields.map((item, index) => (
                        <div key={item.id} className="mb-4 border p-4 rounded">
                            <div className='flex justify-between items-center'>
                                <h5 className='font-bold'>Dish {index + 1}</h5>
                                <button 
                                type="button"
                                onClick={() => remove(index)}
                                className=" bg-white text-orange-500 border border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white focus:outline-none focus:bg-orange-500 focus:text-white">
                                    {/* <FaTrash /> */}
                                    Delete
                                </button>
                            </div>
                            <div className="flex items-start mt-2">
                                <div className="w-full">
                                    <input
                                        disabled={!isEdit}
                                        {...register(`dishes.${index}.name`, { required: true })}
                                        type="text"
                                        className="border border-gray-400 rounded px-4 py-2 w-full mb-2 focus:border-[#ff6d03] focus:outline-none"
                                        placeholder="Dish Name"
                                    />
                                    <input
                                        disabled={!isEdit}
                                        {...register(`dishes.${index}.price`, { required: true, pattern: /^[0-9]*$/ })}
                                        type="text"
                                        className="border border-gray-400 rounded px-4 py-2 w-full focus:outline-none focus:border-[#ff6d03]"
                                        placeholder="Dish Price"
                                    />
                                    {errors.dishes && (errors.dishes[index]?.name || errors.dishes[index]?.price) && (
                                        <span className="text-red-500">Dish name and price are required</span>
                                    )}
                                </div>
                                <div className="ml-4 w-1/4 flex flex-col items-center">
                                    {typeof (item.image) === "string" && item.image.length > 0 ? (
                                        <div>
                                            <img src={item.image} alt="Dish" className="h-24 w-24 object-cover rounded" />
                                        </div>
                                    ) : (
                                        <div className=" w-full" style={{
                                            position: 'relative',
                                            display: 'inline-block',
                                            width: '100px',
                                            height: '90px',
                                            color: '#ff6d03',
                                            border: '1px solid #ff6d03',
                                            borderRadius: '5px',
                                            padding: '10px 20px',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}>
                                            <label
                                                htmlFor={`dishes.${index}.image`}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            >
                                                Dish Image
                                            </label>
                                            <input
                                                disabled={!isEdit}
                                                {...register(`dishes.${index}.image`, { required: true })}
                                                type="file"
                                                id={`dishes.${index}.image`}
                                                style={{ display: 'none' }}
                                            />
                                            {errors.dishes && errors.dishes[index]?.image && (
                                                <span className="text-red-500">Dish image is required</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 w-full" style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '500px',
                        height: '160px',
                        color: '#ff6d03',
                        border: '1px solid #ff6d03',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}>
                        <button style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }} type="button" onClick={() => append({ name: '', price: null, image: '' })} >
                            Add More
                        </button>
                    </div>
                </div>


                <div className='flex justify-end mt-4'>
                    <button type="submit" className="mr-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600 w-60">
                        {
                            addLoading ? (
                                <FaSpinner />
                            ) : (
                                <>Submit</>
                            )
                        }

                    </button>
                </div>

            </form>
        </div>

    );
};

export default AddMenu;
