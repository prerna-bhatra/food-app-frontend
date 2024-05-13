import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { S3Uploader } from '../services/awsService';
import { useSelector } from 'react-redux';
import { imageOrDocumentUploadRestaurant, verificationDetailsAddOrUpdate } from '../services/restaurentService';
import { ToastContainer, toast } from 'react-toastify';

const RestaurantDocumentForm = () => {
    const { token } = useSelector((state: any) => state.auth);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigation = useNavigate();
    const location = useLocation();
    console.log({ location });

    useEffect(() => {
        
        if (location && location.state && location.state.verfificationDetail) {
            setValue("panCardNumber", location.state.verfificationDetail.panCardNumber);
            setValue("panCardName", location.state.verfificationDetail.panCardName)
            setValue("panCardAddress", location.state.verfificationDetail.panCardAddress)
            setValue("fssaiNumber", location.state.verfificationDetail.fssaiNumber)
            setValue("fssaiExpiryDate", location.state.verfificationDetail.fssaiExpiryDate)
            setValue("bankAccountNumber", location.state.verfificationDetail.bankAccountNumber)
            setValue("ifscCode", location.state.verfificationDetail.ifscCode)
            setValue("accountType", location.state.verfificationDetail.accountType)
        }
    }, [])

    const onSubmit = async (data: any) => {
        console.log(data);

        const requestData = {
            panNumber: data.panCardNumber,
            panCardName: data.panCardName,
            panCardAddress: data.panCardAddress,
            bankAccountNumber: data.bankAccountNumber,
            bankAccountType: data.bankAccountNumber,
            ifscCode: data.ifscCode,
            fssaiNumber: data.fssaiNumber,
            fssaiExpiryDate: data.fssaiExpiryDate
        }

        const updateVerfificationDetailsResponse: any = await verificationDetailsAddOrUpdate(token, requestData, location?.state?.id);
        if (updateVerfificationDetailsResponse.error) {
            toast.error(updateVerfificationDetailsResponse.error.message)
        }

        if (updateVerfificationDetailsResponse.status === 200) {
            toast.success("Succefully added  verfification details")
        }
        else {
            toast.error(updateVerfificationDetailsResponse.message)

        }

    };

    const imageUpload = async (event: any, imageFor: string) => {
        const formData = new FormData();
        formData.append("image", event.target.files[0])
        formData.append("restaurantId", location?.state?.id)
        formData.append("documentType", imageFor)
        const response: any = await imageOrDocumentUploadRestaurant(token, formData)
        if (response.error) {
            toast.error(response.error.message)
        }

        if (response.status === 200) {
            toast.success("Succefully Uploaded document")
        }
        else {
            toast.error(response.message)
        }

    }

    return (
        <div className="md:flex justify-center items-center  ">
            <ToastContainer />
            <div className="w-full md:w-1/2">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Steps</h2>
                    {/* Add steps here */}
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-md">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">PAN Card Details</h2>
                        <input {...register('panCardNumber', { required: true, pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i })} type="text" placeholder="PAN Card Number" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.panCardNumber && <span className="text-red-500">Invalid PAN Card Number</span>}
                        <input {...register('panCardName', { required: true })} type="text" placeholder="PAN Card Name" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.panCardName && <span className="text-red-500">PAN Card Name is required</span>}
                        <input {...register('panCardAddress', { required: true })} type="text" placeholder="PAN Card Address" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.panCardAddress && <span className="text-red-500">PAN Card Address is required</span>}
                        <input  {...register('panCardImage')}
                            name='document'
                            type="file"
                            className="border rounded px-4 py-2 w-full mb-2"
                            onChange={(e: any) => imageUpload(e, 'panCardImage')}
                        />
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">FSSAI Details</h2>
                        {/* FSSAI input fields */}
                        <input {...register('fssaiNumber', { required: true })} type="text" placeholder="FSSAI Number" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.fssaiNumber && <span className="text-red-500">FSSAI Number is required</span>}
                        <input {...register('fssaiExpiryDate', { required: true })} type="date" placeholder="FSSAI Expiry Date" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.fssaiExpiryDate && <span className="text-red-500">FSSAI Expiry Date is required</span>}
                        <input {...register('fssaiImage')} type="file" className="border rounded px-4 py-2 w-full mb-2" name='image' onChange={(e: any) => imageUpload(e, 'fssaiImage')}
                        />
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Bank Account Details</h2>
                        {/* Bank account input fields */}
                        <input {...register('bankAccountNumber', { required: true })} type="text" placeholder="Bank Account Number" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.bankAccountNumber && <span className="text-red-500">Bank Account Number is required</span>}
                        {/* {
                            location.state?.resId ? (
                                <>
                                    <input {...register('reenterBankAccountNumber', { required: true })} type="text" placeholder="Re-enter Bank Account Number" className="border rounded px-4 py-2 w-full mb-2" />
                                    {errors.reenterBankAccountNumber && <span className="text-red-500">Re-enter Bank Account Number is required</span>}
                                </>
                            ) : null
                        } */}

                        <select {...register('accountType', { required: true })} className="border rounded px-4 py-2 w-full mb-2">
                            <option value="">Select Account Type</option>
                            <option value="savings">Savings</option>
                            <option value="current">Current</option>
                        </select>
                        {errors.accountType && <span className="text-red-500">Account Type is required</span>}
                        <input {...register('ifscCode', { required: true })} type="text" placeholder="IFSC Code" className="border rounded px-4 py-2 w-full mb-2"
                        />
                        {errors.ifscCode && <span className="text-red-500">IFSC Code is required</span>}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"> Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestaurantDocumentForm;
