import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = (props: any) => {
    const containerStyle = {
        width: '350px',
        height: '350px'
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };

    const position = {
        lat: props.latitude,
        lng: props.longitude
    };
    const apiKEy: string = process.env.REACT_APP_GOOGLE_API_KEY || ''    
    return (
        <div className='mt-4 ml-3'>

            <LoadScript googleMapsApiKey={apiKEy}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    <Marker position={position} />
                </GoogleMap>
            </LoadScript>
        </div>

    )
}

export default MapComponent
