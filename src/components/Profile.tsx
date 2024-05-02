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
        <div className="flex justify-center mt-10 mb-10 ml-[200px] mr-[300px]">
            <ToastContainer />
            <div className="w-full min-w-lg">
                {/* Centered content with max width */}
                <div className="flex justify-between">
                    <div className="w-1/2">
                        <div className="flex flex-col space-y-4 border border-gray-200">
                            <button className="w-full px-4 py-2 rounded text-left" style={{ backgroundColor: 'rgba(255, 215, 0, 0.5)' }}>Profile</button>
                            <button className="w-full px-4 py-2 rounded text-left">Reviews</button>
                            <button className="w-full px-4 py-2 rounded text-left">Photos</button>
                            <button className="w-full px-4 py-2 rounded text-left">Favourite</button>
                            <button className="w-full px-4 py-2 rounded text-left">Recently Viewed</button>
                            <button className="w-full px-4 py-2 rounded text-left">BookMarks</button>
                            <button className="w-full px-4 py-2 rounded text-left">Blog Posts</button>
                        </div>
                    </div>
                    <div className="w-1/2 px-4">
                        <div>
                            <h2 className="text-xl font-bold mb-4">User Profile</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name', { required: true })}
                                        disabled={!user}
                                        className="border rounded px-4 py-2 w-full"
                                    />
                                    {errors.name && <span className="text-red-500">Name is required</span>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={user ? user.email : ''}
                                        disabled
                                        className="border rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block">Phone:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={user ? user.phone : ''}
                                        disabled
                                        className="border rounded px-4 py-2 w-full"
                                    />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full" >
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
