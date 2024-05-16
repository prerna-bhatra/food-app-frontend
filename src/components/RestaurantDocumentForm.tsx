import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { S3Uploader } from '../services/awsService';
import { useSelector } from 'react-redux';
import { imageOrDocumentUploadRestaurant, verificationDetailsAddOrUpdate } from '../services/restaurentService';
import { ToastContainer, toast } from 'react-toastify';
import { FaUpload } from 'react-icons/fa';

const RestaurantDocumentForm = () => {
    const { token } = useSelector((state: any) => state.auth);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const location: any = useLocation();
    const restaurantId = location?.state?.id

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
        const requestData = {
            panNumber: data.panCardNumber,
            panCardName: data.panCardName,
            panCardAddress: data.panCardAddress,
            bankAccountNumber: data.bankAccountNumber,
            bankAccountType: data.accountType,
            ifscCode: data.ifscCode,
            fssaiNumber: data.fssaiNumber,
            fssaiExpiryDate: data.fssaiExpiryDate
        }

        const updateVerfificationDetailsResponse: any = await verificationDetailsAddOrUpdate(token, requestData, location?.state?.id);
        if (updateVerfificationDetailsResponse.error) {
            toast.error(updateVerfificationDetailsResponse.error.message)
        }

        if (updateVerfificationDetailsResponse.status >= 200 || updateVerfificationDetailsResponse.status <= 210) {
            toast.success("Succefully added  verfification details");
            navigate("/my-restaurants")
        }
        else {
            toast.error(updateVerfificationDetailsResponse.message)

        }

    };

    const imageUpload = async (event: any, imageFor: string) => {
        const formData = new FormData();        
        formData.append("document", event.target.files[0])
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
                <div className="mb-8 h-full">
                    <h2 className="text-2xl font-bold mb-4">Steps</h2>
                    {/* Add steps here */}
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-md">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-left">PAN Details</h2>
                        <div className='md:flex  justify-content'>
                            <div className='w-1/2'>
                                <label className="block text-gray-700 text-sm font-bold mb-2 text-left"  >
                                    Pan Card Number
                                </label>
                                <input
                                    {...register('panCardNumber', { required: true, pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i })}
                                    type="text" placeholder="PAN Card Number"
                                    className="border rounded px-4 py-2 w-full mb-2" />
                                {errors.panCardNumber && <span className="text-red-500">Invalid PAN Card Number</span>}
                            </div>
                            <div className='w-1/2'>
                                <label className="block text-gray-700 text-sm font-bold mb-2 text-left"  >
                                    Pan Card Name
                                </label>
                                <input {...register('panCardName', { required: true })} type="text" placeholder="PAN Card Name" className="border rounded px-4 py-2 w-full mb-4 " />
                                {errors.panCardName && <span className="text-red-500">PAN Card Name is required</span>}
                            </div>
                        </div>

                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left"  >
                            Pan Card Address
                        </label>

                        <input {...register('panCardAddress', { required: true })} type="text" placeholder="PAN Card Address" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.panCardAddress && <span className="text-red-500">PAN Card Address is required</span>}

                        <div className='mt-4 w-full' style={{ position: 'relative', display: 'inline-block' }}>
                            <label htmlFor="file-upload"
                                style={{
                                    backgroundColor: '#f6f9fd',
                                    color: '#0d448d',
                                    border: '1px solid #0d448d',
                                    borderRadius: '5px',
                                    padding: '10px 20px', cursor: 'pointer'
                                }}>
                                Upload PAN Card Image
                            </label>
                            <input
                                id="file-upload"
                                {...register('panCardImage')}
                                name='document' type="file" onChange={(e) => imageUpload(e, 'panCardImage')} style={{ position: 'absolute', left: 0, top: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">FSSAI Details</h2>
                        {/* FSSAI input fields */}
                        <input {...register('fssaiNumber', { required: true })} type="text" placeholder="FSSAI Number" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.fssaiNumber && <span className="text-red-500">FSSAI Number is required</span>}
                        <input {...register('fssaiExpiryDate', { required: true })} type="date" placeholder="FSSAI Expiry Date" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.fssaiExpiryDate && <span className="text-red-500">FSSAI Expiry Date is required</span>}
                        <div className='mt-4 w-full' style={{ position: 'relative', display: 'inline-block' }}>
                            <label htmlFor="file-upload"
                                style={{
                                    backgroundColor: '#f6f9fd',
                                    color: '#0d448d',
                                    border: '1px solid #0d448d',
                                    borderRadius: '5px',
                                    padding: '10px 20px', cursor: 'pointer'
                                }}>
                                Upload FSSAI Certificate
                            </label>
                            <input
                                id="file-upload"
                                {...register('fssaiImage')}
                                name='document' type="file" onChange={(e) => imageUpload(e, 'panCardImage')} style={{ position: 'absolute', left: 0, top: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                        </div>
                        {/* <input {...register('fssaiImage')} type="file" className="border rounded px-4 py-2 w-full mb-2" name='image' onChange={(e: any) => imageUpload(e, 'fssaiImage')}
                        /> */}
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Bank Account Details</h2>
                        {/* Bank account input fields */}
                        <input {...register('bankAccountNumber', { required: true })} type="text" placeholder="Bank Account Number" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.bankAccountNumber && <span className="text-red-500">Bank Account Number is required</span>}

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
                        <button type="button"
                            onClick={() => {
                                navigate("/partner-with-us", {
                                    state: { resId: restaurantId }
                                })
                            }}
                            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"> Back</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"> Save</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default RestaurantDocumentForm;
