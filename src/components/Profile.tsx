import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { updateUserNameAction } from '../actions/authActions';

const Profile = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { user, token } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
        }
    }, [user, setValue]);

    const onSubmit = (data: any) => {
        setLoading(true)
        updateUserName(data, token)
            .then((response) => {
                console.log({ response });
                toast.success("User Updates successfully")
                dispatch(updateUserNameAction(data.name)); // Dispatch the action to update user name
                setLoading(false)
            }).catch((error) => {
                console.log({ error });
                setLoading(false)

            })
    };

    return (
        <div className="md:flex md:justify-center mt-10 mb-10 md:px-40 ">
            <ToastContainer />
            <div className="w-full min-w-lg ">
                {/* Centered content with max width */}
                <div className="md:flex md:justify-between gap-6">
                    <div className="md:w-1/2">
                        <div className="flex flex-col space-y-4 border border-gray-200 rounded-[24px] p-4">
                            <button className="w-full px-4 py-2 rounded text-left rounded-[8px]" style={{ backgroundColor: 'rgba(255, 215, 0, 0.5)' }}>Profile</button>
                            <button className="w-full px-4 py-2 rounded text-left rounded-[8px]">Reviews</button>
                            <button className="w-full px-4 py-2 rounded text-left rounded-[8px]">Photos</button>
                            <button className="w-full px-4 py-2 rounded text-left rounded-[8px]">Favourite</button>
                            <button className="w-full px-4 py-2 rounded text-left rounded-[8px]">Recently Viewed</button>
                            <button className="w-full px-4 py-2 rounded text-left rounded-[8px]">BookMarks</button>
                            <button className="w-full px-4 py-2 rounded text-left rounded-[8px]">Blog Posts</button>
                        </div>
                    </div>
                    <div className="md:w-1/2  border border-gray-200 rounded-[24px] p-4">
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-left">User Profile</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-base text-left mb-2">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name', { required: true })}
                                        disabled={!user}
                                        className="border rounded-full px-4 py-2 w-full mb-2"
                                    />
                                    {errors.name && <span className="text-red-500">Name is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-left mb-2">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={user ? user.email : ''}
                                        disabled
                                        className="border rounded-full px-4 py-2 w-full mb-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-left mb-2">Phone:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={user ? user.phone : ''}
                                        disabled
                                        className="border rounded-full px-4 py-2 w-full mb-2"
                                    />
                                </div>
                                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-full w-full" >
                                    {loading && (
                                        <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
                                    )}
                                    {!loading ? (
                                        'Save'
                                    ) : (
                                        null
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
