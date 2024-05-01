import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

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
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();

    useEffect(() => {
        setValue('googleAddress', props.locationAddress)
    }, [props])

    const onSubmit: SubmitHandler<FormData> = (data: any) => {
        console.log(data);
        // You can submit the form data to your backend or perform other actions here
    };

    return (
        <div className="max-w-md mx-auto mt-4 p-6 border border-gray-300 rounded-lg">
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
                    {errors.googleAddress && <span>This field is required</span>}
                </div>
                <div className="mb-4">
                    <input placeholder='House/Flat' type="text" {...register("houseName", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    {errors.houseName && <span>This field is required</span>}
                </div>
                <div className="mb-4">
                    <input placeholder='Area/Street' type="text" {...register("area", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    {errors.area && <span>This field is required</span>}
                </div>
                <div className="mb-4">
                    <input placeholder='Landmark(optional)' type="text" {...register("landMark")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-4">
                    <input placeholder='Receiver Contact' type="text" {...register("receiverContact", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    {errors.receiverContact && <span>This field is required</span>}
                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default AddressForm
