import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { myRestaurantById, registerRestaurent, updateRestaurantRegistration } from '../services/restaurentService';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit, FaPen, FaSpinner } from 'react-icons/fa';
import { fetchAddress } from '../services/googleApiService';
import { useLocation, useNavigate } from 'react-router-dom';

const RegisterRestaurantForm = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { token } = useSelector((state: any) => state.auth);
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [openDays, setOpenDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
    const [registerLoading, setRegisterLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(true);

    const [verfificationDetail, setVerfificationDetail] = useState<any>();
    const restaurantId = location?.state?.resId

    useEffect(() => {
        setValue('openDays', openDays);
        if (location && location.state?.resId) {
            setIsEdit(false)
            fetcExistingRestaurantById()
        }
    }, []);

    const fetcExistingRestaurantById = async () => {
        const myRestuarntResponse: any = await myRestaurantById(token, location.state?.resId);

        if (myRestuarntResponse.status === 200 || 201) {
            toast.success(myRestuarntResponse.message)
            const restaurantData = myRestuarntResponse.data.restaurant;
            setValue("name", restaurantData.name)
            setValue("completeAddress", restaurantData.completeAddress)
            setValue("contactName", restaurantData.contactName)
            setValue("googleAddress", restaurantData.googleAddress)
            setValue("contactNumber", restaurantData.contactNumber)
            setValue("currentLocation", restaurantData.currentLocation)
            setValue("country", restaurantData.country)
            setValue("city", restaurantData.city)
            setValue("pincode", restaurantData.pincode)
            setValue("state", restaurantData.state)
            setValue("ownerName", restaurantData.ownerName)
            setValue("ownerContact", restaurantData.ownerContact)
            setValue("startTime", restaurantData.startTime)
            setValue("cuisines", restaurantData.cuisines)
            setValue("endTime", restaurantData.endTime)
            setValue("establishmentType", restaurantData.establishmentType)
            setValue("ownerEmail", restaurantData.ownerEmail)
            setValue("outletDescription", restaurantData.outletDescription)
            setVerfificationDetail({
                panCardNumber: restaurantData.panNumber,
                panCardAddress: restaurantData.panCardAddress,
                panCardName: restaurantData.panCardName,
                fssaiNumber: restaurantData.fssaiNumber,
                fssaiExpiryDate: restaurantData.fssaiExpiryDate,
                bankAccountNumber: restaurantData.bankAccountNumber,
                ifscCode: restaurantData.ifscCode,
                accountType: restaurantData.bankAccountType,
                panCardImage: restaurantData.panCardImage,
                fssaiImage: restaurantData.fssaiImage
            })
        }
        else {
            toast.error("Something went wrong")
        }
    }

    const onSubmit = async (data: any) => {
        setRegisterLoading(true);
        if (!location.state?.resId) {
            const response: any = await registerRestaurent(data, token);
            if (response.error) {
                toast.error(response.error.message);
            }

            if (response.status >= 200 || response.status <= 210) {
                toast.success(response.data.message);
                navigate("/partner-with-us-documents", {
                    state: {
                        id: response?.data?.newRestaurant.id
                    }
                })
            }
        }
        else if (restaurantId && isEdit) {
            const response: any = await updateRestaurantRegistration(token, data, restaurantId);
            if (response.error) {
                toast.error(response.error.message);
            }

            if (response.status >= 200 || response.status <= 210) {
                toast.success(response.data.message);
                navigate("/partner-with-us-documents", {
                    state: {
                        id: location.state?.resId
                    }
                })
            }
        }
        else {
            navigate("/partner-with-us-documents", {
                state: {
                    id: location.state?.resId, verfificationDetail
                }
            })
        }
        setRegisterLoading(false);

    };

    const handleOpenCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const day = event.target.value;
        const openDays = getValues('openDays');
        const isChecked = event.target.checked;

        if (isChecked) {
            openDays.push(day);
        } else {
            const index = openDays.indexOf(day);
            if (index !== -1) {
                openDays.splice(index, 1);
            }
        }
        setValue('openDays', openDays);
    };

    const detectCurrentLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setValue("latitude", latitude)
                    setValue("longitude", longitude)
                    const locationAddress = await fetchAddress(latitude, longitude) || '';
                    const { address_components, formatted_address } = locationAddress;
                    setValue("googleAddress", formatted_address)
                    setValue("country", address_components[5].long_name)
                    setValue("state", address_components[4].long_name)
                    setValue("city", address_components[2].long_name)
                    setValue("pincode", address_components[6].long_name)
                },
                (error) => {

                }
            );
        } else {
        }
    };


    return (
        <div className="p-4 md:px-16">
            <ToastContainer />

            <div className="col-span-2">
                <p className='text-[32px] font-bold text-[#ff6d03] text-left'>Register Your Restaurant</p>
            </div>
            <div className='flex justify-between'>
                <div className={restaurantId ? "" : "col-span-2"}>
                    <p className='text-[24px] font-bold text-left'>Restaurant Details</p>
                </div>

                {restaurantId ? (
                    <>
                        {/* <div></div> */}
                        <div className='flex justify-end'>
                            <button onClick={() => {
                                setIsEdit(!isEdit)
                            }} type="button" className="inline-flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-900">
                                {isEdit ? <>Cancel</> : <>
                                    <FaPen className='mr-2' />
                                    Edit
                                </>}
                            </button>
                        </div>
                    </>
                ) : null}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                <div className='gap-4 md:grid'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Restaurant Name</label>
                        <input
                            disabled={!isEdit}
                            {...register('name', { required: true })} type="text" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.name && <span className="text-red-500">Restaurant Name is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Complete Address</label>
                        <input
                            disabled={!isEdit}
                            {...register('completeAddress', { required: true })} type="text" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.completeAddress && <span className="text-red-500">Complete Address is required</span>}
                    </div>

                    <div className="flex space-x-4 md:col-span-2">
                        <input disabled {...register('googleAddress')} type="text" readOnly={true} className="border rounded px-4 py-2 w-3/4" />
                        <button
                            type="button"
                            onClick={detectCurrentLocation}
                            className="w-80 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Detect Location
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Country</label>
                        <input disabled {...register('country', { required: true })} type="text" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.country && <span className="text-red-500">Country is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Pincode</label>
                        <input disabled {...register('pincode', { required: true })} type="text" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.pincode && <span className="text-red-500">Pincode is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">State</label>
                        <input disabled {...register('state', { required: true })} type="text" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.state && <span className="text-red-500">State is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">City</label>
                        <input disabled {...register('city', { required: true })} type="text" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.city && <span className="text-red-500">City is required</span>}
                    </div>

                    <div className="col-span-2">
                        <p className='text-[24px] font-bold text-left'>Staff Details</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Manager Name</label>
                        <input disabled={!isEdit} {...register('contactName', { required: true })} type="text" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.contactName && <span className="text-red-500">Manager Name is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Manager's Phone Number</label>
                        <input disabled={!isEdit} maxLength={10} {...register('contactNumber', { required: true })} type="number" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.contactNumber && <span className="text-red-500">Manager's Phone Number is required</span>}
                    </div>

                    {/*================== Buttons=================== */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Owner Email Address</label>
                        <input disabled={!isEdit} {...register('ownerEmail', { required: true })} type="email" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.ownerEmail && <span className="text-red-500">Owner Email is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Owner Name</label>
                        <input {...register('ownerName', { required: true })} type="text" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.ownerName && <span className="text-red-500">Owner Name is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Owner's Phone Number</label>
                        <input maxLength={10} {...register('ownerContact', { required: true })} type="number" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.ownerContact && <span className="text-red-500">Owner's Phone number is required</span>}
                    </div>

                    <div className="col-span-2">
                        <p className='text-[24px] font-bold text-left'>Cuisine Details</p>
                    </div>



                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Start Time</label>
                        <input {...register('startTime', { required: true })} type="time" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.startTime && <span className="text-red-500">Start Time is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">End Time</label>
                        <input {...register('endTime', { required: true })} type="time" className="border rounded px-4 py-2 w-full"
                        />
                        {errors.endTime && <span className="text-red-500">End Time is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Establishment Type</label>
                        <select disabled={!isEdit} {...register('establishmentType', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="dine">Dine</option>
                            <option value="online">Online</option>
                            <option value="dine and online">Dine and Online</option>
                        </select>
                        {errors.establishmentType && <span className="text-red-500">Establishment Type is required</span>}
                    </div>



                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Open Days</label>
                        <div className="grid grid-cols-4">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <label key={day} className="inline-flex items-center">
                                    <input
                                        disabled={!isEdit}
                                        {...register('openDays')}
                                        type="checkbox"
                                        value={day}
                                        defaultChecked={true}
                                        onChange={handleOpenCheckboxChange}
                                        className="form-checkbox text-indigo-600 h-5 w-5"
                                    />
                                    <span className="ml-2">{day}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-left">Available Cuisines</label>
                        <div className="grid grid-cols-3">
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Italian" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Italian</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Mexican</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">North Indian</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Chinese</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">South Indian</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Japanese</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Thai</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Punjabi</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">American</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Bengali</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">British</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Vietnamese</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">German</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input disabled={!isEdit} {...register('cuisines')} type="checkbox" value="Mexican" className="form-checkbox text-indigo-600 h-5 w-5" />
                                <span className="ml-2">Brazilian</span>
                            </label>
                        </div>
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-700 text-left"> Description</label>
                        <textarea rows={4} placeholder='mentuon your famous dish in this field' {...register('outletDescription', { required: true })} className="border rounded px-4 py-2 w-full"
                        ></textarea>
                        {errors.outletDescription && <span className="text-red-500">Outlet Description is required</span>}
                    </div>

                    <div className="col-span-2 flex justify-end">
                        <button type="button"
                            onClick={() => {
                                navigate("/my-restaurants")
                            }}
                            className="mr-4 bg-white text-orange-500 border border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white focus:outline-none focus:bg-orange-500 focus:text-white w-60">
                            Back
                        </button>
                        <button type="submit" className="mr-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600 w-60">
                            {registerLoading && (
                                <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
                            )}
                            {!registerLoading ? 'Next' : null}
                        </button>
                    </div>


                </div>
            </form>


        </div>
    );
};

export default RegisterRestaurantForm;
