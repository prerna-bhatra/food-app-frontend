import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapComponent from './MapComponent';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddressForm from './AddressForm';
import { BiArrowBack } from 'react-icons/bi';
import { userSavedAddress } from '../services/userService';
import { FaSpinner } from 'react-icons/fa';
import SeacrhAddress from './SeacrhAddress';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import { fetchAddress } from '../services/googleApiService';

const Location = (props: any) => {
    const { token } = useSelector((state: any) => state.auth);

    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [addresses, setAddresses] = useState<{
        addressType: string,
        googleAddress: string,
        id: number,
        landMark: string,
        receiverContact: string,
        houseName: string,
        longitude: number,
        latitude: number,
        area: string
    }[]>([]);
    const [locationAddress, setLocationAddress] = useState<string>('')

    const [isSearchAddress, setIsSearchAddress] = useState(false);

    useEffect(() => {
        fetchSavedAddress()
    }, []);


    const fetchSavedAddress = async () => {
        setLoading(true)
        userSavedAddress(token).then((response: any) => {
            setLoading(false);
            setAddresses(response.data);
        }).catch((error) => {

        })
    }
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchInput('');
    };

    const handleUseCurrentLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    const locationAddress = await fetchAddress(latitude, longitude) || '';
                    setLocationAddress(locationAddress.formatted_address)
                },
                (error) => {
                    console.log({ error });

                }
            );
        } else {
        }
    };

    const addressTypeIcons: { [key: string]: string } = {
        Home: '🏠',
        Work: '💼',
        Other: '📍'
    };


    const handleFormSubmission = () => {
        setCurrentLocation(null);
        fetchSavedAddress();
    }

    const [selectedAddress, setSelectedAddress] = useState<any>()

    const selectAddress = (address: any) => {
        setSelectedAddress(address);
        props.setCheckoutAddress(address)
    }

    return (
        <div className="bg-white border rounded-[32px] shadow p-4 w-[400px]">
            {
                !currentLocation ? (
                    <>
                        <button onClick={handleUseCurrentLocation} className=" rounded-[32px] bg-[#FF6D03] h-[46px] text-white px-4 py-2  w-full">Detect Current Location</button></>
                ) : null
            }
            {currentLocation && (
                <>
                    <BiArrowBack cursor="pointer" onClick={() => {
                        setCurrentLocation(null)
                    }} />
                    <MapComponent latitude={currentLocation.latitude} longitude={currentLocation.latitude} />
                    <AddressForm
                        onFormSubmit={handleFormSubmission}
                        locationAddress={locationAddress} latitude={currentLocation.latitude} longitude={currentLocation.latitude} />
                </>

            )}

            {!currentLocation && addresses && addresses.length > 0 && (
                <div className="mt-4 border border-gray-300 rounded-[32px]">
                    {
                        !loading ? (
                            <>
                                <h3 className="text-lg text-gray-400">Saved Addresses:</h3>
                                <ul className="pl-6 mt-2">
                                    {addresses.map((address: any, index: number) => (
                                        <li key={index} className="mb-1 cursor-pointer" onClick={() => {
                                            selectAddress(address);
                                        }} >
                                            <div className="flex items-start">
                                                <span className="mr-2">{addressTypeIcons[address.addressType]}</span>
                                                <span className="font-bold">{address.addressType}</span>
                                            </div>
                                            <div >
                                                <div>
                                                    {address.houseName + ", "}
                                                    {address.area + ", "}
                                                    {address.landmark + address.landmark ? ", " : ""}
                                                    {address.googleAddress}

                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <FaSpinner className='text-black-900' />
                        )
                    }

                </div>

            )}


            {
                isSearchAddress && currentLocation ? (
                    <SeacrhAddress />
                ) : null
            }
        </div>
    );
};

export default Location;
