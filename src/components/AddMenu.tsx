import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { FaSpinner, FaTrash } from 'react-icons/fa';
import { addMenuItem, dishesByRestaurant } from '../services/menuService';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { uploadRestaurantImages } from '../services/restaurentService';

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
    const [imageUploadLoading, setImageUploadLoading] = useState(false)

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

    useEffect(() => {
        if (location?.state?.restaurantImages && location?.state?.restaurantImages?.length > 0) {
            console.log(location?.state?.restaurantImages
            );
            setImages(location?.state?.restaurantImages);

        }
        existingMenu()
    }, [location]);


    const existingMenu = async () => {
        const response: any = await dishesByRestaurant(location.state.resId, token);

        if (response.error) {
            toast.error(response.error.message)
        }

        if (response.status === 200) {

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

    const [images, setImages] = useState<any>([]);


    const handleImageUpload = async (event: { target: { files: any[]; }; }) => {
        setImageUploadLoading(true)
        const file = event.target.files[0];
        if (file && images.length < 4) {
            const newImage = URL.createObjectURL(file);

            const formData = new FormData();
            formData.append("document", file)
            formData.append("restaurantId", location.state.resId)

            const response = await uploadRestaurantImages(token, formData);
            console.log({ response });

            setImages([...images, newImage]);
        }

        setImageUploadLoading(false)

    };

    // const handleImageDelete = (index: any) => {
    //     const newImages = images.filter((_: any, i: any) => i !== index);
    //     setImages(newImages);
    // };


    return (
        <div className="   p-4 rounded px-16">
            <ToastContainer />
            <h1 className='text-[#FF6D03] text-[32px] text-left mb-6 mt-16 font-extrabold	'>Restaurant Images</h1>
            <div className='flex flex-wrap mb-8'>
                {images?.map((image: string | undefined, index: React.Key | null | undefined) => (
                    <div key={index} className='relative m-2 rounded-[8px]'>
                        <img src={image} alt={`Uploaded ${index}`} className='border h-32 rounded-[8px] w-32' />
                        <button
                            // onClick={() => handleImageDelete(index)}
                            className='absolute top-1 right-1 bg-[#FF6D03] text-white rounded-full h-6 w-6 flex items-center justify-center'
                        >
                            ×
                        </button>
                    </div>
                ))}

                {images.length < 4 && (
                    <div className='relative m-2 border border-[#FF6D03] rounded-[8px] h-32 w-32 flex items-center justify-center'>
                        {
                            imageUploadLoading ? (
                                <FaSpinner />
                            ) : (
                                <img src="/images/upload_icon.png" className='h-6 w-6' />

                            )
                        }
                        <input
                            type='file'
                            className='absolute inset-0 opacity-0 cursor-pointer'
                            accept='image/*'
                            onChange={(e: any) => {
                                handleImageUpload(e)
                            }}
                        />
                    </div>
                )}
            </div>

            <h1 className='text-[#FF6D03] text-left mb-4 font-extrabold text-[32px] mb-6 '>Restaurant Menu</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    {fields.map((item, index) => (
                        <div key={item.id} className="mb-4 border p-6 rounded-3xl">
                            <div className='flex justify-between items-center mb-6'>
                                <h5 className='font-bold text-2xl'>Dish {index + 1}</h5>
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className=" bg-white text-orange-500 border border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white focus:outline-none focus:bg-orange-500 focus:text-white">
                                    {/* <FaTrash /> */}
                                    Delete
                                </button>
                            </div>
                            
                            <div className="flex items-start mt-2 gap-4">
                                <div className="w-full">
                                    <input
                                        disabled={!isEdit}
                                        {...register(`dishes.${index}.name`, { required: true })}
                                        type="text"
                                        className="border border-[#888888] rounded-lg px-4 py-2 w-full mb-2 focus:border-[#ff6d03] focus:outline-none flex-1"
                                        placeholder="Dish Name"
                                    />
                                    <input
                                        disabled={!isEdit}
                                        {...register(`dishes.${index}.price`, { required: true, pattern: /^[0-9]*$/ })}
                                        type="text"
                                        className="border border-[#888888] rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#ff6d03] flex-1"
                                        placeholder="Dish Price"
                                    />
                                    {errors.dishes && (errors.dishes[index]?.name || errors.dishes[index]?.price) && (
                                        <span className="text-red-500">Dish name and price are required</span>
                                    )}
                                </div>

                                <div className="flex flex-col items-center">
                                    {typeof (item.image) === "string" && item.image.length > 0 ? (
                                        <div className=''>
                                            <img 
                                            src={item.image} 
                                            alt="Dish"
                                             style={{"width":"130px",  "height":"96px"}} 
                                             className='rounded-lg' />
                                        </div>
                                    ) : (
                                        <div className="w-full" style={{
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
                    <div className="mt-4 w-full rounded-3xl" style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '500px',
                        height: '170px',
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
