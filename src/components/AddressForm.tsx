import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createUserAddress } from '../services/userService';
import { FaSpinner } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

interface FormData {
    addressType: string;
    houseName: string;
    latitude: number;
    longitude: number;
    googleAddress: string;
    area: string;
    landMark?: string;
    receiverContact: string;
}


const AddressForm = (props: any) => {    
    const { token } = useSelector((state: any) => state.auth);

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();

    useEffect(() => {
        setValue('googleAddress', props.locationAddress)
    }, [props])

    const onSubmit: SubmitHandler<FormData> = (data: any) => {
        setLoading(true)
        createUserAddress({ ...data, latitude: props.latitude, longitude: props.longitude }, token).
            then((response) => {
                setLoading(false)
                toast.success("Address saved");
                props.onFormSubmit()

            }).catch((error) => {
                setLoading(false)
                console.log({ error });

            })
    };

    return (
        <div className="max-w-md mx-auto mt-4 p-6 border border-gray-300 rounded-lg">
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address Type:</label>
                    <div className="mt-1 flex">
                        <label className="inline-flex items-center mr-4">
                            <input type="radio" {...register("addressType")} value="Home" className="form-radio mr-2" defaultChecked />
                            <span>Home</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" {...register("addressType")} value="Work" className="form-radio mr-2" />
                            <span>Work</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <input disabled={true} type="text" {...register("googleAddress", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    {/* {errors.googleAddress && <span className='text-red-400'>House/Flat details is required</span>} */}
                </div>
                <div className="mb-4">
                    <input placeholder='House/Flat' type="text" {...register("houseName", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    {errors.houseName && <span className='text-red-400'>House/Flat details is required</span>}
                </div>
                <div className="mb-4">
                    <input placeholder='Area/Street' type="text" {...register("area", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    {errors.area && <span className='text-red-400'>Area  is required</span>}
                </div>
                <div className="mb-4">
                    <input placeholder='Landmark(optional)' type="text" {...register("landMark")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-4">
                    <input placeholder='Receiver Contact' type="text" {...register("receiverContact", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    {errors.receiverContact && <span className='text-red-400'>Contact number is required</span>}
                </div>
                <button type="submit">
                    {loading && (
                        <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
                    )}
                    {!loading ? (
                        'Save'
                    ) : (
                        <span className="opacity-0">Sign Up</span> // Hide the text when loading
                    )}
                </button>
            </form>

        </div>
    )
}

export default AddressForm
