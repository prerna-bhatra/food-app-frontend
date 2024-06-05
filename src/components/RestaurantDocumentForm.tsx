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
        <div className="md:flex px-40  ">
            <ToastContainer />

            <div className="w-full ">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-md">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-left">PAN Details</h2>
                        <div className="md:flex">
                            <div className="w-full md:w-1/2 pr-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                                    Pan Card Number
                                </label>
                                <input
                                    {...register('panCardNumber', { required: true, pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i })}
                                    type="text" placeholder="PAN Card Number"
                                    className="border rounded px-4 py-2 w-full mb-2" />
                                {errors.panCardNumber && <span className="text-red-500">Invalid PAN Card Number</span>}

                                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                                    Pan Card Name
                                </label>
                                <input {...register('panCardName', { required: true })} type="text" placeholder="PAN Card Name" className="border rounded px-4 py-2 w-full mb-2" />
                                {errors.panCardName && <span className="text-red-500">PAN Card Name is required</span>}

                                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                                    Pan Card Address
                                </label>
                                <input {...register('panCardAddress', { required: true })} type="text" placeholder="PAN Card Address" className="border rounded px-4 py-2 w-full mb-2" />
                                {errors.panCardAddress && <span className="text-red-500">PAN Card Address is required</span>}
                            </div>
                            <div className="w-full md:w-1/2 pl-2">
                                <div className="mt-4 w-full" style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    width: '500px',
                                    height: '200px',
                                    color: '#ff6d03',
                                    border: '1px solid #ff6d03',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    textAlign: 'center'
                                }}>
                                    <label htmlFor="pan-upload" style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}>
                                        + Upload Pan Card Image
                                    </label>
                                    <input
                                        id="pan-upload"
                                        {...register('panCardImage')}
                                        name='document'
                                        type="file"
                                        onChange={(e) => imageUpload(e, 'panCardImage')}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            opacity: 0,
                                            cursor: 'pointer',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-left">FSSAI  Details</h2>
                        <div className="md:flex">
                            <div className="w-full md:w-1/2 pr-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                                    FSSAI Number
                                </label>
                                <input {...register('fssaiNumber', { required: true })} type="text" placeholder="FSSAI Number" className="border rounded px-4 py-2 w-full mb-2" />
                                {errors.fssaiNumber && <span className="text-red-500">FSSAI Number is required</span>}

                                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                                    FSSAI Expiry Date
                                </label>
                                <input {...register('fssaiExpiryDate', { required: true })} type="date" placeholder="FSSAI Expiry Date" className="border rounded px-4 py-2 w-full mb-2" />
                                {errors.fssaiExpiryDate && <span className="text-red-500">FSSAI Expiry Date is required</span>}
                            </div>
                            <div className="w-full md:w-1/2 pl-2">
                                <div
                                    className="mt-4 w-full" style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        width: '500px',
                                        height: '130px',
                                        color: '#ff6d03',
                                        border: '1px solid #ff6d03',
                                        borderRadius: '5px',
                                        padding: '10px 20px',
                                        cursor: 'pointer',
                                        textAlign: 'center'
                                    }}
                                >
                                    <label htmlFor="fssai-upload"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}>
                                        + Add FSSAI Certificate
                                    </label>
                                    <input
                                        id="fssai-upload"
                                        {...register('fssaiImage')}
                                        name='document' type="file" onChange={(e) => imageUpload(e, 'fssaiImage')} style={{ position: 'absolute', left: 0, top: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-left">Bank  Details</h2>
                        <input {...register('bankAccountNumber', { required: true })} type="text" placeholder="Bank Account Number" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.bankAccountNumber && <span className="text-red-500">Bank Account Number is required</span>}

                        <select {...register('accountType', { required: true })} className="border rounded px-4 py-2 w-full mb-2">
                            <option value="">Select Account Type</option>
                            <option value="savings">Savings</option>
                            <option value="current">Current</option>
                        </select>
                        {errors.accountType && <span className="text-red-500">Account Type is required</span>}
                        <input {...register('ifscCode', { required: true })} type="text" placeholder="IFSC Code" className="border rounded px-4 py-2 w-full mb-2" />
                        {errors.ifscCode && <span className="text-red-500">IFSC Code is required</span>}
                    </div>
                    <div className="flex justify-end">
                        <button type="button"
                            onClick={() => {
                                navigate("/partner-with-us", {
                                    state: { resId: restaurantId }
                                })
                            }}
                            className="mr-4 bg-white text-orange-500 border border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white focus:outline-none focus:bg-orange-500 focus:text-white w-60"> Back</button>
                        <button type="submit" className="mr-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600 w-60"> Save</button>
                    </div>
                </form>
            </div>


        </div>
    );
};

export default RestaurantDocumentForm;
