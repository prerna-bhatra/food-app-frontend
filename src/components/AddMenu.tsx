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

        console.log({ response });


        if (response.status === 200) {
            toast.success("Succefully Uploaded document")
        }
        else {
            toast.error(response.message)
        }

    };

    const isEdit = true; // Assuming this is your edit mode flag

    return (
        <div className=" mt-4 border p-4 rounded max-w-md mx-auto">
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} className="">
                {fields.map((item, index) => (
                    <div key={item.id} className="mb-4 border p-4 rounded">
                        <div className='flex justify-between items-center'>
                            <h5>Dish {index + 1}</h5>
                            {/* {index > 0 && ( */}
                            <button type="button" onClick={() => remove(index)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                <FaTrash />
                            </button>
                            {/* )} */}

                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                disabled={!isEdit}
                                {...register(`dishes.${index}.name`, { required: true })}
                                type="text"
                                className="border-gray-400 rounded px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
                                placeholder="Dish Name"
                            />
                            <input
                                disabled={!isEdit}
                                {...register(`dishes.${index}.price`, { required: true, pattern: /^[0-9]*$/ })}
                                type="text"
                                className="border-gray-400 rounded px-4 py-2 ml-2 w-1/2 focus:outline-none focus:border-blue-500"
                                placeholder="Dish Price"
                            />
                        </div>
                        {errors.dishes && (errors.dishes[index]?.name || errors.dishes[index]?.price) && (
                            <span className="text-red-500">Dish name and price are required</span>
                        )}
                        <div className="mt-4">
                            {typeof (item.image) === "string" && item.image.length > 0 ? (
                                <div>
                                    <img src={item.image} alt="Dish" className="h-24 w-24 object-cover rounded" />
                                  
                                </div>
                            ) : (
                                <>
                                    <label htmlFor="file-upload"
                                        style={{
                                            backgroundColor: '#f6f9fd',
                                            color: '#0d448d',
                                            border: '1px solid #0d448d',
                                            borderRadius: '5px',
                                            padding: '10px 20px', cursor: 'pointer'
                                        }}
                                    >
                                        Upload  Image
                                    </label>
                                    <input
                                        disabled={!isEdit}
                                        {...register(`dishes.${index}.image`, { required: true })}
                                        type="file"
                                        id={`dishes.${index}.image`}
                                        style={{ left: 0, top: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                                    />
                                    {errors.dishes && errors.dishes[index]?.image && (
                                        <span className="text-red-500">Dish image is required</span>
                                    )}
                                </>
                            )
                            }

                        </div>
                    </div>
                ))}
                <div className='mt-4'>
                    <button type="button" onClick={() => append({ name: '', price: null, image: '' })} className="text-blue-500 hover:underline top-4 right-4">
                        Add Another Dish
                    </button>
                </div>

                <div>
                    <button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  bottom-4 right-4">
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
