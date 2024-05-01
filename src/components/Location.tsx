import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapComponent from './MapComponent';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddressForm from './AddressForm';
import { BiArrowBack } from 'react-icons/bi';


const Location = () => {

    const [searchInput, setSearchInput] = useState('');
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [addresses, setAddresses] = useState<{ addressType: string, address: string }[]>([]);
    const [locationAddress, setLocationAddress] = useState<string>('')

    useEffect(() => {
        const dummyAddresses = [
            { addressType: 'Home', address: '23 Main Street, Anytown, USA 12345:' },
            { addressType: 'Work', address: '23 Main Street, Anytown, USA 12345:' },
            { addressType: 'Other', address: '23 Main Street, Anytown, USA 12345:' }
        ];
        setAddresses(dummyAddresses);
    }, []);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchInput('');
    };

    const fetchAddress = async (latitude: number, longitude: number): Promise<string | null> => {
        const API_KEY = 'AIzaSyCL_QSk4NjKCD376dCE3LM93zIkn234Yrs';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 'OK' && data.results && data.results.length > 0) {
                return data.results[0].formatted_address;
            } else {
                console.error('No address found for the provided latitude and longitude.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            return null;
        }
    };

    const handleUseCurrentLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    const locationAddress = await fetchAddress(latitude, longitude) || '';
                    console.log({ locationAddress });
                    setLocationAddress(locationAddress)
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




    return (
        <div className="bg-white rounded shadow p-4 w-[400px]">
            {
                !currentLocation ? (
                    <>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            placeholder="Search locations"
                            className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 mb-2 w-full"
                        />
                        <button onClick={handleUseCurrentLocation} className="bg-blue-500 text-white px-4 py-2 rounded w-full">Detect Current Location</button></>
                ) : null


            }
            {currentLocation && (
                <>
                    <BiArrowBack cursor="pointer" onClick={()=>{
                        
                    }}/>
                    <MapComponent latitude={currentLocation.latitude} longitude={currentLocation.latitude} />
                    <AddressForm locationAddress={locationAddress} />
                </>

            )}
            {!currentLocation && addresses.length > 0 && (
                <div className="mt-4 border border-gray-300">
                    <h3 className="text-lg text-gray-400">Saved Addresses:</h3>
                    <ul className="pl-6 mt-2">
                        {addresses.map((address: { addressType: string, address: string }, index: number) => (
                            <li key={index} className="mb-1">
                                <div className="flex items-start">
                                    <span className="mr-2">{addressTypeIcons[address.addressType]}</span>
                                    <span className="font-bold">{address.addressType}</span>
                                </div>
                                <div >
                                    <div>{address.address}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            )}
        </div>
    );
};

export default Location;
